import * as ls from '../Data-Structures/lists.js';
import * as srt from '../Algorithms/sorting.js';
import * as ut from '../util.js'; 


let delay = 100;
let screen = document.getElementById("screen");
let c = screen.getContext("2d");
let nodeColor = [255,80,80];
let nodeCount =2; 


window.onresize = setScreen;

function setScreen(){
    let dpr = window.devicePixelRatio || 1;
    screen.width = window.innerWidth;
    screen.height = window.innerHeight;
}



function calcNodeSize(scl){
    let max = Math.min(screen.width, screen.height);
    let scaled = (max*scl);
    return scaled/2;
}

function Node(x, y, scl, element){
    this.element = element;
    this.position = {
        x: x,
        y: y
    };
    this.scale = scl;
    this.color = nodeColor;

    this.links = new ls.List();

    this.calcSize = function(){
        let max = Math.min(screen.width, screen.height);
        let scaled = (max*scl);
        return scaled/2;
    }
    
    this.display = function(){
        let size = this.calcSize();
        c.beginPath();
        c.arc(this.position['x'], this.position['y'], size, 0, 2 * Math.PI);
        let colr = this.color;
        c.fillStyle = `rgba(${colr[0]},${colr[1]},${colr[2]},1)`;
        c.fill();
        c.stroke();


        let fontSize = size/2;
        let dsplcd = fontSize/4;
        let stringSize = this.element.toString().length;
        c.font = `${fontSize}px Arial`;
        c.fillStyle = 'black';
        c.fillText(element,x-(dsplcd*stringSize),y+dsplcd)

    }

    this.addLink = function(neighbour) {
        this.links.addF(neighbour);
    }
}

function displayNode(x,y,scl,element){
    let size = calcNodeSize(scl);
    c.beginPath();
    c.arc(x, y, size, 0, 2 * Math.PI);
    let colr = nodeColor;
    c.fillStyle = `rgba(${colr[0]},${colr[1]},${colr[2]},1)`;
    c.fill();
    c.stroke();


    let fontSize = size/2;
    let dsplcd = fontSize/4;
    let stringSize = element.toString().length;
    c.font = `${fontSize}px Arial`;
    c.fillStyle = 'black';
    c.fillText(element,x-(dsplcd*stringSize),y+dsplcd)

}



function displayList(list){
    let numberOfNodes = list.size;
    let centerW = screen.width/2;
    let centerH = screen.height/2;
    let nodeScl = 1/numberOfNodes;
    let nodeSize = calcNodeSize(nodeScl)*2;
    let lineLength = nodeSize * 0.25

    c.clearRect(0,0, window.innerWidth, window.innerHeight);
    function listDisplayNode(node, i){
        let elmt = node.element;
        let nodeListLength = (numberOfNodes * nodeSize) + ((numberOfNodes-1) * lineLength);
        let posStrt = centerW - (nodeListLength/2);
        let posX = posStrt + (i*nodeSize) + (i * lineLength);
        let posNxtX = posStrt + ((i+1)*nodeSize) + ((i+1) * lineLength);

        if(node.next.next != null){
            c.beginPath();
            c.moveTo(posX, centerH);
            c.lineTo(posNxtX, centerH);
            c.stroke();
        }

        displayNode(posX,centerH,nodeScl,elmt);
    }

    list.iterate(listDisplayNode);

}

let n = 40;

let arr = ut.getRandomArray(n).map(x => x * n);
let lst = ls.makeList(arr);
lst.print();

function animate() {
    

    displayList(lst);
    if(lst.size > 10){

        lst.popB();
    }
    setTimeout(window.requestAnimationFrame,delay,animate);
}



setScreen();




animate();