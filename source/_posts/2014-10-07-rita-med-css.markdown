---
layout: post
title: "Rita med CSS"
date: 2014-10-07 14:55:09 +0200
comments: true
categories: [CSS]
author: Alexandra Bjelkholm
authorDescription: Alexandra Bjelkholm jobbar med frontend på Vinnovera.
authorImage: /images/profiles/sandra.jpg
authorTel: 070-491 84 29
authorMail: alexandra@vinnovera.se

---

Att få fram olika former och bilder med CSS kan ju inte vara så svårt. Eller?

<!--more-->

Efter att ha sett Lynn Fishers [exempel][0] på vad hon åstadkommit med endast en div tänkte jag att det var dags att dyka lite djupare i vissa CSS-tekniker. Jag ville begränsa mig till att endast använda ett HTML-element för att se vad jag kunde få fram. Jag började med att titta på vad man kan göra med gradient-backgrounds.

## Gradient-backgrounds

![Gradients][00]  

```css
/* 1. */
.gradient-default {
	background-image: linear-gradient(purple ,pink, white);
}

/* 2. */
.gradient-to-right {
	background-image: linear-gradient(to right, purple, pink, white);
}

/* 3. */
.gradient-to-top-right {
	background-image: linear-gradient(45deg, purple , pink, white);
}

/* 4. */
.gradient-color-stop {
	background: linear-gradient(-45deg, purple, transparent 30%, transparent 70%, purple), linear-gradient(45deg, purple, pink 10%, white 90%, purple);
}

/* 5. */
.gradient-radial {
	background-image: radial-gradient(circle at top right, white 30%, pink 30%, pink 60%, purple 60%);
}

/* 6. */
.gradient-radial-repeat {
	background-image: repeating-radial-gradient(circle at top right, #fb7afb, purple 50px);
}

/* 7. */
.circle {
	background-image: radial-gradient(white, pink, purple);
	border-radius: 50%;
}
```

En av de första begränsningarna jag kände av var att man inte kan sätta en height på gradients, t.ex. att den bara syns mellan högra övre hörnet och 50px mot mitten. Alternativet är att man målar över delar av gradienten med en annan färg genom att lägga på ytterligare en linear-gradient med transparent-delar, som figur nr 4.

## Box-shadow

![Box shadow][01]

```css
.eye {
	position: absolute;
	top: 50%;
	left: 50%;
	height: 150px;
	width: 150px;
	margin-top: -75px;
	margin-left: -75px;
	border-radius: 50%;
	z-index: 0;
	border: 1px solid #986c69;
	background: radial-gradient(circle, #000 8%, transparent 15%, transparent 29%, rgba(61,39,18,0.7) 33%, transparent 38%), radial-gradient(circle, #543808, #432501 25%, #715432 35%, white 38%);
}

.eye:after {
	display: block;
	position: absolute;
	top: 50%;
	left: 50%;
	content: "";
	border-radius: 50%;
	box-shadow: -1px -24px 1px -7px #eee, 0px -25px 2px -5px #666, -14px -26px 1px -9px #eee, -15px -27px 2px -7px #666;
	z-index: 3;
	width: 26px;
	height: 26px;
}
```

Box-shadow känns helt magiskt när man börjar utforska det men det blev snabbt väldigt frustrerande. Jag trodde jag hade hittat det bästa sen SVG och om man inte begränsat sig till att endast använda ett HTML-element kan man säkert rita precis vad som helst med dessa två CSS-tekniker men jag insåg att jag endast hade tre former att röra mig med. Box-shadow kan ändra i storlek från sitt ursprungselement men den kan inte byta form så vill man bygga allt i en div har man diven, :after och :before att arbeta med.

## Tre former, tre tekniker

![Shapes][02]

```css
.ghost {
	width: 170px;
	height: 160px;
	background-color: red;
	border-radius: 50% 50% 0% 0%;
	position: relative;
	margin: 0 auto;
}

.ghost:before {
	display: block;
	position: absolute;
	content: "";
	top: 18px;
	left: 17px;
	height: 20px;
	width: 20px;
	border-radius: 50%;
	background-color: yellow;
	box-shadow: 15px 0px 0px 0px white, -15px 0px 0px 0px white, 0px 15px 0px 0px white, 0px -15px 0px 0px white, 11px -11px 0px -2px green, -11px -11px 0px -2px green, -11px 11px 0px -2px green, 11px 11px 0px -2px green;
}

.ghost:after {
	display: block;
	position: absolute;
	content: "";
	bottom: -35px;
	height: 80px;
	width: 50px;
	border-radius: 50%;
	background-color: red;
	box-shadow: 60px 0px 0px 0px red,120px 0px 0px 0px red, 49px -82px 0px -13px blue, 40px -82px 0px -5px white, 120px -82px 0px -13px blue, 111px -82px 0px -5px white;
}
```

Jag har i mina exempel valt att addera element för att rita men det går även att rita allt utom det man försöker få fram genom att subtrahera från en form istället. Jag tror att lär man sig bemästra de två sätten så kan man komma långt med tre former och tre tekniker.

## Referenser
[A Single Div][0]   
[CSS-tricks][1]

[0]: http://a.singlediv.com/
[1]: http://css-tricks.com/css3-gradients/

[00]: /images/content/posts/rita-med-css/gradients.jpg
[01]: /images/content/posts/rita-med-css/eye.jpg
[02]: /images/content/posts/rita-med-css/ghost.jpg