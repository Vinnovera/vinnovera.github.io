---
layout: post
title: "Garbage Collection"
date: 2014-02-19 17:54:05 +0100
comments: true
author: Per Stenström
categories: [Javascript, Garbage Collection]
---
Garbage collection (GC) är automatiserad minneshantering i datorprogram. Det finns många olika algoritmer för garbage collection, men problemet som de alla försöker att lösa är detsamma: att identifiera använt minne som applikationen inte längre klarar av att nå, och rensa det.
<!--more-->
Motsatsen till garbage collection är att programmeraren själv måste allokera minne och sen avallokera minnet när det inte längre används, t.ex. ```malloc()``` och ```free()``` i C och C++.

## Historien om garbage collection
Garbage collection uppfanns av John McCarty c:a 1959 när han arbetade med Lisp, som är ett av de första högnivåspråken. I sin uppsats [Recursive Functions of Symbolic Expressions and Their Computation by Machine, Part I](http://www-formal.stanford.edu/jmc/recursive/node4.html#tex2html8) (1960) beskriver han en process som han kallar för "reclamation cycle", eller “garbage collection”. Metoden John McCarty beskrev är idag kallad för “mark-and-sweep”, vilket är den metod JavaScript använder, om än en lite förfinad version.

## Garbage collection-algoritmer
Det finns många olika implementationer av garbage collection. I JavaScript är det först och främst “mark-and-sweep” som används, och i en lite mindre utsträckning “reference counting”.
### Reference counting garbage collection
Reference counting används i stort sett endast av Internet Explorer 6 och 7. Den här metoden räknar alla referenser till ett objekt, och tar bort alla objekt som inte längre har en referens.

Det är dock möjligt fär två olika objekt att referera till varandra, utan att annars vara refererade till.
```javascript
function f() {
	var o = {};
	var o2 = {};
	o.a = o2;
	o2.a = o;

	return “foo”;
}

f();
```

I exemplet har o och o2 inga referenser utanför funktions-scopet. De kommer dock inte bli samlade av garbage collection eftersom de har referenser till varandra.

En annan nackdel är att själva uppdateringen av referensräknaren kan kräva ganska stora resurser, om många referenser skapas och tas bort blir applikationen betydligt långsammare.

En fördel med denna metod är att objektet tas bort så fort det inte längre har några referenser, och kräver inte att applikationen stannas för att garbage collection ska köras.

En variant av den här metoden används bland annat i PHP.

### Mark-and-sweep
Sedan 2012 använder i stort sett alla browsers den här algoritmen. Mark-and-sweep är en så kallad “tracing collector”. Den fungerar på det sättet att den startar vid root-objektet. I JavaScripts fall är det global-objektet. Från global letar algoritmen efter alla referenser den kan hitta, och sen alla referenser från dessa. På så sätt får garbage-collectorn ut alla objekt som går att komma åt, och tar bort alla objekt som inte går att nå.

Den begränsning mark-and-sweep algoritmen har är att objekt måste göras explicit oåtkomliga. Denna begränsning är däremot inte speciellt besvärande, vilket lär vara anledningen till att ingen bryr sig speciellt mycket om garbage collection.

#### Stop-the-world
Vanliga mark-and-sweep garbage collectors kör hela mark och sen sweep vid samma tillfälle, och stannar all annan programexekvering under tiden. Det kan orsaka en märkbar frysning av programmet när garbage collection körs. Mer sofistikerade algoritmer kan utföra processen i bakgrunden utan att orsaka att exekveringen saktas ned.

#### Incremental GC
Firefox introducerade “incremental garbage collections” (IGC) i version 16. Vad IGC gör är att den delar upp mark-fasen av mark-and-sweep i flera cykler. Sweep-fasen pausar fortfarande browsern men den är nu betydligt kortare. Det fungerar bra så länge det inte används väldigt mycket minne, om för mycket minne används så hinner IGC inte med att garbage collecta och browsern går över till att köra en full mark-and-sweep.

#### Incremental Generational Garbage Collection
Incremental Generational Garbage Collection (IGGC) lades till Chrome och V8 i 2011. IGGC arbetar utifrån antagandet att de yngsta referenserna är de mest kortlivade och att garbage collectorn inte behöver kontrollera de äldsta referenserna varje cykel. Om ett objekt överlever en cykel flyttas det till en äldre generation.

## Minneseffektiv kod
Det finns inte så mycket man behöver tänka på när man skriver JavaScript i relation till garbage collection, precis som det ska vara. Men det finns några saker som är värt att tänka på:

För att minimera den tid som används av garbage collectorn bör man undvika att skapa för många objekt. Varje gång du använder ```new``` keywordet skapas ett nytt objekt. Men även när du skriver ```[ ]``` eller ```{ }```. I JavaScript är även funktioner objekt.

Dock kommer du aldrig komma ifrån att skapa garbage. Att invokera en funktion kräver minne, som sen behöver rensas även om funktionen i övrigt inte skapar någon garbage.

### global scope
Ett objekt som skapas utanför något specifikt scope tillhör det globala scopet. Eftersom mark-and-sweep-algoritmen markerar alla objekt som går att nå från det globala scopet kommer globala objekt aldrig att rensas av garbage collectorn.
Alla variabler som instansieras utan “var”-keywordet tillhör även dom det globala scopet.
```javascript
var b = 'foo';

function test(){
	var str = ‘Hej’;
	c = ‘Då’;
}

test();
```
Efter det att ```test()``` körts går inte längre ```str``` att nås från ```global``` objectet och kommer såledas frias. Både ```b``` och ```c``` variablerna tillhör det globala scopet och det minne de tar upp frigörs aldrig.

### delete och null keywords
För att vara säker på att ett objekt blir borttaget av garbage collectorn kan du helt enkelt sätta dess värde till ```null```. JavaScript har även ett ```delete```-keyword. Även om det indirekt kan vara ett sätt att ta bort referensen till ett objkct, är det i första hand endast användbart när du vill sätta ett objekts property till ```undefined```, istället för att sätta det till ```null```. ```delete``` fungerar inte på variabler, utan returnerar då endast ```false```.
```javascript
var s = {data: ‘test’};
delete s.data;
s.data === ‘test’; // false

var m = ‘test’;
delete m; // return false;
m === ‘test’ // true

m = null;
m === ‘test’ // false
```
Vad som låter som ett rimligt antagande är att vi borde kunna använda ```delete``` tillsammans med root-objektet (```this```). Det antagandet stämmer dock inte.
```javascript
var x = {data: 'z'};
delete this.x; // return false
this.x.data === 'z'; // true
delete this.x.data; // return true
this.x.data === 'z'; // false
```
### var keywordet
Var noga med hur du använder ```var``` keywordet.

Speciellt i intervall där varje iteration är ett eget scope skapas det lätt väldigt mycket onödigt garbage.

### Mindre function-scope
Var noga med dina funktions-scope. Det kan vara värt att dela en stor funktion i mindre. Det skapar garbage oftare men i mindre mängd. Det utnyttjar även den generationella garbage collectorn.

I exemplet ska vi räkna ut den initiella `velocity.x`och `velocity.y`och för ett objekt. Det gjorde vi tidigare i konstruktorn av objektet, földen av det var att de hjälp-variabler vi använder i uträkningen inte gick ur scope förrän vi förstörde objektet. Nu går variablerna ur scope så fort `init()` metoden är klar.
```javascript
function init() {
	var dx, dy, distance, dv, tx, ty, tv, dtv;

	// Distance of particle from the center across the x and y axis
	dx = options.x - options.center_x;
	dy = options.y - options.center_y;

	// Distance of particle from the center (radius of orbit)
	distance = Math.sqrt( dx * dx + dy * dy );

	// velocity towards center (gravity) through distance
	// We substitute the sum of masses with 1
	dv = (1 * options.gravity) / distance;

	// Tangental velocity
	dtv = Math.sqrt( dv );

	tx = dy * dtv;
	ty = dx * dtv;

	velocity.x += tx;
	velocity.y -= ty;
}
```

### Loopar
Istället för:
```javascript
setInterval(function(){
	var foo = new bar();
}, 16);
```
skriv:
```javascript
var foo = new bar();
setInterval(function(){
	foo.init();
},16);
```
Det första exemplet skapar ett nytt objekt varje iteration, som är onåbart i nästa. Det andra exemplet skapar ett objekt som sen återanvänds, fast med nya värden.

### Object pool
Det kan ibland vara bra att skapa en “objektpool”. När du ofta ska skapa och ta bort liknande objekt.  Det gör du genom att använda två arrayer:
```javascript
var activeObject = [],
    objectPool   = [];
```
När du vill skapa ett nytt objekt plockar du det ur arrayen ```objectPool```med oanvända objekt och lägger det i ```activeObject``` arrayen. När du sen är klar med ditt objekt flyttar du tillbaka det till poolen. På så sätt skapas inga nya objekt efter startup och inget tas heller bort av garbage collectorn.

Den här metoden är användbar när man animerar många objekt. Till exempel punkter i en graf.

## Referenser
* http://en.wikipedia.org/wiki/Garbage_collection_%28computer_science%29
* https://developer.mozilla.org/en-US/docs/JavaScript/Memory_Management
* http://docstore.mik.ua/orelly/webprog/jscript/ch11_03.htm
* http://buildnewgames.com/garbage-collector-friendly-code/
* https://blog.mozilla.org/dmandelin/2012/07/20/incremental-gc-now-in-firefox-aurora/