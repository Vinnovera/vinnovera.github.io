---
template: post.html
title: "ES6 - En överblick"
date: 2015-12-23 13:43:24
comments: true
tags: Nyheter
author: Daniel Jansson
authorDescription: Daniel Jansson jobbar som front-end utvecklare på Vinnovera.
authorImage: /images/profiles/daniel.jpg
authorMail: daniel@vinnovera.se
---

Som vi skrev tidigare i år så ser EcmaScript 6 ut att bli ett stort kliv framåt i
modularisering och struktur för Javascript som vi känner till det idag. EcmaScript 
är som bekant standarden för Javascript och tolkas av webbläsaren.
<!--more-->

I dagsläget är det ECMAScript 5 som är officiellt men dess efterföljare EcmaScript 6 
är under utveckling och högst atktuell då dennu har nu blivit godlänt av ECMA International. 
ECMAScript 6 innebär förändingar av syntaxen som förbättrar och förenklar språket.

## Historia
År 1995 i december presenterade Sun Microsystems och Netscape Communications Corporation
Javascript för första gången. I mars 1996 släppte Netscape den första stabila webbläsaren 
med stöd för Javascript, Netscape Navigator 2.0. På grund av populariteten som Javascript 
kom att få som utökningsspråk för webbsidor, utvecklade Microsoft en mestadels kompatibel 
variant, som kom att kallas JScript, och dök upp i Internet Explorer 3.0.

Netscape lämnade Javascriptspecifikationen till Ecma International för standardisering. 
Standarden fick beteckningen ECMA-262 och arbetet inleddes i november 1996. Den första 
utgåvan av ECMA-262 färdigställdes i juni 1997. Ecmascript är idag namnet på språket som 
standardiseras i standarden ECMA-262. 

Både Javascript och JScript siktar idag på att vara kompatibla med denna. De är dock inte 
det samma som Ecmascript, eftersom både JScript och Javascript innehåller utökningar som 
inte specificeras av ECMA-262. (Inte heller JScript och Javascript är fullt kompatibla med 
varandra då de innehåller olika utökningar.) 

För att tydliggöra det hela kan Ecmascript ses som en delmängd av Javascript eller JScript, 
d.v.s. Ecmascript kan tolkas av en Javascript- eller JScript-kompatibel tolk medan en 
Ecmascript-tolk generellt inte behöver klara av att tolka all Javascript- eller JScript-kod 
för att vara kompatibel med ECMA-262

## Nyheter i ECMAScript 6
ES6 är en stor förbättring av ES5 och specifikationen av standarden har nästan 600 sidor 
jämfört med ES5 som hade 245 stycken. ES6 tillför många eftertraktade saker, såsom moduler 
och klasser. Trots att ES6 är en stor uppgradering är den fullt bakåtkompatibel med tidigare 
versioner. I dagsläget har inte någon webbläsare full support för ES6 och det lär ta 
ytterligare omkring ett år innan detta sker.  

### 1. Ny typ av block-scope variabler
Två intressanta nya variabeltyper i ES6 är “let” och “konstanter”. Dessa fyller ett tomrum
i den nuvarande standarden och ger mer struktur. Båda dessa är så kallade block-scope
variabler, dvs de existerar bara i ett mindre kod-block, till exempel en if-sats eller en loop.
Andra språk som Java och C++ har sedan länge den här typen av variabler. 

#### Variabel typ "let"
Let är är en så kallad block-scoped variabel. Dessa kan användas var som helst men är av särskilt 
intresse i till exempel loopar eftersom den till skillnad från variabler av typen “var”, endast är 
tillgänglig i det specifika blocket där den är initierad och hostas inte till
högst upp i scoopet där den existerar.
![let blockscope](/images/content/posts/es6-en-overblick/let.jpg)

#### Konstanter
En annan ny typ av block-scope variabler är konstanter. Den nuvarande standarden har inget stöd för 
konstanter men vi har för vana att ge variabler av typen “var” versaler föratt beskriva att vi vill 
ge dem intrycket av att vara konstanter. ES6 introducerar nu riktiga konstanter vars värde ej kan 
förändrats när det en gång är initierat, de är med andra ord  ”read-only”. Konstanter måste dessutom 
initieras vid deklarering.
![constant blockscope](/images/content/posts/es6-en-overblick/constants.jpg)

