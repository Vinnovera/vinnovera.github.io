---
layout: post
title: "jQuery vs Mootools"
date: 2014-01-07 14:41:39 +0100
comments: true
author: Tobias Bleckert
categories: [Javascript, jQuery, Mootools]
---

"jQuery eller Mootools" är frågan många utvecklare ställer sig. Det är möjligt att ämnet har blivit något uttjatat genom åren, men det avgör du nog bäst själv.

Innan jag börjar jämföra dessa vill jag presentera dem lite<!--more--> först. Jag vill även påpeka att jag har jobbat med dessa två bibliotek ett par år, och även om jag har en favorit hoppas jag att det inte lyser igenom för mycket.

## Vad är jQuery

jQuery behöver knappast någon presentation, har du jobbat med gränssnittsutveckling känns det rätt rimligt att anta att du någon gång har kommit över jQuery.

jQuery är kort sagt ett javascript bibliotek som riktar in sig på att förenkla ditt sätt att arbeta med HTML manipulering, effekter, event med mera genom ett enkelt API som fungerar genom olika webbläsare.

Jag ska inte tråka ut dig med siffror, men antalet användare är med marginal högst på marknaden (bland javascript bibliotek) och webbplatser som Wordpress och Wikipedia använder sig utav jQuery, vilket de även stolt visar upp.

## Mootools

Jag har fått den uppfattningen att många tror att Mootools är gammalt och uråldrat. Vad det beror på vet jag inte och det är inget jag tänker analysera heller.

Sanningen är dock den att Mootools uppdateras relativt ofta, inte lika ofta som jQuery men det behöver inte vara något dåligt.

Mootools är ett javascript bibliotek precis som jQuery men ändå inte. Mootools inriktar sig på "intermediate to advanced JavaScript developers". Istället för att förändra sättet du skriver Javascript på försöker Mootools göra det kraftfullare med en mer objekt orienterad approach. Även här finns cross-browser stöd, HTML manipulering, events och så vidare.

## Tekniska skillnader

Jag börjar med de direkt synliga skillnaderna mellan dessa två bibliotek: syntax.

"jQuery has changed the way that millions of people write JavaScript" - skriver jQuery på deras webbplats.

Mycket riktigt skiljer sig jQuery en del från "vanilla" JavaScript. Mootools å andra sidan har fokuserat mer på att göra JavaScript kraftfullare, hellre än att ändra sättet att skriva på. Vi tittar på lite exempel.

### Skapa ett element

Vi börjar med enklast möjliga, skapa ett HTML element som ska ha klassen "new" som vi sedan ska lägga till i body taggen.

#### jQuery

Enligt dokumentationen föreslås [append][0] funktionen:

```javascript
$('body').append('<div class="new" />');
```

#### Mootools

Mootools erbjuder en [Element][1] klass som vi använder för detta ändamål:

```javascript
var newElement = new Element('div', {
	'class': 'new'
});

document.body.grab(newElement);
```

#### Vanilla

För att tydligt se likheter och skillnader jämför vi med ren och fin JavaScript:

```javascript
var newElement = document.createElement('div');

newElement.className = 'new';
document.body.appendChild(newElement);
```

#### Summering

jQuery, med deras sätt att ändra på hur du skriver JavaScript, klarade uppgiften på 1 rad. I Mootools exemplet ser vi tydligt att det är mer objekt orienterat. Sista exemplet säger jag inte så mycket om, men som du ser är det väldigt likt Mootools exemplet.

En sak du kanske märker om vi går tillbaka till Mootools exemplet är att jag även där (såsom i sista exemplet) använder `document.body` som alltså inte tillhör Mootools api:t. Mer om det längre ner.

### Manipulera HTML dokument

Här finns en stor skillnad som är viktig att komma ihåg. Som nämnt tidigare förändrar jQuery sättet vi skriver på och detta blir väldigt tydligt här. För att kunna jobba med element i jQuery måste det vara ett [jQuery objekt][2]. Mootools bygger ut JavaScript och kan därför användas rakt av. 

För att demonstrera detta ska vi hitta __body__ taggen och lägga på en klass.

#### jQuery

```javascript
$('body').addClass('my-body');
```

#### Mootools

```javascript
document.body.addClass('my-body');
```

#### Summering

Det som händer när vi använder `$('body')` är att jQuery processar strängen 'body', försöker klura ut om vi vill hitta något eller skapa något och, när den är klar, returnerar en array som innehåller `document.body`. Alltså det vi använde direkt i Mootools exemplet. Du kan nog räkna ut själv vad som är snabbast. För att kunna snabba upp jQuery lite kan vi ändra koden enligt följande:

```javascript
$(document.body).addClass('my-body'); 
```

Det som händer nu är att jQuery vet vad vi vill och kan hitta elementet lite snabbare. Men som jag nämnde ovan, returneras en array, vilket gör att arrayen först loopas igenom och funktionen [addClass][3] läggs på varje item i arrayen, om det är ett element. Detta sker alltså även om vi från början visste att vi bara hade 1 element.

### Ett sista exempel

Jag känner mig extra snäll idag, så jag bjuder på ett exempel till. Något som är kul och oftast används är __effekter__. Både jQuery och Mootools stödjer detta men skiljer sig väldigt mycket. I exemplena nedan ska vi få ett element att ändra bredd och färg med en övergång.

#### jQuery

```javascript
$('#coolBox').animate({
	width: '100px', 
	backgroundColor: '#ff0'
}, 'short', 'linear');
```

#### Mootools

```javascript
var coolBox = document.id('coolBox'), morph = new Fx.Morph(coolBox, {
	duration: 'short',
	transition: 'linear'
});

morph.start({
	width: '100px',
	backgroundColor: '#ff0'
});
```

#### Summering

Ganska stora skillnader igen. jQuery klarar det på en rad och lite mer krävs för Mootools. Stora skillnaden är att Mootools erbjuder en [Morph][4] klass där du kan sätta en config (t.ex. duration och transition) och via funktionen [start][5] startar du animationen med dom css attributen du vill animera och configen som du satte tidigare används.

## Inga mer exempel, vad gör vi nu?

Att välja mellan dessa två är inte lika enkelt som att välja mellan Coca Cola eller Pepsi. Oftast kommer du in i ett projekt eller jobbar i ett team, oftast kommer det också vara jQuery som gäller.

Har man något att säga till om eller det är ditt eget projekt kan det vara värt att fundera på Mootools. Mootools blir väldigt kraftfullt i stora projekt, även i stora team. Med deras objekt orienterade sätt att jobba tvingas alla att skriva på samma sätt och jag personligen tycker att Mootools känns mer moget.

Fördelen med jQuery är att det är snabbt att lära sig även om man inte talar JavaScript i sömnen. jQuery blir riktigt användbart för designers eller för utvecklare med liten till ingen förståelse för JavaScript.

Självklart är det en stor fördel att känna till båda två. Det var allt, ut och lek nu!

[0]: http://api.jquery.com/append/
[1]: http://mootools.net/docs/core/Element/Element
[2]: http://api.jquery.com/jQuery/
[3]: http://api.jquery.com/addClass/
[4]: http://mootools.net/docs/core/Fx/Fx.Morph
[5]: http://mootools.net/docs/core/Fx/Fx.Morph#Fx-Morph:start