---
layout: post
title: "Bildmanipulering i JavaScript"
date: 2013-12-13 16:17:13 +0100
comments: true
categories: [Javascript, Filter]
---

När det läggs ett digitalt filter över en bild manipuleras pixeldatan i bilden. Färgerna i bilden räknas om för varje pixel och sedan visas en ny bild med de nya värderna. I fortsättningen kommer jag att använda termen filter för att beskriva manipuleringen<!--more--> av bildens data med hjälp av Javascript.

Några vanligt förekommande filter är inverterade färger, sepia, blur, kontrastökning, gråskala med mera.

I dagsläget är det vanligast att manipulera bilderna i t.ex. Photoshop innan de används på en hemsida, men det finns alternativ och ett av dom är Javascript.

#### 1.1 Varför ska man använda filter?

De som underhåller webbplatser är oftast inte själva utvecklare eller grafiker. Vill de placera samma bild på flera olika ställen men med olika filter behöver de inte själva editera bilden med hjälp av externa verktyg.

Om en sida har flera olika instanser av samma bild med olika filter, t.ex. porträttbilder av Andy Warhol, behöver browsern endast hämta bilden en gång. Det kan leda till en snabbare site med färre anrop.

#### 1.2 Kan man använda filter?

Om browsern stödjer canvas-objektet kan man använda filter. Idag har följande browsers stöd för canvas:

*   Internet Explorer 9+
*   Firefox
*   Opera
*   Chrome
*   Safari
*   Mobile browsers

I Android 4.0 ursprungs browser finns det, vad som antas vara, en bugg som gör att anges alpha i något annat än 0 eller 255 ändras pixelns färg istället.

Prestandan för canvas skiljer sig åt på olika plattformar. Desktop har generellt bra prestanda men mobila browsers kan vara långsammare.

## 2. Hur fungerar filter?
Som nämnt tidigare handlar det om att räkna om värden i bildens pixeldata. För att kunna manipulera bilder behövs ett canvas att rita på och ett ImageData-objekt.

Ett ImageData-objekt är en del av ett canvas, inte en bild eller en form. Objektet innehåller information för varje pixel inom den delen. Informationen består av fyra delar per pixel, RGBA:

R - Röd 		(0-255) <br />
G - Grön 		(0-255) <br />
B - Blå		(0-255) <br />
A - Alpha 	(0-255, 0 = helt osynlig - 255 = helt synlig)

Är en pixel röd och synlig har den värdet (255,0,0,255) och det är de värden som lagras i data-egenskapen hos ImageData-objektet. Principen för att rita på ett canvas är samma för bilder som för andra objekt, därför beskrivs först hur man ritar en simpel form.

### 2.1 Form

Koden nedan skapar ett objekt som är 100 x 100 px, där varje pixel är blå, och placerar objektet på ett canvas 10px från kanterna.

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	
	//Skapa ett objekt att arbeta med
	var imageData=ctx.createImageData(100,100);
	
	//Loopa igenom pixlarna
	for (var i=0;i<imageData.data.length;i+=4)
	 {
 		imageData.data[i+0]=0;		//red
			imageData.data[i+1]=0;		//green
			imageData.data[i+2]=255;	//blue
			imageData.data[i+3]=255;	//alpha
 	}

	//Skriv ut objektet på canvaset
	ctx.putImageData(imageData,10,10);

