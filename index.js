//let boxes = document.getElementsByClassName("Box");
function Node(prev,next,element){
    this.prev = prev;
    this.next = next;
    this.element = element;
}

function List(){
    this.head = new Node(null,null,null);
    this.tail = new Node(this.head,null,null);
    this.head.next = this.tail;
    this.size = 0;

    this.addB = function(element) {
        let newNode = new Node(this.tail.prev,this.tail,element);
        this.tail.prev.next = newNode;
        this.tail.prev = newNode;
        this.size ++;
    }

    this.addF = function(element) {
        let newNode = new Node(this.head,this.head.next,element);
        this.head.next.prev = newNode;
        this.head.next = newNode;
        this.size ++;
    }

    this.popF = function(){
        if(this.head.next != this.tail){
            let temp = this.head.next.element;
            this.head.next.next.prev = this.head;
            this.head.next = this.head.next.next;
            this.size --;
            return temp;
            
        }
        return null;
    }
    this.popB = function(){
        if(this.tail.prev != this.head){
            let temp = this.tail.prev.element;
            this.tail.prev.prev.next = this.tail;
            this.tail.prev = this.tail.prev.prev;
            this.size --;
            return temp;
        }
        return null;
    }

    this.peekF = function(){
        return this.head.next.element;
    }

    this.peekB = function(){
        return this.tail.prev.element;
    }

    this.clear = function() {
        this.head.next = this.tail;
        this.tail.prev = this.head;
        this.size =0;
    }

    this.makeArr = function(){
        let newArr = new Array(this.size);
        for(let i=0;i<this.size;i++){
            newArr[i] = this.popF();
        }
        return newArr;
    }


    this.print = function() {
        let cur = this.head.next;
        while(cur != this.tail){
            console.log(cur.element);
            cur = cur.next;
        }
    }
}

function makeList(arr){
    let newList = new List();
    for(let i =0;i<arr.length;i++){
        newList.add(arr[i]);
    }
    return newList;
}



const r1 = Math.random();
const r2 = Math.random();
const r3 = Math.random();


function createBox(n) {
    let new_box = document.createElement('div');
    new_box.classList.add('Box');
    let colordif = 255/(n)
    new_box.style.backgroundColor = 'rgb(' + [colordif,colordif,80].join(',') + ')';
    new_box.style.color = "blue";
    if (n == 1) {
        return new_box;
    }
    new_box.append(createBox(n-1));
    return new_box;
}





function hsv2rgb(h,s,v) 
{                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  return [f(5),f(3),f(1)];       
}   

function rainbow(per){
    let rgb = hsv2rgb((1-per)*255,1,1);
    rgb = [
        rgb[0] * 255,
        rgb[1] * 255,
        rgb[2] *255
    ];
    return rgb;
}

function colorScale(rgb,per){
    rgb = [
        rgb[0] * per,
        rgb[1] * per,
        rgb[2] * per,
    ];
    return rgb;
}

function colorGradient(rgb1,rgb2,per){
    let rgbdiff = [
        rgb2[0] - rgb1[0],
        rgb2[1] - rgb1[1],
        rgb2[2] - rgb1[2]
    ];
    let rgb = [
        rgb1[0] + (rgbdiff[0]* per),
        rgb1[1] + (rgbdiff[1]* per),
        rgb1[2] + (rgbdiff[2]* per),
    ];
    return rgb;
}

function greyScale(per){
    let rgb = [
        255,
        255,
        255
    ];
    return colorScale(rgb,per);
}

let old_box = document.getElementById('special');

// old_box.append(createBox(1));

var screen = document.getElementById("screen");

// screen.style.backgroundColor= "#488";


screen.width = window.innerWidth;
screen.height = window.innerHeight;


var c = screen.getContext("2d");


// console.log(col);

function randInt(min,max){
    let diff = max - min;
    return Math.floor(Math.random()*diff) + min;
}


function getFilledArray(n){
    let arr = new Array(n);
    for(let i = 0; i<n; i++){
        arr[i] = i;
    }
    return arr; 
}

function getRandomArray(n){
    let arr = getFilledArray(n);
    for(let i = 0; i<n; i++){
        let j = randInt(0,n);
        swap(arr,i,j);
    }
    return arr;
}






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




function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j]=temp;
}





function randomGradient(per) {
    let color1 = hsv2rgb(r1*255,1,1);
    let color2 = hsv2rgb(r2*255,1,1);
    let rgb1 = [
        color1[0]*255,
        color1[1]*255,
        color1[2]*255,
        ];
    let rgb2 = [
        color2[0]*255,
        color2[1]*255,
        color2[2]*255,
        ];
    return colorGradient(rgb1,rgb2,per);
}

