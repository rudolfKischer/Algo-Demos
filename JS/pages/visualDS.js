import * as ls from '../Data-Structures/lists.js';
import * as srt from '../Algorithms/sorting.js';
import * as ut from '../util.js'; 


let delay = 100;
let screen = document.getElementById("screen");
let c = screen.getContext("2d");
let nodeColor = [255,50,70];
let centerH = screen.height/2;
let centerW = screen.width/2;



window.onresize = setScreen;

function setScreen(){
    
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
    centerH = screen.height/2;
    centerW = screen.width/2;
    
    
}



function maxSize(){
    let max = Math.min(screen.width, screen.height);
    return max;
}


function displayNode(x,y,size,element,colr = nodeColor){
    // divide by 2 for radius measurement
    let posX = x + centerW;
    let posY = y + centerH;
 
    c.beginPath();
    c.arc(posX, posY, size, 0, 2 * Math.PI);
    c.fillStyle = `rgba(${colr[0]},${colr[1]},${colr[2]},1)`;
    c.fill();
    c.stroke();

    let fontSize = size/2;
    let dsplcd = fontSize/4;
    let stringSize = element.toString().length;
    c.font = `${fontSize}px Arial`;
    c.fillStyle = 'black';
    c.fillText(element,posX-(dsplcd*stringSize),posY+dsplcd)
}

function drawLink(node1, node2){   
            c.beginPath();
            c.moveTo(node1.x+centerW, node1.y+centerH);
            c.lineTo(node2.x+centerW, node2.y+centerH);
            
            c.fillStyle = 'black';
            c.stroke();
}

function makeDisplayList(list){
    let displayList = list.copy();
    let numberOfNodes = displayList.size;
    let listScale = 1.2;
    let nodeSeperation = 1.5;
    let nodeSize = screen.width/(numberOfNodes*2*nodeSeperation * listScale);
    let displayListLength = (numberOfNodes) * nodeSize * 2;

    displayList.iterate(function(node, i){
        node.x = nodeSize + (i/numberOfNodes) * nodeSeperation * displayListLength - (displayListLength/2 * nodeSeperation);
        node.y = 0;
        node.color = nodeColor;
        node.size = nodeSize;
    });

    return displayList;
}

function showDisplayList(displayList){
    c.clearRect(0,0, window.innerWidth, window.innerHeight);
    displayList.iterate(function(node, i){
        if(node.next.next != null){
            drawLink(node,node.next);
        }
        displayNode(node.x,node.y,node.size,node.element,node.color);
    });
}

let list1 = ls.makeList(ut.getRandomArray(0).map(x => Math.floor(x * 10)));





setScreen();






function animate() {


    let displayList = makeDisplayList(list1);
    showDisplayList(displayList);
    
    if(list1.size < 10){
        list1.addB(Math.floor(Math.random()*10));
    }


    setTimeout(window.requestAnimationFrame,delay,animate);
}

animate();
