---
layout: page
title: "Photowall"
date: 2013-12-13 15:51
comments: false
sharing: true
footer: true
---
![Skärmdump photowall.se](/images/content/projects/photowall/screenshot.jpg)

Tillsammans med talangfulla fotografer och designers från hela världen skapar <a href="http://www.photowall.se">Photowall</a> inspirerande och unik väggdekor. De erbjuder skräddarsydda tapeter och canvastavlor från ett stort bildutbud med möjligheten att skapa din egna personliga miljö.

De arbetar också med licensierade varumärken och är officiell partner för Disney, Star Wars, Modesty Blaise, Moomin Characters mfl.

## Vinnoveras roll

Vår roll i projektet var projektledning, kravställning, interaktionsdesign och frontend-utveckling. Vi samarbetade med Kristoffer Gustafsson på [Parsley.se](http://parsley.se/) som gjorde grafisk design och [LarvIT](http://larvit.se/) som stod för backend tillsammans med Photowalls egna utvecklingsavdelning.

![Skärmdumpar photowall.se](/images/content/projects/photowall/responsive.jpg)

## Teknik
### Frontend
Mycket av utmaningen med projektet låg i en kodbas som hanterar olika typer av enheter, skärmstorlekar och interaktionssätt. Eftersom motiven storleksanpassas i webbläsaren av kunden, behövde gränssnittet fungera både på en dator med mus och tangentbord och en mobiltelefon med pekskärm.

![Beskräning på desktop](/images/content/projects/photowall/crop1.jpg)
*Bilden beskärs direkt på sidan på större skärmupplösningar*

![Beskräning på mobil](/images/content/projects/photowall/crop2.jpg)
*Bilen beskärs i fullskärmsläge på mindre skärmar. T.ex. mobiltelefoner*

#### Tekniker som använts
* CSS media queries (responsive)
* InuitCSS - http://inuitcss.com/
* Sass CSS - http://sass-lang.com/
* Compass - http://compass-style.org/
* Modernizr - http://modernizr.com/
* iScroll - http://cubiq.org/iscroll-4
* J.Resig JavaScript Micro-Templating - http://ejohn.org/blog/javascript-micro-templating/
* jQuery - http://jquery.com/

### Frontend-optimeringar
Med ett stigande besökarantal på enheter med sämre internetuppkoppling behövdes ett mer optimerat frontend. Vinnovera hjälpte Photowall att optimera sajten med en cachelösning byggd på Varnish. Det lades även stort fokus på att få ner storleken och antalet resurser som laddas in när sajten besöks.

#### Tekniker som använts
* Varnish cache - https://www.varnish-software.com/
* Minifiering och komprimering av resurser

### Continuous integration
För att hålla en hög utvecklingstakt, hög kvalitet på kodbasen och med ett utvecklarteam som är utspritt över Sverige och Ukraina, hade Vinnovera i uppgift att sätta upp en CI-lösning baserad på Jenkins.

![Jenkins](/images/content/projects/photowall/jenkins.jpg)

#### Tekniker som använts
* Jenkins - http://jenkins-ci.org/
* GitHub - https://github.com/
* PHPUnit - http://phpunit.de/
* QUnit - http://qunitjs.com/
* Selenium - http://www.seleniumhq.org/

### Selenium-tester
Med Selenium testas sajten regelbundet för att försäkra att bl.a. köpflödet fungerar i en mängd olika webbläsare. Seleniumtesterna körs i molntjänsten SauceLabs.

![SauceLabs](/images/content/projects/photowall/saucelabs.jpg)

#### Tekniker som använts
* NodeJS - http://nodejs.org/
* Node Webdriver - https://github.com/admc/wd
* Selenium - http://www.seleniumhq.org/
* SauceLabs - http://saucelabs.com/
