---
layout: post
title: "Unit Testing"
date: 2013-12-12 14:22:24 +0100
comments: true
categories: [Javascript, Unit Testing]
author: Jonas Stattin
authorDescription: Jonas Stattin jobbar med frontend på Vinnovera.
authorImage: /images/profiles/jonas.jpg
authorTel: 070-952 97 71
authorMail: jonas@vinnovera.se
---

När vi skriver kod så vill vi när det är möjligt kunna skriva kod som kommer att underlätta för oss också i framtiden. För att kunna skriva kod som ska vara möjlig att använda igen eller vara stabil under längre tid, behöver den vara möjlig<!--more--> att testa regelbundet. Den behöver också bestå av utbrytbara delar, så att delarna kan passas in igen i ett annat sammanhang längre fram, eller skrivas om vid behov utan att påverka sin omgivning.

När vi utvecklar hållbara och långsiktiga applikationer är det viktigt att koden vi skriver beter sig konsekvent. Det måste gå att förutse hur en funktion eller ett plugin beter sig som vi har förväntat oss, även när den används under nya omständigheter.

Det är därför vi måste testa.

## Testning

### När och hur kan man testa

Det finns olika stadier av testning, inte sällan grupperade som “validation testing”, “integration testing” samt “unit testing” och det är det senare jag tänker ta upp i närmare detalj här, då det är den testprocess som ligger närmast mig som utvecklare. Men först en kvick genomgång av de olika stadierna.

#### Unit testing

Unit testing är när man bryter isär alla delar i en applikation i så små testbara enheter som möjligt, och testar varje enhet separat. Ofta är en unit t.ex. en funktion, men kan ibland också vara en hel modul eller ett interface såsom en klass. Varje unit testas ihop med ett dataset för att se att varje del är redo att användas.

#### Integration testing

När alla units är bedömda att vara fungerande så kan man testa dem ihop, vilket kallas för Integration testing. Här använder man sig oftast av testplaner, en systematisk testordning som skall spegla ett tänkt workflow. I det här skedet tittar man också på interaktioner mellan olika units för att se om de fungerar som tänkt.

#### Validation testing

I det här skedet testar man huruvida applikationen uppfyller de krav som ställts av beställare och användare. Den här typen av tester bör vara möjliga att utföra av en tredje part, utan insikt i hur applikationen är byggd rent tekniskt.

## Testdriven utveckling

### Test först, kod sen

När man ägnar sig åt testdriven utveckling, så betyder det normalt att man börjar med att identifiera vad en applikation skall utföra, för att sedan bryta ned detta i sådana beståndsdelar att de går att identifiera som enskilda units. Sedan, istället för att direkt börja skriva programkod, så börjar man med att utveckla tester för varje unit. När alla testerna är färdigskrivna inleds arbetet med själva programkoden, och när alla tester validerar så är uniten färdig. Detta ger en tydligare bild av vad varje enskild del av applikationen skall klara av och hur den skall fungera.

### Refactoring

Det andra alternativet, när det av olika anledningar inte är praktiskt att skriva tester i förväg, är att skriva om koden i efterhand för att göra den testningsbar. Detta innebär att förändra koden, utan att egentligen förändra vad koden är menad att göra.

## Unit testing

### Vad är en unit
Så, vad är då en unit? En unit är de minsta beståndsdelarna vi kan bryta ned en applikation till. Oftast är det funktioner och metoder, men det kan ibland också röra sig om interfaces.

#### Metoder och funktioner

Det typiska för en testbar funktion är att den kräver att någonting stoppas in, och att vi får något annat tillbaka. T.ex. kan det här vara en funktion som förvandlar en datumform till en annan (från '130402' till 'Andra april, 2013'), eller som gör en avståndsberäkning eller liknande. Det är dock också möjligt att göra tester av funktioner som inte svarar med något, utan som istället påverkar ett annat objekt.

#### Interface och klasser

Ibland behöver vi testa sådant som inte ger ett direkt resultat, som t.ex. att flytta på ett objekt. Det kan också vara så att det vi testar inte är ett publikt värde utan en privat variabel. I sådana fall skriver man tester mot interfacet snarare än en enskild metod. Man kör en metod med ett visst värde, och när metoden är genomförd görs en kontroll mot ett värde eller kontrollfunktion i interfacet för att se om förändringen är den förväntade. T.ex. kan vi köra funktionen "moveBulletTowardsShip" i ett spel, och när metoden är körd kan vi testa om vår "bullet" har flyttat sig på det vis vi förväntat oss.

### Vad är ett test

#### Vad stoppar vi in, vad föväntar vi oss ut

