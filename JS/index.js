//let boxes = document.getElementsByClassName("Box");

import * as ls from './Data-Structures/lists.js';
import * as srt from './Algorithms/sorting.js';
import * as ut from './util.js'; 
import { rainbow, getRandomGradientFunc, greyScale } from './spectrums.js';


let randomGradient = getRandomGradientFunc();

let spectrums = [rainbow,randomGradient,greyScale]


let sorters = [srt.mergeSort,srt.bubbleSort];
let states = srt.arrStates;

var screen = document.getElementById("screen");
screen.width = window.innerWidth;
screen.height = window.innerHeight;


let delay = 10;

var c = screen.getContext("2d");
const HEIGHT = window.innerHeight*0.7;

function drawArr(arr,spectrum = rainbow){
    for(let i = 0; i < arr.length; i++){
        let per = (arr[i]+1)/arr.length;
        let width = window.innerWidth/arr.length;
        let height = HEIGHT*per+HEIGHT*0.25;
        let x = i * width;
        let y = innerHeight-(height);
        let col = spectrum(per);
        c.fillStyle = 'rgba(' + col[0] + ',' + col[1] + ',' + col[2] + ',' + 1 + ')';
        c.fillRect(x,y,width,height);
    }
}

     

spectrums.forEach(spectrum => {
    let newOption = document.createElement('option');
    newOption.innerHTML = spectrum.name.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    newOption.value = spectrum.name;
    let spectrumOptions = document.getElementById("spectrumList");
    spectrumOptions.add(newOption, 0);
});


sorters.forEach(sorter => {
    let newButton = document.createElement("button");
    newButton.onclick = function(){
        states.clear();
        randomGradient = getRandomGradientFunc();
        let n = parseInt(document.getElementById("inputNum").value);
        delay = parseInt(document.getElementById("inputDelay").value);
        sorter(ut.getRandomArray(n));
    };   
    newButton.innerHTML = sorter.name.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    let mergebuttons = document.getElementById("sortButtons");
    mergebuttons.appendChild(newButton);
});


function sortAnimation(){
    c.clearRect(0,0, window.innerWidth, window.innerHeight);
    let spectrumFunc = eval(document.getElementById("spectrumList").value);
    
    if( states.size > 1 ){
        let arr = states.popF();
        drawArr(arr,spectrumFunc);
    }else if(states.size == 1){
        drawArr(states.peekF(),spectrumFunc);
    }
}

function animate() {
    
    sortAnimation();

    setTimeout(window.requestAnimationFrame,delay,animate);
}



animate();