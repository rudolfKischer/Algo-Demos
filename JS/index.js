//let boxes = document.getElementsByClassName("Box");

import * as ls from './Data-Structures/lists.js';
import * as srt from './Algorithms/sorting.js';
import * as ut from './util.js'; 
import { rainbow, getRandomGradientFunc, greyScale } from './spectrums.js';


let randomGradient = getRandomGradientFunc();

let spectrums = [greyScale, rainbow, randomGradient]


let sorters = [srt.mergeSort,srt.bubbleSort,srt.quickSort];
let states = srt.arrStates;

var screen = document.getElementById("screen");
screen.width = window.innerWidth;
screen.height = window.innerHeight;


let delay = 10;

var c = screen.getContext("2d");
const HEIGHT = window.innerHeight*0.7;

let drawingArray = [];
let prevDrawIndex = null;
let prevDrawVal = null;

function drawArrItem(val, i, colr, n){
    let per = val;
    let width = Math.floor(window.innerWidth/n);
    let height = HEIGHT*per+HEIGHT*0.25;
    let x = Math.ceil(i * width);
    let y = innerHeight-(height);
    c.clearRect(x,0, width, window.innerHeight);

    c.fillStyle = 'rgba(' + colr[0] + ',' + colr[1] + ',' + colr[2] + ',' + 1 + ')';
    c.fillRect(x,y,width,height);
}

function drawArr(arr,spectrum = greyScale){
    for(let i = 0; i < arr.length; i++){
        let colr = spectrum(arr[i]);
        drawArrItem(arr[i], i, colr, arr.length)
    }
}


spectrums.forEach(spectrum => {
    let newOption = document.createElement('option');
    newOption.innerHTML = spectrum.name.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    newOption.value = spectrum.name;
    let spectrumOptions = document.getElementById("spectrumList");
    spectrumOptions.add(newOption, 0);
});

let spectrumSelection = document.getElementById("spectrumList")
spectrumSelection.onchange = function() { 
    refreshArrayDraw(); 
};

function refreshInputs(){
    states.clear();
    randomGradient = getRandomGradientFunc();
    let n = parseInt(document.getElementById("inputNum").value);
    delay = parseInt(document.getElementById("inputDelay").value);
    drawingArray = ut.getRandomArray(n);
}

function refreshArrayDraw(){
    drawArr(drawingArray,eval(document.getElementById("spectrumList").value));
}


window.onresize = function(){
    var screen = document.getElementById("screen");
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    refreshArrayDraw();

}

sorters.forEach(sorter => {
    let newButton = document.createElement("button");
    newButton.onclick = function(){
        refreshInputs();
        refreshArrayDraw();
        sorter([...drawingArray]);
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


function arrayAccessAnimation(){
    let spectrumFunc = eval(document.getElementById("spectrumList").value);

    //clear previous animation
    if(prevDrawIndex != null){
        let colr = spectrumFunc(drawingArray[prevDrawIndex]);
        drawArrItem(drawingArray[prevDrawIndex],prevDrawIndex,colr,drawingArray.length);
        prevDrawIndex = null;
    }

    //draw new animation
    if( states.size > 1){

        //unpack state
        let state = states.popF();
        let i = state['index'];
        let val = state['val'];
        let colr = state['color'];

        //update array
        if( val != null){
            drawingArray[i] = val;
        }
        prevDrawIndex = i;
        
        
        drawArrItem(drawingArray[i],i,colr,drawingArray.length);


        
        
    }
}

function animate() {
    
    arrayAccessAnimation();
    // sortAnimation();

    setTimeout(window.requestAnimationFrame,delay,animate);
}



animate();