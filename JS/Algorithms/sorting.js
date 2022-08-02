
import * as ls from '../Data-Structures/lists.js';

import * as ut from '../util.js';

let arrStates = new ls.List();




function bubbleSort(arr){
    for(let i=0; i<arr.length; i++){
        for(let j=0; j<arr.length - i - 1; j++){
            if(arr[j]>arr[j+1]){
                ut.swap(arr,j,j+1);
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

export { mergeSort, bubbleSort, arrStates };