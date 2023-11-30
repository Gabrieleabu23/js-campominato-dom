
let caselle; let bombe; let punteggio=0; let fineGioco=0;
const layout = document.createElement("div");
const contenitoreGenerale = document.getElementById("main_container");
function start_game() {
    const minNum = 1; const maxNum = 16; 
    fineGioco=0;punteggio=0;
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
        console.log(bombe[i-1])
        layout.append(div);
        console.log("stato gioco",fineGioco);
        cliccando(div, i, bombe,maxNum,caselle);

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

// FUNZIONE CHE QUANDO CLICCHI IL COLORE DIVENTA AZZURRINO O UNA BOMBA

function cliccando(div, i, bombe,maxNum,caselle) {
        div.addEventListener("click",
            function () { 
                while(fineGioco === 0){
                    if (div.classList.contains('clicked')) return;
                    if (bombe.includes(i)) {
                        div.classList.add("bomba");
                        console.log("bomba",i);
                        alert("Hai preso una bomba, mi dispiace !"+` ${"Punteggio accumulato: "}${punteggio}`);
                        console.log("Hai preso una bomba, mi dispiace !"+` ${"Punteggio accumulato: "}${punteggio}`)
                        fineGioco=1;
                    }
                    else{
                        div.classList.add("clicked");
                        aggPunteggio();
                        if(punteggio === (caselle-maxNum)){
                            alert("Non hai preso nemmeno una bomba, Bravissimo !"+` ${"Punteggio accumulato: "}${punteggio}`);
                            console.log("Non hai preso nemmeno una bomba, Bravissimo !"+` ${"Punteggio accumulato: "}${punteggio}`);
                        }
                    }
                }
                mostrabombe(div,caselle,bombe,i);
                    
            }
            
        );

    }

    function mostrabombe(div,caselle,bombe){
        const celle= document.querySelectorAll('[class^="square"]');
        for(let i=0;i<caselle;i++){
            if (bombe.includes(i)) {
                const cellToReveal = celle[i - 1];
                cellToReveal.classList.add("bomba");
            }
        }
        document.querySelector("button").innerHTML="Riprova!";
    }

// PARTE DI CAMPO MINATO 

function aggPunteggio(){
    punteggio+=1;
    // DEBUG
    // console.log(punteggio)
    return punteggio;
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