Låt säga att jag har en funktion som delar upp ett textstycke i ett antal enskilda rader, där varje rad är högst 60 tecken. Vad vi då låter testet skicka in till funktionen som vi testar är ett antal textstycken av olika längd. I varje test behöver vi också skicka med ett förväntat resultat, i det här fallet skulle vi t.ex. kunna titta på antalet rader vi får tillbaka, samt längden på varje enskild rad.

## Ramverk för javascript

Det finns många olika ramverk som används för att testa javascript, som Buster.JS, Sinon.js, Jasmine, QUnit eller Mocha. Jag har här valt att titta närmare på QUnit och Mocha, då de är bra exempel på olika angreppsvinklar på javascript-testning.

### QUnit

QUnit är ett relativt lättviktigt testramverk. Det är ett ramverk som fokuserar helt på att testa javascript som körs i browsern. Då det är det testramverk som används vid utveckling av jQuery är det ett verktyg som är särskilt enkelt att komma igång med om man behöver testa mycket DOM-manipulation.

#### Setup

Det som krävs för att köra tester med QUnit är att ta hem en javascriptfil och en css-fil, samt skapa en HTML-fil som kör testerna. HTML-filen behöver åtminstone en holder att skriva ut testresultaten i ('qunit') och om du ska testa DOM-manipulation behövs en holder för QUnit att skapa DOM-elementen i ('qunit-fixture').

```html
<html>
	<head>
		<link rel="stylesheet" href="css/qunit-1.12.0.css">
	</head>
	<body>
		<div id="qunit"></div>
		<div id="qunit-fixture">
			<ul id="myList"></ul>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
		<script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.1.min.js"><\/script>')</script>
		<script src="js/vendor/qunit-1.12.0.js"></script>
		<script src="js/main.js"></script>
		<script src="js/tests.js"></script>
	</body>
</html>
```
#### Tester
I exemplet ovan har jag själva funktionerna jag vill testa i main.js, och testerna i tests.js. Så här ser ett enkelt test ut:

```javascript
test("multiLineText-test", function() {
	deepEqual(multiLineText('I have a thing to say', 5), ['I have', 'a thing', 'to say']);
});
```
Med QUnit skapas ett test genom att köra "test"-funktionen. Till den skickar man in en beskrivning av testet ("multiLineText-test") samt en funktion. I den här funktionen kan du köra kod, samt framförallt göra s.k. "assertions". QUnit har i huvudsak två typer av assertions, "ok" och "equal". Till "ok" behöver man bara skicka in ett argument, och om argumentet är "true" är testet godkänt. Till "equal" skickar man in två argument, och om de stämmer överens är testet godkänt. I exemplet ovan används en variant på equal som används för att jämföra t.ex. objekt och listor.

Här är ett exempel på ett test av DOM-manipulation

```javascript
test('DOM manipulation', function(){
	var items = ['Item 1', 'Second item', 'Item the 3rd', 'Fourth one'];
	for(var i=0;i<items.length;i++){
		$('#myList').append('<li>'+items[i]+'</li>');
	}
	equal($('#myList').children().length, 4);
});
```
### Mocha
Mocha är klart mer omfattande än QUnit, men har också fler användningsområden. En av de viktigare skillnaderna är att Mocha kan testa javascript utanför en browser, t.ex. i en Node-applikation. Du installerar Mocha via npm, och kör Mocha via terminalen.

I min app.js har jag samma funktion som ovan ("multiLineText", fast tillgängliggjord i exports):

```javascript
exports.multiLineText = function(myString, maxWidth){
	...
}
```
I roten på projektet har jag även skapat en folder som heter "test", vilket är den folder Mocha letar efter tester i. Här har jag en fil som heter t.ex. "mytest.js", som innehåller själva testet:

```javascript
var assert = require("assert");
var app = require("../app");

describe("multiLineText", function() {
	it("should return correct array", function() {
		assert.deepEqual(app.multiLineText('I have a thing to say', 5), ['I have', 'a thing', 'to say']);
	});
});
```
Sedan kör jag Mocha via terminalen via ett enkelt kommando:

   mocha

Jag får följande resultat att 1 test (av 1 möjliga) är lyckat:

   1 passing (5 ms)

Mocha har många kraftfulla features, som att få Mocha att köra tester automatiskt när kod har uppdaterats, eller att använda andra testbibliotek för att köra testerna (t.ex. Jasmine).

## Exempelapplikation
Som avslutning tänkte jag visa en liten exempelapplikation, och exempel på hur man kan skriva tester till den. Applikationen skall klara av att visa ett diagram där en andel av ett antal figurer är markerade, t.ex. "22 av 30 deltagare". Diagrammet skall vara en SVG-bild.
###Krav- och funktionslista
För att kunna åstadkomma det här diagrammet behöver vi följande funktioner:

