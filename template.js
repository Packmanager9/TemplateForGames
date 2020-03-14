
window.addEventListener('DOMContentLoaded', (event) =>{




    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

    tutorial_canvas.style.background = "#000000"

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas by the ratio given






 let flex = tutorial_canvas.getBoundingClientRect();

 // Add the event listeners for mousedown, mousemove, and mouseup
 let tip = {}
 let xs
 let ys
 let tap = {}
 let xz
 let yz


 
 window.addEventListener('mousedown', e => {


    flex = tutorial_canvas.getBoundingClientRect();


    xs = e.clientX - flex.left;
    ys = e.clientY - flex.top;
      tip.x = xs
      tip.y = ys

      tip.body = tip


      // example usage: if(squarecircle(squareOnScreen, tip)){ do stuff }

   window.addEventListener('mousemove', continued_stimuli);
 });



 window.addEventListener('mouseup', e => {
 window.removeEventListener("mousemove", continued_stimuli);
 })

function continued_stimuli(e) {
flex = tutorial_canvas.getBoundingClientRect();
xs = e.clientX - flex.left;
ys = e.clientY - flex.top;
  tip.x = xs
  tip.y = ys

  tip.body = tip


  }





    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){

            this.xmom*=.9999
            this.ymom*=.9999   //friction adjust this to change the slowing of a circle

            this.x += this.xmom
            this.y += this.ymom

            if(this.x+this.radius > tutorial_canvas.width){

                if(this.xmom > 0){
                this.xmom *= -1
                }

            }
            if(this.y+this.radius > tutorial_canvas.height){
                if(this.ymom > 0){
                this.ymom *= -1
                }

            }
            if(this.x-this.radius < 0){
                if(this.xmom < 0){
                    this.xmom *= -1
                }

            }
            if(this.y-this.radius < 0){

                if(this.ymom < 0){
                    this.ymom *= -1
                }
        
            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }


    // can be drawn, can have movement with minor changes
    class Triangle{
        constructor(x,y, color, length=40){
            this.x = x
            this.y = y
            this.color = color
            this.length = length
            this.radius = length
        }
        draw(){

            tutorial_canvas_context.strokStyle = this.color  //sets outline color

            tutorial_canvas_context.lineWidth = 0 // sets outline width
    
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x, this.y+this.length/2); 
            
            tutorial_canvas_context.lineTo(this.x+this.length, this.y+this.length/2); 
            
            tutorial_canvas_context.lineTo(this.x,this.y-this.length*1.41); 
            
            tutorial_canvas_context.lineTo(this.x-this.length, this.y+this.length/2); 
    
            tutorial_canvas_context.lineTo(this.x,this.y+this.length/2); 
    
            tutorial_canvas_context.stroke();  
            tutorial_canvas_context.fillStyle = this.color  // fills the shape
            tutorial_canvas_context.fill()
    
    
        }
    
    }

    // takes two pairs of coordinates, draws a line of the given color, and width.
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

            tutorial_canvas.style.s
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }



    // let x = 0
    // let y = 0

     let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random()-.5, Math.random()-.5)  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    // example objects

    let oddarray = []
    let beam = new Line(350, 250, 400, 450, "red", 3)
    let triangle = new Triangle( 500, 500, "#FFFF00", 60 )

    oddarray.push(beam)
    oddarray.push(triangle)


// interval, fill this with game logic 
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image


        for(let j = 0; j<oddarray.length;j++){ // you can throw objects with different classes but similar methods into an array together
            oddarray[j].draw()
        }

        
        // this block draws, moves and gives player control the the previously constructed circle
        rect.draw() // drawing this first makes it background to the circle
        circ.draw()
        circ.move()
        players(circ)


        if(squarecircle(rect, circ)==true){
            rect.color = getRandomLightColor()
            // collision example with obvious on screen effect
        }

    }, 1) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls 
    // this is a player controller function, but the logic used here can be made to do anything on keystrokes
    function players(racer){
        if (keysPressed['w']) {
                racer.y -= .7
        }
        if (keysPressed['a']) {
            racer.x -= .7
        }
        if (keysPressed['s']) {
            racer.y += .7
        }
        if (keysPressed['d']) {
            racer.x += .7
        }
        if (keysPressed['f']) {
        }


        // any key combination can be made from a nested if statement, all keys can just be accessed by name (if you can find it)

    }





// can check if one circle contains the center of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching change the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}





})