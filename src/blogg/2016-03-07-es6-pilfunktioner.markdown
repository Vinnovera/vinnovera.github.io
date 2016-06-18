---
template: post.html
title: "ES6 - Pilfunktioner"
date: 2016-03-07 13:43:24
comments: true
tags: Nyheter
author: Daniel Jansson
authorDescription: Daniel Jansson jobbar som front-end utvecklare på Vinnovera.
authorImage: /images/profiles/daniel.jpg
authorMail: daniel@vinnovera.se
---

EcmaScript 6 (ES6), som numera kallas EcmaScript 2015, godkändes förra året av
EcmaScript International och är högst relevant för oss utvecklare. <!--more-->
Det är den största uppdateringen sedan språket skapades och det börjar nu närma sig andra,
mer mogna programmeringsspråk i syntax och innehåll.  Specifikationen presenterar
många intressanta nyheter, bland annat pilfunktioner, som jag tänker presentera
och visa exempel på i det här blogginlägget.


Pilfunktioner är alltid anonyma och har en kortare och mer komprimerad syntax än
anonyma funktioner i EcmaSctript 5 (ES5), vilket betyder mindre och utrymmeseffektivare
kod, men dessvärre också en något mer svårläst kod.

Det som karaktäriserar pilfunktioner är ett piltecken:&nbsp;=>  

En pilfunktion skrivs utan att ange ordet "function", i stället anges endast argument
följt av piltecknet. En pilfunktion returnerar alltid något och därför behöver inte
heller "return" skrivas ut.

Exemplet nedan illustrerar iteration över en array med pilfunktion i ES6 utan måsvingar
och dess motsvarighet i ES5:  

<span style="color: orange;">**ES6**</span>  
[1, 2, 3, 4].<span style="color: brown;">map</span>((num, index)) => num \* 2 + index);  

<span style="color: orange;">**ES5**</span>  
[1, 2, 3, 4].<span style="color: brown;">map</span>(<span style="color: green;">function</span>(num, index)) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: purple;">return</span> num \* 2 + index);  
}

Måsvingar är valfria och kan användas om funktionen är mer
komplex. Notera dock att om måsvingar används, måste "return" skrivas ut på samma sätt
som i ES5.

Exemplet nedan illustrerar samma iteration över en array med pilfunktion i ES6 men
denna gång med måsvingar:  

<span style="color: orange;">**ES6**</span>  
[1, 2, 3, 4].<span style="color: brown;">map</span>((num, index)) => {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">let</span> multiplier = index \* 2;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: purple;">return</span> num \* multiplier;  
}  

## Parentes - vara eller icke vara
Det är intressant att notera att pilfunktioner i ES6 gör att man inte behöver använda parentes
vid anrop med endast ett argument, men att vid inga eller fler än ett argument krävs parentes,
så som i ES5.

Exemplen nedan illustrerar pilfunktion med olika antal argument och dess motsvarigheter i ES5:  

<span style="color: orange;">**ES6**</span>  
<span style="color: blue;">let</span> sum = ( ) => 1 + 2; &nbsp;<span style="color: grey;">//inga argument</span>  
<span style="color: blue;">let</span> square = x => x + x;  &nbsp;<span style="color: grey;"> //ett argument</span>  
<span style="color: blue;">let</span> value = (x, y) => x + y;  &nbsp;<span style="color: grey;">//flera argument</span>  

<span style="color: orange;">**ES5**</span>  
<span style="color: grey;">//inga argument</span>  
<span style="color: blue;">var</span> sum = <span style="color: green;">function</span>( ) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: purple;">return</span> 1 + 2;  
}  
<span style="color: grey;">//ett argument</span>  
<span style="color: blue;">var</span> square = <span style="color: green;">function</span>(x) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: purple;">return</span> x + x;  
}  
<span style="color: grey;">//flera argument</span>  
<span style="color: blue;">var</span> value = <span style="color: green;">function</span>(x, y) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: purple;">return</span> x + y;  
}

Notera också att det med pilfunktioner i ES6 krävs parentes runt ett returnerat objekt. Detta för att
inte orsaka feltolkning av kod, eftersom måsvingar både omger ett objekt och en funktionskropp. Detta
gäller endast om man skriver den mer kortfattade varianten utan måsvingar runt funktionskroppen.

Exemplen nedan visar hur en pilfunktion returnerar ett objekt och dess motsvarigheter i ES5:  

<span style="color: orange;">**ES6**</span>  
<span style="color: grey;">/\*utan måsvingar runt funktionskroppen måste parentes omge</span>  
<span style="color: grey;">objektet\*/</span>  
<span style="color: blue;">var</span> func = ( ) => ({ foo: 1 });

<span style="color: grey;">//med måsvingar runt funktionskroppen behövs inte parentesen</span>  
<span style="color: blue;">var</span> func = ( ) => {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: purple;">return</span> { foo: 1 };  
}

<span style="color: orange;">**ES5**</span>  
<span style="color: blue;">var</span> func = <span style="color: green;">function</span>( ) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span style="color: purple;">return</span> { foo: 1 };  
}

Pilfunktioner har dessutom ett helt annat sätt att förhålla sig till ”scope” än sin föregångare.<br />

## Intelligentare än sin föregångare
Vid användandet av ”this” inuti en pilfunktion behöver man i ES6 inte spara en referens till
korrekt ”scope” utanför funktionen, eftersom pilfunktioner automatiskt binder ”this” till det
omgivande ”scopet”. Det omständiga sättet i ES5 att ständigt behöva skapa referenser till det ”scope”
man vill anropa, slipper man därmed i ES6.

Exemplet nedan visar hur en konstruktorfunktion hanterar scope i ES6 och i ES5
vid exekvering av en loop.  

<span style="color: orange;">**ES6**</span>  
<span style="color: green;">class</span> Person( ) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.age = 0;  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setInterval(( ) => {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;this.age++;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 1000);  
}  
<span style="color: blue;">var</span> person = <span style="color: red;">new</span> Person( );  

<span style="color: orange;">**ES5**</span>  
<span style="color: green;">function</span> Person( ) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: blue;">var</span> self = this;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.age = 0;  

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setInterval(<span style="color: green;">function</span>( ) {  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.age++;  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;}, 1000);  
}  
<span style="color: blue;">var</span> person = <span style="color: red;">new</span> Person( );  

## Sammanfattning
Pilfunktioner skrivs i ES6 med en minimal syntax, vilket gör att det går snabbare ett skriva
och minskar den programmatiska storleken.  Dessutom finns en inbyggd intelligens i hanteringen
av ”scope”, vilket ytterligare reducerar kodmängden. Den mer kompakta syntaxen försämrar dock
läsbarheten något, och den får då ge efter för det mer effektiva uttrycket.