#### Slutsats
Vi kan konstatera att block-scope variabeln “let” ger mer flexibilitet i ES6 då den fyller 
ett behov av att vara tillgänglig i ett mindre begränsat scope. Den ger också mindre sido-
effekter eftersom den inte hoistas så som variabler av typen “var” gör. Konstanter fyller 
ett tomrum och gör att koden blir mer effektiv och validerad bättre.

### 2. Default argument
Default-argument är en ny del av ECMAScript 6, vilket innebär att man kan ange ett arguments 
default-värde redan i deklareringen av en funktion.
![arguments default](/images/content/posts/es6-en-overblick/default.jpg)

#### Slutsats
Att definiera ett arguments default-värde redan vid deklarering av funktionen ger bättre
struktur och skapar en effektivare kod med bättre prestanda.

### 3. Rest argument
En metod tar emot ett okänt antal argument kan identifiera dessa med nyckelordet ”arguments”.
Detta är ett array-liknande objekt som bara har attributet “length” gemensamt med en riktig array. 
För att kunna iterera över detta objekt krävs i nuläget med ECMAScript 5 att man gör om det till 
en array manuellt. Med ES6 anger man tre punkter framför argumentet och det görs då automatiskt 
om till en riktig array.
![arguments rest](/images/content/posts/es6-en-overblick/rest.jpg)

#### Slutsats
 Även här kan vi se att ES6 skapar en kod som är mer effektiv, mer flexibel,
effektiv och har bättre struktur.

### 4. Moduler 
ECMAScript introducerar moduler som hanterar beroenden. En modul skapas genom att man anger nyckelordet 
“export” framför de variabler och metoder i en fil som ska ingå i modulen. Dessa kan sedan läsas in i 
en annan fil, med nyckelordet “import” antingen per enhet eller så kan man importera allt genom att ange 
stjärna. Man anger då också ett alias för modulen. Detta alias blir namnet på ett objekt som blir tillgängligt 
där modulen importeras med alla tillgängliga variabler och metoder från den andra modulen som properties.
![modules export import](/images/content/posts/es6-en-overblick/export.jpg)

#### Slutsats
 Stöd för dependencies tar bort behovet att tredjeparts-beroenden, vilket minskar kod, requests och ökar 
prestanda. Det ökar också modulariteten och flexibiliteten i språket.

### 5. Objekt
Objekt kan med ES6 skrivas mer på ett mer effektivt sätt än tidigare.
![objects](/images/content/posts/es6-en-overblick/objects.jpg)

#### Slutsats
 Stöd för dependencies tar bort behovet att tredjeparts-beroenden, vilket minskar
kod, requests och ökar prestanda. Det ökar också modulariteten och flexibiliteten
i språket.

### 6. Funktioner / Metoder
Med ES6 går det att skriva funktioner / metoder mer kompakt och kortfattat då ordet ”function” inte 
längre behövs skrivas ut, utan endast funktionsnamnet.
![methods](/images/content/posts/es6-en-overblick/methods.jpg)

#### Slutsats
 ES6 gör så att syntaxen blir mer kompakt och tar bort onödiga delar. Koden blir
mer lättläst, kompakt och effektiv.

### 7. Anonyma pil-funktioner
Detta är ett mer kompakt sätt att skriva en anonym funktion som till exempel kan användas
med Array.map.  Med ES6 behöver man inte längre skriva ut ordet function som ersätts av en 
pil och föregås av argument.
![functions anonymous](/images/content/posts/es6-en-overblick/anonymous_function.jpg)

#### Slutsats
 Ytterligare delar i syntaxen som förfinas, onödiga delar tas bort vilket gör det hela
lättare att läsa, koden exekveras snabbare och blir mer effektiv.

### 8. Klasser
ES6 använder för första gången I JavaScripts historia riktiga klasser liknande de i andra 
språk som Java och C++. Med klasser tillkommer en construktor-metod som exekveras vid 
instantieringen av klassen. I dagsläget kan man bara skapa klass-liknande konstruktor-
funktioner som påminner om de föregående.
![classes](/images/content/posts/es6-en-overblick/classes.jpg)

#### Slutsats
Klasser har support för sub- och superklasser vilket gör det enklare att hantera arv än 
tidigare vilket i sin tur kan medföra bättre modularitet och ett mer “vuxet” språk likt
Java och C++. Detta kan också vara en fördel vid stora applikationer eftersom det skapar
bra struktur.

### 9. Statiska metoder
ES6 har stöd för statiska metoder i en klass. Dessa kan användas utan att man instantierar
klassen, exempelvis för utility-metoder. 















