
let caselle; let bombe; let punteggio=0;
const layout = document.createElement("div");
const contenitoreGenerale = document.getElementById("main_container");
function start_game() {
    const minNum = 1; const maxNum = 16; 
    let punteggio = 0;
    // ASSOCIO LA DIFFICOLTÀ ALLA COSTANTE DIFFICOLTA PER OTTENERE IL VALORE
    const difficolta = parseInt(document.getElementById("opzioni_difficolta").value);
    // DEBUG DIFFICOLTA PER VISUALIZZARE IL CORRETTO FUNZIONAMENTO
    // console.log(difficolta)
    // RIGA PER PULIRE PRIMA DI STAMPARE LA "NUOVA" GRIGLIA  
    layout.innerHTML = " ";
    layout.classList.add("grid");
    contenitoreGenerale.append(layout);
    // UN'PÒ DI PADDING SOPRA E SOTTO IN MODO DA AVERE LA GRIGLIA DISTACCATA
    contenitoreGenerale.classList.add("pt-4", "pb-4");

    // RIMUOVE POSITION FIXED DATO CHE APPARE LA SCHERMATA DI GIOCO, QUINDI VA AUTOMATICAMENTE SOTTO
    document.querySelector("footer").classList.remove("position-fixed");
    caselle = numeroCaselle(difficolta, caselle);
    bombe = genArryRandomNum(minNum, caselle, maxNum);
    for (let i = 1; i <= caselle; i++) {
        const div = generateElements("div", "square", difficolta);
        div.append(i);
        console.log(bombe[i])
        onlick_azzurrino(div, i, bombe);
        layout.append(div);
    }
}

function numeroCaselle(difficolta, caselle) {
    if (difficolta === 0) {
        caselle = 100;
    }
    else if (difficolta === 1) {
        caselle = 81;
    } else if (difficolta === 2) {
        caselle = 49;
    }
    return caselle;
}



// FUNZIONE CHE GENERA I DIV CON QUALSIASI CLASSE .

function generateElements(tagtype, classname, difficolta) {
    const currentElement = document.createElement(tagtype);
    currentElement.classList.add(typeSquare(difficolta, classname));
    return currentElement;
}

// FUNZIONE PER SELEZIONARE IN BASE ALLA DIFFICOLTÀ LA DIMENSIONE DEI SINGOLI QUADRATINI
function typeSquare(difficolta, classname) {
    if (difficolta === 0) {
        classname = "square";
    }
    else if (difficolta === 1) {
        classname = "square_medio";
    } else if (difficolta === 2) {
        classname = "square_difficile";
    }
    return classname;
}

// FUNZIONE CHE QUANDO CLICCHI IL COLORE DIVENTA AZZURRINO

function onlick_azzurrino(div, i, bombe) {
        div.addEventListener("click",
            function () { 
                if (div.classList.contains('clicked')) return;
                    if (bombe.includes(i)) {
                        div.style.background = "red";
                        console.log("bomba",i);
                        punteggio=0;
                    }
                    else{
                        div.classList.add("clicked");
                        aggPunteggio();
                    }
                    
                    
            }
            
        );
    }


// PARTE DI CAMPO MINATO 

function aggPunteggio(){
    punteggio+=1;
    console.log(punteggio)
}


function genArryRandomNum(minNum, caselle, maxNum) {
    // array da popolare e poi ritornare
    const arrayToGen = [];
    // ciclo che mi popolerà l'array
    while (arrayToGen.length < maxNum) {
        // generare un numero random in un range (min, max)
        let newNumber = genRandoNumMinMax(minNum, caselle);
        // SE il numero generato NON è già presente nell'array
        if (!arrayToGen.includes(newNumber)) {
            // ALLORA lo pusho nell'aray
            arrayToGen.push(newNumber);
        }
    }
    return arrayToGen;
}
// funzione che genera un numero random in un range (min, max)
function genRandoNumMinMax(minNum, caselle) {
    return Math.floor(Math.random() * (caselle - minNum) + minNum);
}