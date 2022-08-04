

function swap(arr,i,j){
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j]=temp;
}


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
        arr[i] = (i+1)/n;
    }
    for(let i = 0; i<n; i++){
        let j = randInt(0,n);
        swap(arr,i,j);

    }
    return arr;
}

function getRandomFloatArray(n){
    let arr = new Array(n);
    for(let i=0;i<n;i++){
        arr[i] = Math.random();
    }
    return arr;
}

export { swap, randInt, getFilledArray, getRandomArray};