* En funktion som kan räkna ut antal figurer per rad, baserat på värdet och maxvärdet (t.ex. "22" och "30")
* En funktion som ritar ut figurerna.

### Test
Det första testet vi skriver är därför ett test som kontrollerar vår uträkningsfunktion. Vi vet att vi vill kunna skala antal figurer per rad baserat på maxantalet, samt behöver få ut antalet rader, kolumner, och vilka rader som är markerade, och hur många som är markerade per rad.

```javascript
test('Get rows, columns and figurenumber', function(){
	deepEqual(getChartSize(7,10), {
		rows: 2,
		columns: 5,
		lastMarkedRow: 2,
		markedAtLastMarkedRow: 2,
		lastRowLength: 5
	});
	deepEqual(getChartSize(24,66), {
		rows: 4,
		columns: 20,
		lastMarkedRow: 2,
		markedAtLastMarkedRow: 4,
		lastRowLength: 6
	});
	deepEqual(getChartSize(13,24), {
		rows: 3,
		columns: 10,
		lastMarkedRow: 2,
		markedAtLastMarkedRow: 3,
		lastRowLength: 4
	});
});
```
Det nästa testet är till för att se så att vår DOM-manipulation gör vad vi förväntar oss. I det här fallet kollar jag att det finns rätt antal av "märkta" respektive "omärkta" figurer, samt kontrollerar att SVGn har rätt storlek.

```javascript
module('Create and manipulate SVG');
test('Create and manipulate SVG with 7 10', function(){
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	document.getElementById('qunit-fixture').appendChild(svg);
	createChart(getChartSize(7, 10), svg);
	equal($('svg .marked').length, 7);
	equal($('svg .unmarked').length, 3);
	equal($(svg).height(), 40);
});
test('Create and manipulate SVG with 24 66', function(){
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	document.getElementById('qunit-fixture').appendChild(svg);
	createChart(getChartSize(24, 66), svg);
	equal($('svg .marked').length, 24);
	equal($('svg .unmarked').length, 42);
	equal($(svg).height(), 20);
});
test('Create and manipulate SVG with 13 24', function(){
	var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	document.getElementById('qunit-fixture').appendChild(svg);
	createChart(getChartSize(13, 24), svg);
	equal($('svg .marked').length, 13);
	equal($('svg .unmarked').length, 11);
	equal($(svg).height(), 30);
});
```
### Funktion
Först har vi funktionen som tar fram hur många figurer vi behöver visa:

```javascript
function getChartSize(num, max){
	var rows = 0,
	    columns = 0,
	    lastMarkedRow = 0,
	    markedAtLastMarkedRow = 0,
	    lastRowLength = 0
	;

	if(max <= 10){
		columns = 5;
	} else if(max <= 40){
		columns = 10;
	} else if(max <= 140){
		columns = 20;
	} else {
		columns = 40;
	}

	rows = Math.ceil(max / columns);
	lastMarkedRow = Math.ceil(num / columns);
	markedAtLastMarkedRow = num % columns;
	lastRowLength = columns - ((rows * columns) - max);

	return {
		rows: rows,
		columns: columns,
		lastMarkedRow: lastMarkedRow,
		markedAtLastMarkedRow: markedAtLastMarkedRow,
		lastRowLength: lastRowLength
	};
}
```
Sen så har vi funktionen som manipulerar en SVG på förväntat vis:

```javascript
function createChart(settings, svg) {
	var addedElements = 0;
	var w = 100/settings.columns;
	var h = w;
	for(var i=0;i<settings.rows;i++){
		for(var j=0;j<settings.columns;j++){
			if(addedElements < (settings.lastMarkedRow * settings.columns) - (settings.columns - settings.markedAtLastMarkedRow)){
				var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('class', 'marked');
				rect.setAttribute('height', h);
				rect.setAttribute('width', w);
				rect.setAttribute('x', j*w);
				rect.setAttribute('y', i*h);
				rect.setAttribute('fill', '#ff0000');
				svg.appendChild(rect);
				addedElements++;
			} else if(addedElements < (settings.columns * (settings.rows-1)) + settings.lastRowLength){
				var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
				rect.setAttribute('class', 'unmarked');
				rect.setAttribute('height', h);
				rect.setAttribute('width', w);
				rect.setAttribute('x', j*w);
				rect.setAttribute('y', i*h);
				rect.setAttribute('fill', '#0000ff');
				svg.appendChild(rect);
				addedElements++;
			}
		}
	}
	svg.setAttribute('height', (settings.rows*h)+'px')
	svg.setAttribute('width', (settings.columns*w)+'px');
}
```

Jag har kört testerna medan jag skrivit funktionerna, och konstaterat att när testerna klaras av så uppfyller funktionerna de krav jag har, och mycket riktigt är applikationen färdig när alla krav och tester är uppfyllda.