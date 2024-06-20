// Juego del Dado
//  1. Declarar una Variable tipo Array que guaradará las puntuciaones
let puntuaciones = [0, 0];
let rondaActual = 1;


// Declaramos como predeterminado las 5 rondas.
const numRondas = 5;


// Crearemos un Array que guardará los resultados de cada jugador en cada ronda.
// Así guardaremos el resultado de cada ronda.
let lanzamientoJ1 = [];
let lanzamientoJ2 = [];


// Escuchar los eventos que el ussuario pulse.
// Cuando la funcion es llamada por un evento no se le añaden los ().
document.querySelector("#lanzar-j1").addEventListener("click", lanzarDadosJ1);
document.querySelector("#lanzar-j2").addEventListener("click", lanzarDadosJ2);


// Crear una funcion de mostrar la imagen del dado
function crearImagenDado(valor) { // Random del 1 al 6
    console.log(1);
    
    // Creamos el elemento imagen donde se almacenará la imagen 
    let img = document.createElement("img");
    img.src = `img/${valor}.png`;
    img.alt = `Dado ${valor}`; // img.setAtribute("alt", `Dados ${valor}`)

    return img; // Devuelve el valor a quien lo llama.
}


// Creamos las funciones donde avisaran de los lanzamientos de los botónes.
function lanzarDadosJ1() {
    console.log(2);

    if (rondaActual > numRondas) return; //no hará más partidas, porque se alcanzó el límite.
   
    // Generar el valor del Dado 1 del Jugador 1.
    // El .floor redondea el resultado.
    let dado1 = Math.floor((Math.random() * 6) + 1);
    let dado2 = Math.floor((Math.random() * 6) + 1);
   
    // .push sirve para agregar
    lanzamientoJ1.push([dado1, dado2]);

    //Deshabilitar el botón del jugador 1 para que solo pueda pulsar el jugador 2
    document.querySelector("#lanzar-j1").disabled=true;
    document.querySelector("#lanzar-j2").disabled=false;
    
    actualizarRondaHTML(rondaActual, dado1, dado2, "jugador1");
}


function lanzarDadosJ2() {
    console.log(3);
    if (rondaActual > numRondas) return; //no hará más partidas, porque se alcanzó el límite.
    // Generar el valor del Dado 1 del Jugador 1.
    // El .floor redondea el resultado.
    let dado1 = Math.floor((Math.random() * 6) + 1);
    let dado2 = Math.floor((Math.random() * 6) + 1);
    
    // .push sirve para agregar.
    lanzamientoJ2.push([dado1, dado2]);

    //Deshabilitar el botón del jugador 2 para que solo pueda pulsar el jugador 1
    document.querySelector("#lanzar-j1").disabled=false;
    document.querySelector("#lanzar-j2").disabled=true;

    actualizarRondaHTML(rondaActual, dado1, dado2, "jugador2");
    rondaActual++; //Se incrementa la ronda.
}


function actualizarRondaHTML(ronda, dado1, dado2, jugador) {
    console.log(4);

    let rondaDiv = document.querySelector(`#ronda-${ronda}`);

    if (!rondaDiv) {
        rondaDiv = document.createElement("div");
        rondaDiv.classList.add("ronda");

        // rondaDiv.className.add("ronda"); es lo mismo que la línea anterior, pero solo agrega una clase.
        rondaDiv.setAttribute("id", `ronda-${ronda}`);
        rondaDiv.innerHTML = `
        <h3>Ronda ${ronda}</h3>
            <div class="datos" id="datos-ronda-${ronda}">
                <div id="jugador1-ronda-${ronda}"></div>
                <div id="jugador2-ronda-${ronda}"></div>
            </div>`;

        document.querySelector("#rondas").appendChild(rondaDiv);
    }

    //Buscará del HTML lo que hemos creado en el bloque anterior jugador-1-ronda-1
    let jugadorDiv = document.querySelector(`#${jugador}-ronda-${ronda}`);
    jugadorDiv.innerHTML = "";

    //Creamos los dados en el HTML con el valor que nos ha dado los dados.
    jugadorDiv.appendChild(crearImagenDado(dado1));
    jugadorDiv.appendChild(crearImagenDado(dado2));

    let suma = dado1 + dado2;
    //Ahora hacemos un operador ternario.
    jugadorDiv.innerHTML += `<p>Jugador ${jugador === 'jugador1' ? 1 : 2} : ${suma}</p>`;
}


document.querySelector("#terminar").addEventListener("click", () => {
    console.log(5);

    //Creamos una salida, para indicar el ganador.
    for (let i = 0; i < numRondas; i++) {
        let sumaJugador1=lanzamientoJ1[i]?lanzamientoJ1[i][0]+lanzamientoJ1[i][1]:0;
        let sumaJugador2=lanzamientoJ2[i]?lanzamientoJ2[i][0]+lanzamientoJ2[i][1]:0;

        if (sumaJugador1>sumaJugador2) {
            puntuaciones[0]++;
        } else if(sumaJugador2>sumaJugador1){
            puntuaciones[0]++;
        }
    }

    //Determinamos el Ganador del juego.
    let ganador=determinarGanador();
    
    
    let puntuacionesHTML=`
    <h3>Puntuaciones acumuladas</h3>
    <p>Jugador 1 ${puntuaciones[0]}</p>
    <p>Jugador 2 ${puntuaciones[1]}</p>
    <h3>Ganador: ${ganador}</h3>`;

    //Le damos salida en el HTML.
    document.querySelector("#puntuaciones").innerHTML=puntuacionesHTML;


    //Deshabilitamos los botones para qué no se sigan pulsando.
    document.querySelector("#lanzar-j1").disabled=true;
    document.querySelector("#lanzar-j2").disabled=true;
    document.querySelector("#terminar").disabled=true;
})


function determinarGanador() {
    if (puntuaciones[0]>puntuaciones[1]) {
        //Si la puntuacion de jugador 1 es mayor nos devolvera como ganador.
        return "Jugador 1";
    } else if(puntuaciones[1]>puntuaciones[0]){
        //Si la puntuacion de jugador 2 es mayor nos devolvera como ganador.
        return "Jugador 2";
    } else{
        //Si la puntuacion son iguales nos devolvera como empate.
        return "Empate";
    }
}


