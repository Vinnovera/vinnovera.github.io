---
template: post.html
title: "Hittat på nätet #2"
date: 2014-03-14 14:51:55 
comments: true
author: Per Stenström
tags: [Länkar, Nyheter, Hittat]
authorDescription: Per Stenström jobbar med frontend på Vinnovera.
authorImage: /images/profiles/per.jpg
authorMail: per@vinnovera.se
---
Dagens tema är SVG - det bästa sedan skivat bröd.
<!--more-->
## Frame-by-frame animation using SVG and SMIL
![Frame-by-frame animation using SVG and SMIL][03]
[Frame-by-frame animation using SVG and SMIL][4]<br>
När den här artikeln skrevs fungerade SMIL animationer i SVG bara i webkit-browsers. Sedan dess har fler hunnit ikapp.

## Rethinking Responsive SVG
[Rethinking Responsive SVG][2]<br>
Responsiva vektorbaserade ikoner som ändrar utseende beroende på tillgängligt utrymme. Det är ett av alla användningsområden för SVG-bilder. Smashing Mag går igenom några olika metoder att åstadkomma detta, till exempel ett där SVG filen innehåller sin egen CSS och JavaScript.

## Thoughts on Media Queries for Elements
![Thoughts on Media Queries for Elements][02]
[Thoughts on Media Queries for Elements][3]<br>
Media Queries för element ligger högt på vår önskelista. Hur skulle det kunna se ut? Intressant är hur oändliga loopar kan hanteras.

## A Q&A on the Picture Element
[A Q&A on the Picture Element][5]<br>
Responsiva bilder är något oerhört viktigt för dagens webb, men det har aldrig funnits någon standard och de lösningar som finns är beroende av JavaScript. Nu har dock browser-utvecklarna äntligen enats om att implementera `<picture>`-elementet. Mozilla har till och med sagt att de planerar implementera det redan Q1 2014.

## Top JavaScript MVC Frameworks
![Top JavaScript MVC Frameworks][01]
[Top JavaScript MVC Frameworks][1]<br>
InfoQ har gjort en enkät som undersöker vilket JavaScript-MVC-ramverk som går snabbast att komma igång med, och hur mycket värde det tillför.

## Do Not Use bodyParser with Express.js
[Do Not Use bodyParser with Express.js][0]<br>
Varje gång Express.js hanterar ett POST-request med antingen `bodyParser()` eller `multipart()` skapas en temp-fil. De filerna tas inte bort igen av Express.js, vilket så klart är ett problem. Den här artikeln går igenom hur du kan hantera det.

[0]: http://andrewkelley.me/post/do-not-use-bodyparser-with-express-js.html
[1]: http://www.infoq.com/research/top-javascript-mvc-frameworks
[2]: http://coding.smashingmagazine.com/2014/03/05/rethinking-responsive-svg/
[3]: http://www.jonathantneal.com/blog/thoughts-on-media-queries-for-elements/
[4]: http://www.joningram.co.uk/article/svg-smil-frame-animation/
[5]: http://alistapart.com/blog/post/picture-element-qa

[01]: /images/content/posts/hittat-pa-natet-number-2/topjsmvcframework.jpg
[02]: /images/content/posts/hittat-pa-natet-number-2/mediaqueryforelement.jpg
[03]: /images/content/posts/hittat-pa-natet-number-2/svgandsmil.jpg