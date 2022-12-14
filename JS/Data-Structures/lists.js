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

    this.getHead = function(){
        return this.head.next;
    }

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

    this.iterate = function(func){
        let cur = this.head.next;
        let i =0;
        while(cur != this.tail){
            func(cur, i);
            i++;
            cur = cur.next;
        }
    }

    this.copy = function(){
        let copyList = new List();
        this.iterate( function(node, i){
            copyList.addB(node.element);
        })

        return copyList;
    }

    this.print = function() {
        this.iterate( function(node,i){
            console.log(`${i}:${node.element}`);
        });
    }
}

function makeList(arr){
    let newList = new List();
    for(let i =0;i<arr.length;i++){
        newList.addB(arr[i]);
    }
    return newList;
}


export { makeList, List, Node };