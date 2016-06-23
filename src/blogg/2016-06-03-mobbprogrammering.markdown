---
template: post.html
title: "Mobbprogrammering"
date: 2016-06-03 09:00:00
comments: true
tags: Nyheter, Vi
author: Jonas Myrenås
authorDescription: Jonas är Tech lead på Vinnovera. När han inte pysslar med det hjälper han King med frontendutveckling i deras interna verktyg.
authorImage: /images/profiles/jonasmyrenas.jpg
authorMail: jonas.myrenas@vinnovera.se
---
I många år har det surrats om parprogrammering i utvecklarkretsar, men de senaste åren har detta koncept tagits 
ett steg längre till programmering i grupp, s.k. Mob programming. Detta lät ju spännande så vi bestämde oss för att 
pröva konceptet.
<!--more-->
<div class="video youtube">
	<iframe width="640" height="360" src="//www.youtube.com/embed/nhn5g7oujzI?rel=0" frameborder="0" allowfullscreen></iframe>
</div>
<br>
I korthet går det ut på att man sitter ihop i en grupp där man turas om att skriva. Den som skriver kallas Driver och de andra kallas Navigators. 
Samma namngivning som för parprogrammering, tänker den uppmärksamme, och så är det ju. Man roterar sedan med fördel på förutbestämda tidsintervall, lämpligen runt 15 minuter.

Vi delade upp oss i två team, för att få lagom stora team. Det slutade med lite sjukavhopp på ett team på 4 pers och 
ett på 6. Det ena teamet bestämde sig för att de ville göra den ultimata infinite scroll:en och den andra ville testa ett koncept på 
utvecklad Blocket-sökning. Mer om koncepten nedan. Vi hade två dagar på oss och det gällde att både finputsa på 
metodik samt att komma fram till något resultat som impade åtminstonde något på den andra gruppen.
 
Själv tillhörde jag 6-personers-gruppen som körde Blocket sök. Vi lade upp ett koncept som gick ut på att under 
två dagar ta fram en prototyp för en tänkt produktägare att visa upp för sina finansiärer. Konceptet skulle innebära
en form av sökning efter produkter som listar dem beroende på pris inkluderat reskostnader för att hämta upp dem. 
Per Lundgren fick agera produktägare och även styra UX/design. Vi körde 3 repor om 15 minuter och sedan ett kort informellt retro
kombinerat med bensträckare. 

Efter två dagar hade vi en färdig fungerande prototyp som gick mot ett mockat blocket-api, googles kart-api och som listade och 
sorterade sökresultat efter totalpris uträknat på grundpris + reskostnad för bilresa från besökarens till annonsörens position. 
Detta skrivet i ett för gruppen totalt nytt js-ramverk, Vue.js. Det nya ramverket benade vi ut gemensamt och kunskapsspridningen på det 
är helt oöverträffad. Mission accomplished!
   
Den andra gruppen hade bestämt sig för att en vanlig standard infinite scroll kunde förbättras. De utgick från en tekniskt färdig fungerande 
lösning tagen från en stor svensk retail-kedja där några teammedlemmar implementerat den. Några features som de lade till var möjlighet 
till total översikt av scrollens längd, snyggare topmeny som inte var i vägen på mobila lösningar, navigering till detalj och tillbaka 
igen till rätt scrollposition, med mera. Där vårt team fokuserade på att få ut en snabb visuellt tilltalande prototyp fokuserade detta teamet mer 
på teknisk finputsad lösning. Med hjälp av en snygg liten tjänst vid namn NGrok kunde alla få upp deras kod på sina 
respektive devicer och konstatera att lösningen de fått till var klockren. Mission accomplished!
  
  <img src="/images/content/posts/barcelona-workshop/barcelona_gruppbild.jpg" alt="Gruppbild Barcelona" class="" />

Så vad tyckte då de olika teamen om mob programming? Några farhågor som vädrades före experimentet var att det skulle kännas ineffektivt 
att inte dela upp sig, eller att det skulle vara risk att man mentalt zonade ut om man bara satt bredvid den som hade tangentbordet. Båda dessa 
farhågor kom på skam visade det sig. Vid vår slutliga retro uttryckte så gott som alla positiva ordalag. Det känndes överlag som teamen 
presterade resultat med hög kvalitet, kunskapsspridningen i teamet var total, effektiviteten var hög och alla hade haft ruskigt roligt! 
För att verkligen hårdtesta metodiken och farhågan om utzoning hade vi dessutom på kvällen dag två besökt inte mindre än fyra olika 
tapas-restauranger i Barcelonas down-town. Trots detta distraktionsmoment var fokusen total dag två. Ingen somnade, 
ingen strö-kollade mobilen, ingen gäspade! 

Våra tips om du vill testa:

- Korta iterationer, 15 minuter sedan rotation.
- Planera in bensträckare. Det är intensivt arbete för hjärnan.
- Börja var dag med att scrambla rotationslistan, så att inte en person alltid hamnar efter sammma föregående person.
- Lämpliga lokaler och lämplig utrustning. Diskussionerna gick rätt högljutt till ibland så man vill kanske ha ett eget rum. 
- Projektor eller stor rejäl TV så alla ser ordentligt. Bra med dedikerad dator med flera IDE:er installerade om teamets medlemmar föredrar olika. Att byta dator tar för lång tid. 
- Planera in egentid för mail och hjärnpaus.
- Olika personer har olika krav, kör retro ofta i början för att fånga upp allas önskemål

Så kommer vi att använda mob programming i verkliga projekt? Absolut! Några teammedlemmar sade sig vilja ta metodiken till sina 
respektive kunder direkt på måndag morgon. Andra, som jag själv som sitter som ensam frontendutvecklare i produkten jag jobbar med får kanske 
lägga det på is ett tag men en vacker dag så uppstår ett lämpligt tillfälle och då kommer jag definitivt att rekommendera det. 

