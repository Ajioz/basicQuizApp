class Rectangle{
    constructor(_width, _height, _color){
        this.width = _width;
        this.heigth = _height;
        this.color = _color;
    }

    getArea(){
        return this.width * this.heigth;
    }

    getDescription(){
      console.log(`I am a rectangle of height ${this.heigth} and width ${this.width} with a color of ${this.color}`);
    }
}

var shape1 =  new Rectangle(6, 3, "blue");
var shape2 =  new Rectangle(10, 4, "green");


let element = document.getElementById("question");
    element.innerHTML = shape1.getArea();
