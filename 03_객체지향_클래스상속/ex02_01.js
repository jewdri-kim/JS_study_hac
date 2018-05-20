function MyParent(){
    this.property1 = 10;
}
MyParent.prototype.method1 = function(){
    console.log('this.property1 = '+ this.property1);
}

//MyClass A
function MyClassA(){
    this.property1 = 10;
}

MyClassA.prototype.method1 = function(){
    console.log('this.property1 = '+this.property1);
}

MyClassA.prototype.method2 = function(){
    console.log('이 기능은 MyClassA 에 있는 기능입니다. ');
}


//MyClass B
function MyClassB(){
    this.property1 = 10;
}

MyClassB.prototype.method1 = function(){
    console.log('this.property1 = '+this.property1);
}

MyClassB.prototype.method2 = function(){
    console.log('이 기능은 MyClassB 에 있는 기능입니다. ');
}