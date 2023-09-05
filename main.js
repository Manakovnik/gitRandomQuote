import { str1, str2, str3, str4, str5, str6, str7 } from "./strings.js";

// обьединяем все в одну строку
let str = str1.concat(str2, str3, str4, str5, str6, str7);

// регулярные выр-я для поиска цитат
const regExpQuote = /(?<=[«])[^»]+/gm; //  все что внутри кавычек
const regExpAuthor = /(?<=[»])[^«]+/gm; //  все что после кавычек и до кавычек

// помещаем результаты поиска в массивы
const quotesArrey = [...str.matchAll(regExpQuote)];
const authorArrey = [...str.matchAll(regExpAuthor)];

// создаем разметку страницы
const wrapper = document.createElement("div");
wrapper.classList.add("wrapper");

const title = document.createElement("h1");
title.textContent = "Случайная цитата";
title.classList.add("title");

const button = document.createElement("button");
button.textContent = "Получить цитату";
button.classList.add("btn");

const qouteWrapper = document.createElement("div");

// создаем аудио для озвучки процесса печатания текста
const audioTyping = document.createElement("audio");
audioTyping.src = "/sounds/typing-text.mp3";
audioTyping.autoplay = true;

const audioSignature = document.createElement("audio");
audioSignature.src = "/sounds/signature.mp3";
audioSignature.autoplay = true;

// что происходит при нажатии на кнопку
button.onclick = () => {
  button.classList.add("btn-active");
  qouteWrapper.innerHTML = "";

  let index = Math.floor(Math.random() * quotesArrey.length); //создаем случайное число

  //создаем разметку цитаты и подписи
  qouteWrapper.classList.add("quote__wrapper");
  const quote = document.createElement("h2");
  quote.classList.add("quote__text");
  const author = document.createElement("p");
  author.classList.add("quote__author");

  // функция получения массив из строки
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

  //выводим текст цитаты по 1 букве с интервалом
  function printText() {
    audioTyping.play(); //запускаем аудио поток

    let interval = setTimeout(() => {
      text += getArrayFromString(quotesArrey)[count];
      quote.textContent = text;
      count++;

      if (count >= getArrayFromString(quotesArrey).length) {
        audioTyping.pause(); //останавливаем аудио поток
        count = 0;

        printSignature(); //когда вся цитата напечатана начинаем выводить подпись
        return true;
      }
      printText();
    }, 100);
  }
  printText();

  function printSignature() {
    audioSignature.play();

    let interval = setTimeout(() => {
      signature += getArrayFromString(authorArrey)[count];
      author.textContent = signature;
      count++;

      if (count >= getArrayFromString(authorArrey).length) {
        audioSignature.pause();
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

document.body.append(wrapper, audioTyping, audioSignature);
