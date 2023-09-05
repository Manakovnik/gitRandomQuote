import { str1, str2, str3, str4, str5, str6, str7 } from "./strings.js";

// обьединяем все в одну строку
let str = str1.concat(str2, str3, str4, str5, str6, str7);

// регулярные выр-я для поиска цитат
const regExpQuote = /(?<=[«])[^»]+/gm; //  все что внутри кавычек
const regExpAuthor = /(?<=[»])[^«]+/gm; //  все что после кавычек и до кавычек

const quotesArrey = [...str.matchAll(regExpQuote)];
const authorArrey = [...str.matchAll(regExpAuthor)];

const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const title = document.createElement("h1");
title.textContent = "Случайная цитата";
title.classList.add("title");

const button = document.createElement("button");
button.textContent = "Получить цитату";
button.classList.add("btn");

const qouteWrapper = document.createElement("div");

button.onclick = () => {
  button.classList.add("btn-active");
  qouteWrapper.innerHTML = "";
  let index = Math.floor(Math.random() * quotesArrey.length);

  qouteWrapper.classList.add("quote__wrapper");
  const quote = document.createElement("h2");
  quote.classList.add("quote__text");
  const author = document.createElement("p");
  author.classList.add("quote__author");

  // получаем массив из строки
  function getArrayFromString(arr) {
    const arrey = Array.from(arr[index]);
    const letters = arrey[0].split("");
    return letters;
  }

  getArrayFromString(quotesArrey);
  getArrayFromString(authorArrey);

  let count = 0;
  let text = "";
  let signature = "";

  function printText() {
    let interval = setTimeout(() => {
      text += getArrayFromString(quotesArrey)[count];
      quote.textContent = text;
      count++;
      if (count >= getArrayFromString(quotesArrey).length) {
        count = 0;
        printSignature();
        return true;
      }
      printText();
    }, 50);
  }
  printText();

  function printSignature() {
    let interval = setTimeout(() => {
      signature += getArrayFromString(authorArrey)[count];
      author.textContent = signature;
      count++;
      if (count >= getArrayFromString(authorArrey).length) {
        count = 0;
        return true;
      }
      printSignature();
    }, 50);
  }

  qouteWrapper.append(quote, author);

  if (qouteWrapper.innerHTML != "") {
    button.textContent = "Получить другую цитату";
  }
};

wrapper.append(title, qouteWrapper, button);

document.body.append(wrapper);