Resultat:<br />![](https://lh3.googleusercontent.com/eMaoG_Om5swKW1iyfLoZ36M_zw7LRuYk0A6oxVqzYV7JKblIScg7ILDyGDiVkGCNh3S-BOKydcM18rtiZBt4-9Xvvi5BiCMMpupJPnzMiNmvc2qFkxBVHYJJlA)

#### 2.1.1 Funktioner

##### createImageData():
Skapar ett nytt tomt ImageData-objekt. Objektets pixelvärden är ursprungligen (0,0,0,0), svarta och genomskinliga. Metoden används om det inte redan innan finns ett objekt att arbeta med, t.ex en bild, eller om ett objekt ska kopieras.

Syntax:

Det finns två versioner av metoden,

	var imgData = ctx.createImageData(width,height)
<ul>
<li>width = Bredden på det nya ImageData-objektet i px.</li>
<li>height = Höjden på det nya ImageData-objektet i px.</li>
</ul>

	var imgData = ctx.createImageData(imageData)

<ul>
<li>imageData = ett annat ImageData-objekt.</li>
</ul>
##### putImageData():
Skriver ut pixeldatan från ett specificerat ImageData-objekt på canvaset.

Syntax:

	ctx.putImageData(imgData, x, y, dirtyX, dirtyY, dirtyWidth, dirtyHeight)

*   imgData = Det imageData-objekt som ska skrivas ut på canvaset.
*   x = x-koordinaten för det övre vänstra hörnet av ImageData-objektet, angivet i px.
*   y = y-koordinaten för det övre vänstra hörnet av ImageData-objektet, angivet i px.
*   dirtyX = (optional) Det horizontella x-värdet att placera bilden på, angivet i px.
*   dirtyY = (optional) Det horizontella y-värdet att placera bilden på, angivet i px.
*   dirtyWidth = (optional) Bredden som ska användas för att rita ut bilden på canvaset.
*   dirtyHeight =(optional) Höjden som ska användas för att rita ut bilden på canvaset.

### 2.2 Bild

För att manipulera en bild behövs två ytterligare funktioner, drawImage och getImageData. Funktionen createImageData används när man vill kopiera en existerande bild eller för att skapa en tom yta.

Html:

	<img id="image" src="src.jpg" alt="" width="220" height="277">
	
	<canvas id="myCanvas" width="220" height="277"></canvas>

Script:

	document.getElementById("image").onload=function(){
			var c=document.getElementById("myCanvas");
 		var ctx=c.getContext("2d");
		
 		//Hämta bild
 		var img=document.getElementById("image");
		
	 		//Rita ut bild på canvas
 		ctx.drawImage(img,0,0);
		
 		//Hämta bilddata
 		var imgData=ctx.getImageData(0,0,c.width,c.height);

 		// invertera färgerna i bilden
 		for (var i=0;i<imgData.data.length;i+=4) {
				imgData.data[i]=255-imgData.data[i];
				imgData.data[i+1]=255-imgData.data[i+1];
				imgData.data[i+2]=255-imgData.data[i+2];
				imgData.data[i+3]=255;
 		}

 		//Skriv ut den manipulerade bilden på canvaset
 		ctx.putImageData(imgData,0,0);
	}

Resultat:<br />![](https://lh6.googleusercontent.com/BZDl6xazl4AZS4_vbJJK2ZzWN_MVIR8KWM3F7dwCTHGiI0Ryk-Ejqr8_GlsFN0JZH8w_dj61KYmrRL4Ad5_niAfjblRPSGIiA4gVDstauj-G7bkLTt2Q2O31Pg)

#### 2.2.1 Funktioner

##### drawImage():
Ritar ut en bild, video eller ett canvas på ett canvas. Metoden kan även rita ut delar av en bild och ändra en bilds eller videos storlek.

Syntax:

	context.drawImage(img,x,y);
	context.drawImage(img,x,y,width,height);
	ctx.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);

*   img = Det element som ska användas - bild, canvas eller video.
*   x = x-koordinaten där elementet ska placeras.
*   y = y-koordinaten där elementet ska placeras.
*   width = (optional)  vidden av elementet som ska användas (öka el. minska strl på elem).
*   height = (optional) höjden av elementet som ska användas (öka el. minska strl på elem).
*   sx = (optional) x-koordinaten där bilden ska börja skäras.
*   sy = (optional) y-koordinaten där bilden ska börja skäras.
*   swidth = (optional) vidden av den beskurna bilden.
*   sheight = (optional) höjden av den beskurna bilden.

##### getImageData():
Retunerar ett ImageData-objekt som kopierat pixeldatan från en specificerad del av canvaset.

Syntax:

	ctx.getImageData(x, y, width, height)

*   x = x-koordinaten för det övre vänstra hörnet som den ska börja kopiera från, angivet i px.
*   y = y-koordinaten för det övre vänstra hörnet som den ska börja kopiera från, angivet i px.
*   width = Bredden på det du vill kopiera.
*   height =Höjden på det du vill kopiera.

## 3. Slutsatser

När jag jämförde två sidor, en där jag hade två bilder och en där jag hade en bild som jag skrev ut två gånger med hjälp av filter-funktioner, fick jag följande resultat:
<table>
<tr>
<td></td>
<td><p>Javascript&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
<td><p>två bilder</p></td>
</tr>
<tr>
<td><p>Antal requests</p></td>
<td>2</td>
<td>3</td>
</tr>
<tr>
<td><p>kb överfört</p></td>
<td>149</td>
<td>285</td>
</tr>
<tr>
<td><p>paint (ms)</p></td>
<td>3.0</td>
<td>39.2</td>
</tr>
<tr>
<td><p>hämta bild/bilder (ms)&nbsp;&nbsp;&nbsp;&nbsp;</p></td>
<td>23</td>
<td>150</td>
</tr>
<tr>
<td><p>finished loading (ms)</p></td>
<td>117</td>
<td>198</td>
</tr>
</table>


Jag fick inte de resultat jag hade väntat mig och det beror främst på att jag trodde att paint-tiden skulle vara högre när jag använde canvas-objektet. Tittar man på ‘kb överfört’ tycker jag att man tydligt ser att fördelen men att använda filter är att man bara behöver ladda ner en bild. Tänker man den situationen i större skala med t.ex tio stycken bilder blir filter betydligt snabbare. Javascriptet jag använde var minimalt och använder man ett komplexare skript skulle tiden öka för att exekvera skriptet.

Ett ytterligare alternativ som är värt att nämna är web-kit filter. Varför jag inte anser att det är användbart än är att två av de störta webbläsarna, Firefox och Internet Explorer, inte har stöd för det. Skulle de utveckla stöd kan det bli ett starkt alternativ.

### 3.1 Bibliotek
Jag tror inte att det kommer att vara tidseffektivt att skriva ett eget Javascript-plugin. Uträkningarna är komplexa och det krävs väldigt noga testning för att inte slöa ner webbsidor. Nedan är några av de bibliotek som jag hittat som verkar ha potential.

Det bibliotek som verkar användas mest för tillfället är fabricjs. Det kan bero på att det innehåller väldigt mycket mer än bara filter - t.ex. former, drag-n-drop, resize med flera. Jag har även tittat på följande:

*   Filterr2 https://github.com/alexmic/filtrr/tree/master/filtrr2
*   Open source som inte känns helt färdigutvecklat. Senaste buggfixen var fem månader sedan.*   Pixastic [http://www.pixastic.com/lib/docs](http://www.pixastic.com/lib/docs/)/
*   Ett gratis bibliotek där du själv kan välja vilka komponenter du vill ladda ner.*   glfx.js https://github.com/evanw/glfx.js
*   Ett bibliotek som använder WebGL. Stödjs endast av de senaste browsers.*   camanjs http://camanjs.com/

Jag tror att camanjs har störts potential att vara användbart. Biblioteket har noga utförd dokumentation, uppdateras kontinuerligt, uppmanar till tester och är helt gratis.

## Referenser

http://www.khronos.org/registry/typedarray/specs/latest/#7.1

http://www.w3schools.com/tags/ref_canvas.asp

http://html5doctor.com/video-canvas-magic/

http://caniuse.com/css-filters

Codepen :
(Egna bilder behövs för att testa skripten) <br />
Länk till Javascript version: http://codepen.io/Sandra/pen/LjGgh <br />
Länk till version med två bilder :  http://codepen.io/Sandra/pen/lrjvJ