function bubbleSort(arr){
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length - i - 1; j++){
            if(arr[j]>arr[j+1]){
                swap(arr,j,j+1);
                arrStates.addB([...arr])
            }
        } 
    }
}

function merge(arr1,arr2){
    let result = new Array(arr1.length+arr2.length);
    let pntr1 = 0
    let pntr2 = 0;
    while(pntr1 < arr1.length && pntr2 < arr2.length){
        if(arr1[pntr1] < arr2[pntr2]){
            result[pntr1+pntr2] = arr1[pntr1];
            pntr1++;
        }else{
            result[pntr1+pntr2] = arr2[pntr2];
            pntr2++;
        }
    }
    while(pntr1 < arr1.length){
        result[pntr1+pntr2] = arr1[pntr1];
            pntr1++;
    }
    while(pntr2 < arr2.length){
        result[pntr1+pntr2] = arr2[pntr2];
            pntr2++;
    }
    return result;
}

function mergeArr(arr,beg,mid,end){
    let result = new Array(end-beg);
    let pntr1 = beg;
    let pntr2 = mid;
    let pntrR = 0;
    while(pntr1 < mid && pntr2 < end){
        //console.log(pntr1)
        //console.log(pntr2)
        if(arr[pntr1] < arr[pntr2]){
            result[pntrR] = arr[pntr1];
            pntr1++;
        }else{
            result[pntrR] = arr[pntr2];
            pntr2++;
        }
        pntrR++;
    }
    while(pntr1 < mid){
        result[pntrR] = arr[pntr1];
            pntr1++;
            pntrR++;
    }
    while(pntr2 < end){
        result[pntrR] = arr[pntr2];
            pntr2++;
            pntrR++;
    }
    for(let i = 0;i<(end-beg);i++){
        arr[beg+i] = result[i];
    }
    return result;
}

let arrStates = new List();

function mergeSortAux(arr,beg,end){
    if( beg < end-1){
        let mid = beg + Math.ceil((end-beg)/2)
        mergeSortAux(arr,beg,mid);
        mergeSortAux(arr,mid,end);
        mergeArr(arr,beg,mid,end);
        arrStates.addB([...arr]);
    }
    return arr;
}



function mergeSort(arr){
    mergeSortAux(arr,0,arr.length);
    return arr;
    
}

function insertionSort(inputArr) {
    let n = inputArr.length;
        for (let i = 1; i < n; i++) {
            // Choosing the first element in our unsorted subarray
            let current = inputArr[i];
            // The last element of our sorted subarray
            let j = i-1; 
            while ((j > -1) && (current < inputArr[j])) {
                inputArr[j+1] = inputArr[j];
                j--;

                arrStates.addB([...inputArr]);
            }
            inputArr[j+1] = current;
        }
    return inputArr;
}

function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}

function quickSortAux(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSortAux(items, left, index - 1);
            arrStates.addB([...items]);

        }
        if (index < right) { //more elements on the right side of the pivot
            quickSortAux(items, index, right);
            arrStates.addB([...items]);
        }
    }
    return items;
}

function quickSort(arr){
    quickSortAux(arr,0,arr.length-1);
}

let spectrums = [rainbow,randomGradient,greyScale]

spectrums.forEach(spectrum => {
    let newOption = document.createElement('option');
    newOption.innerHTML = spectrum.name.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    newOption.value = spectrum.name;
    let spectrumOptions = document.getElementById("spectrumList");
    spectrumOptions.add(newOption, 0);
});



let sorters = [mergeSort,bubbleSort];

sorters.forEach(sorter => {
    let newButton = document.createElement("button");
    newButton.onclick = function(){
        arrStates.clear();
        let n = parseInt(document.getElementById("inputNum").value);
        delay = parseInt(document.getElementById("inputDelay").value);
        sorter(getRandomArray(n));
    };   
    newButton.innerHTML = sorter.name.replace(/([a-z](?=[A-Z]))/g, '$1 ');
    let mergebuttons = document.getElementById("sortButtons");
    mergebuttons.appendChild(newButton);
});


let k = 0;
let delay = 10;
function animate() {
    c.clearRect(0,0, window.innerWidth, window.innerHeight);
    let spectrumFunc = eval(document.getElementById("spectrumList").value);
    if( arrStates.size > 1 ){
        let arr = arrStates.popF();
        drawArr(arr,spectrumFunc);
        k++;
    }else if(arrStates.size == 1){
        drawArr(arrStates.peekF(),spectrumFunc);
    }

    setTimeout(window.requestAnimationFrame,delay,animate);
}



animate();