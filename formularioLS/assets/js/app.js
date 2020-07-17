//Variables

const listaTweets = document.getElementById("lista-tweets");

//Event Listeners
eventListeners();
function eventListeners() {
  //Cuando se envia el formulario
  document
    .querySelector("#formulario")
    .addEventListener("submit", agregarTweet);

  //Borrar tweets
  listaTweets.addEventListener("click", borrarTweet);

  //Contenido cargado
  document.addEventListener("DOMContentLoaded", localStorageListo);
}

//Funciones

//Añadir tweet del formulario

function agregarTweet(e) {
  e.preventDefault();

  //Leer el valor del textarea
  const tweet = document.getElementById("tweet").value;

  //Añadir al Local Storage
  agregarTweetLocalStorage(tweet);
}

//Elimina el boton del Tweet del DOM
function borrarTweet(e) {
  e.preventDefault();
  if (e.target.className === "borrar-tweet") {
    e.target.parentElement.remove();
    borrarTweetLocalStorage(e.target.parentElement.innerText);
  }
}

//Mostrar datos de local storage en la lista

function localStorageListo() {
  let tweets;
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet) {
    //Crear botón de eliminar
    const botonEliminar = document.createElement("a");
    botonEliminar.classList = "borrar-tweet";
    botonEliminar.innerText = "X";

    //Crear elemento y añadirle el contenido a la lista
    const li = document.createElement("li");
    li.innerText = tweet;

    //Añade el boton de eliminar al tweet
    li.appendChild(botonEliminar);

    //añade el tweet a la lista
    listaTweets.appendChild(li);
  });
}

//Agrega tweet a local storage
function agregarTweetLocalStorage(tweet) {
  let tweets;
  tweets = obtenerTweetsLocalStorage();

  //Añadir el nuevo tweet
  tweets.push(tweet);

  //Convertir de string a array para local storage
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

//Comprobar que haya elementos en localstorage, retorna un array
function obtenerTweetsLocalStorage() {
  let tweets;

  //Revisamos los valores de local storage
  if (localStorage.getItem("tweets") === null) {
    tweets = [];
  } else {
    tweets = JSON.parse(localStorage.getItem("tweets"));
  }
  return tweets;
}

//Eliminar tweet de local storage
function borrarTweetLocalStorage(tweet) {
  let tweets, tweetBorrar;

  //Elimina la X del tweet
  tweetBorrar = tweet.substring(0, tweet.length - 1);
  tweets = obtenerTweetsLocalStorage();
  tweets.forEach(function (tweet, index) {
    if (tweetBorrar === tweet) {
      tweets.splice(index, 1);
    }
  });

  localStorage.setItem("tweets", JSON.stringify(tweets));
}
