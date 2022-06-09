/*El XMLHttpRequest me sirve para conectarme con la API's 
agregagamos un require() porque requerimos ese elemento 
usamos el .XMLHttpRequest para cumplir con su función, 
que es interactuar con la api que nos va a ayudar a interactuar con otras API's*/
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

let API ='https://rickandmortyapi.com/api/character/'

function fetchData(url_api,callback) {
    let xhttp = new XMLHttpRequest();

    xhttp.open("GET",url_api,true);
    /*aqui llamamos a la dependencia y le damos unos parametros con los que va a trabajar, 
    con el GET para que la inicialice, la url que vamos a trabajar y si va a ser asincrona o no.*/
    xhttp.onreadystatechange = function(event) {
        
        //va a estar pendiente del readyState que solo cuando esté en su valor 4 significa que la petición ha sido terminada y la respuesta esta preparada
        if(xhttp.readyState === 4){
            //va a estar pendiente del status que debe estar en 200 para saber que esta "OK"
            if(xhttp.status === 200){
                //aqui el callback esta configurado para que el primer valor que reciba sea el error para luego recibir el dato
                //como el resultado es un archivo JSON, debemos parsearlo para poder iterar y manipular los datos 
                callback(null, JSON.parse(xhttp.responseText))
            }else {
                /*como buena practica de JS debo poner en else
                la opcion de error en caso de que falle*/
                const error = new Error('Error '+ url_api);
                return callback(error,null)
            }
        }
    }
    xhttp.send();
}

fetchData(API, function (error1,data1){
    if (error1) return console.error(error1);
    fetchData(API + data1.results[0].id,function(error2,data2){
        if(error2) return console.error(error2);
        fetchData(data2.origin.url, function(error3, data3){
            if(error3) return console.error (error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        })
    })
})