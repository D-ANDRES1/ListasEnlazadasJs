const DoublyNode = require("./DoublyNode");

class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this._size = 0;
  }

  addFirst(value) {
    const newNode = new DoublyNode(value);
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.previous = newNode;
      this.head = newNode;
    }
    this._size++;
  }

  addLast(value) {
    const newNode = new DoublyNode(value);
    if (this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      newNode.previous = this.tail;
      this.tail = newNode;
    }
    this._size++;
  }

  removeFirst() {
    if (this.head === null) {
      return null;
    }
    const value = this.head.value;
    this.head = this.head.next;
    if (this.head === null) {
      this.tail = null;
    } else {
      this.head.previous = null;
    }
    this._size--;
    return value;
  }

  removeLast() {
    if (this.tail === null) {
      return null;
    }
    const value = this.tail.value;
    this.tail = this.tail.previous;
    if (this.tail === null) {
      this.head = null;
    } else {
      this.tail.next = null;
    }
    this._size--;
    return value;
  }

  contains(value) {
    let current = this.head;
    while (current !== null) {
      if (this._isSameValue(current.value, value)) {
        return true;
      }
      current = current.next;
    }
    return false;
  }

  countOccurrences(value) {
    let current = this.head;
    let counter = 0;
    while(current !== null) {
      if(this._isSameValue(current.value,value)){
        counter ++;
      }
      current = current.next;
    }
    return counter;
  }

  clean() {
    let counterRemove = this._size

    this.head = null;
    this.tail = null;
    this._size = 0;

    return counterRemove;
  }

  reverseInPlace() {
    if(this.head === null || this.head.next === null) return;

    let current = this.head;
    let temp = null;
    
    

    while(current !== null){
      temp = current.next;
      current.next = current.previous;
      current.previous = temp;

      current = temp;
    }

    let tempHead = this.head;
    this.head = this.tail;
    this.tail = tempHead

  }

  removeDuplicates() {
    if(this.head === null || this.head.next === null) return;
    
    const seen = new Set();

    let current = this.head.next;
    let prev = this.head;
    seen.add(prev);

    while(current !== null){
      if(seen.has(current.value)){
        prev.next = current.next;

         if(current.next !== null){
          current.next.previous = prev;
          }

        current = current.next;
        this._size --;

      } else{
        seen.add(current.value);
        prev = current;
        current = current.next;
      }
    }
    this.tail = prev;
  }

  size() {
    return this._size;
  }

  isEmpty() {
    return this._size === 0;
  }

  toForwardString() {
    let out = "[";
    let current = this.head;
    while (current !== null) {
      out += String(current.value);
      if (current.next !== null) {
        out += ", ";
      }
      current = current.next;
    }
    out += "]";
    return out;
  }

  toBackwardString() {
    let out = "[";
    let current = this.tail;
    while (current !== null) {
      out += String(current.value);
      if (current.previous !== null) {
        out += ", ";
      }
      current = current.previous;
    }
    out += "]";
    return out;
  }

  _isSameValue(left, right) {
    return left === right;
  }
}

module.exports = DoublyLinkedList;
