---
template: post.html
title: "ES6 - Pilfunktioner"
date: 2015-02-09 13:43:24
comments: true
tags: Nyheter
author: Daniel Jansson
authorDescription: Daniel Jansson jobbar som front-end utvecklare på Vinnovera.
authorImage: /images/profiles/daniel.jpg
authorMail: daniel@vinnovera.se
---

Som vi skrev tidigare i år så ser EcmaScript 6 ut att bli ett stort kliv framåt i
modularisering och struktur för Javascript som vi känner till det idag. En de nyheterna
i ES6 är pil-funktioner.
<!--more-->

## Effektivitet
Pilfunktioner finns sedan tidigare i många andra språk, t ex C#. Dessa är alltid
anonyma och har en kortare och mer komprimerad syntax än vanliga anonyma funktioner
vilket betyder mindre kod och mer effektivt att skriva. Det nya pil-tecknet karaktäriserar
pil-funktionen.

![arrow-sign](/images/content/posts/es6-en-overblick/arrow-function1.png)

## Returnerar alltid något
Ordet function försvinner och kvar är endast argument följt av piltecknet.
En pil-funktion returnerar alltid något och behöver därmed inte skrivas ut,
liksom måsvingar. Dessa båda är valfria och kan användas om funktions-kroppen
gör fler saker än att bara returnera något.

![arrow-functions](/images/content/posts/es6-en-overblick/arrow-function2.png)


## Scope
Pilfunktioner beter sig annorlunda än vanliga anonyma funktioner på det sättet att 
de binder till dess omgivande scope istället för till dess inre. Det gör att man inte 
behöver spara en referens till det yttre scopet.

![scope](/images/content/posts/es6-en-overblick/arrow-function-scope1.png)
![scope](/images/content/posts/es6-en-overblick/arrow-function-scope2.png)


## Argument
Vid inga eller fler argument krävs parentes, men inte vid endast ett argument. För att
returnera ett objekt måste det omges av en parentes.

![arguments](/images/content/posts/es6-en-overblick/arrow-function-argument1.png)
![arguments](/images/content/posts/es6-en-overblick/arrow-function-argument2.png)


## Sammanfattning
Fördelen med pilfunktioner är att syntaxen är kompaktare och går snabbare att skriva
samt hanteringen av this som binds till det omgivande scopet. Nackdelen är läsbarheten
som får ge efter för det mer effektiva uttrycket, men det är säkerligen ocks en vaneskak.