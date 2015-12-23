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

## 1. Block-scope variabler

##Let
ECMAScript 6 introducerar en ny typ av variabel kallad ”let”. Den här är en så kallad block-scope
variabel. Let-variabler kan användas var som helst men är av särskilt intresse att använda i till 
exempel loopar för att försäkra sig om att variabeln endast är tillgänglig i den kontexten där 
den exekveras.

![blockscope](/images/content/posts/es6-en-overblick/blockscope1.jpg)









## The Cost of Frameworks
![Framework Speed](/images/content/posts/hittat-pa-natet-number-15/framework_speed.jpg)

[aerotwist.com][0] För- och nackdelar med att använda frameworks. Blir t.ex. siten långsammare, går utvecklingen snabbare?

## I Turned Off JavaScript for a Whole Week and It Was Glorious
![No Script](/images/content/posts/hittat-pa-natet-number-15/js.jpg)

[wired.com][1] Förvånansvärt många siter fungerar utan Javascript och vissa är t.o.m. snabbare. Problemet är när man ska streama video eller använda browser plugins så fungerar det inte utan Javscript. Slutsatsen blev att han vill ha större möjlighet att kontrollera vad som körs i hans browser.

## Tips for Creating and Exporting Better SVGs for the Web
![SVGs for web](/images/content/posts/hittat-pa-natet-number-15/svg_circle_path.jpg)
[sarasoueidan.com][2] Stegvis genomgång av vad som är bra att tänka på när man skapar och arbetar med SVGs.

## The case for HTML. By @chockenberry. (Read from bottom to top. But you know that.)
![@chockenberry](/images/content/posts/hittat-pa-natet-number-15/craig_hockenberry.png)
[@chockenberry][4] Är det verkligen rättvist att jämföra en HTML-sida och en native app? Slutar man uppdatera en app slutar den oftast att fungera. Men visst har han en poäng i att iOS-utvecklare inte lämnar samma typ av legacy bakom sig.

## psd.js
[psd.js][3] Med hjälp av psd.js och node kan du arbeta med psd-filer utan photoshop.

## Glen Keane – Step into the Page
<div class="video youtube">
	<iframe width="560" height="315" src="https://www.youtube.com/embed/GSbkn6mCfXE" frameborder="0" allowfullscreen></iframe>
</div>
Glöm inte att utmana dig själv och ditt arbetssätt.

[0]: https://aerotwist.com/blog/the-cost-of-frameworks/
[1]: http://www.wired.com/2015/11/i-turned-off-javascript-for-a-whole-week-and-it-was-glorious/
[2]: http://sarasoueidan.com/blog/svg-tips-for-designers/
[3]: https://github.com/meltingice/psd.js
[4]: https://mobile.twitter.com/zeldman/status/667846154114105344