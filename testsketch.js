var sides, sides2, poligonScale, cursorScale, poligon, poligon2,test;
console.log("Reiniciou");
let gjk;

function setup(){
    createCanvas(720,720);
    translate(width/2, height/2);
    sides = 5
    sides2 = 8;
    poligonScale = 2;
    cursorScale = 2.5;
    poligon = [];
    poligon2 = [];
    simplexList= [];
    gjk = new GJK();
    for (let i = 0; i<sides; i++){
        p=createVector(20,20);
        p.mult(poligonScale);
        p.rotate((2*PI)/sides * i);
        poligon[i] = createVector(p.x-5*poligonScale, p.y);
    }
    for (let i = 0; i<sides2; i++){
        p=createVector(20,20);
        p.mult(poligonScale);
        p.rotate((2*PI)/sides2 * i);
        poligon2[i] = createVector(p.x+5*poligonScale, p.y);
    } 
}

function draw(){
    let cursorPoligon = [createVector(mouseX + 10*cursorScale - width/2, mouseY + 10*cursorScale - height/2),
                         createVector(mouseX -10*cursorScale - width/2, mouseY + 10*cursorScale - height/2),
                         createVector(mouseX - 10*cursorScale - width/2, mouseY - 10*cursorScale - height/2)];

    translate(width/2, height/2);
    background(200);
    fill(255,0,0);
    test = gjk.collide(cursorPoligon,poligon2);
    if(test){
        fill(0,0,255);
    }
    else{
        fill(255,0,0);
    }
    
    ellipse(0,0,10,10)
    beginShape();
    for (let i = 0; i<cursorPoligon.length; i++){
        vec = cursorPoligon[i];
        vertex(vec.x, vec.y);
    }
    endShape(CLOSE);
    beginShape();
    for (let i = 0; i<sides2; i++){
        vec = poligon2[i];
        vertex(vec.x, vec.y);
    }
    endShape(CLOSE);
}