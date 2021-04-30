var sides, sides2, poligonScale, cursorScale, poligon, poligon2;
console.log("Reiniciou");
let gjk;

function setup(){
    createCanvas(720,720);
    translate(width/2, height/2);
    sides = random(3, 10);
    sides2 = random(3, 10);
    poligonScale = 5;
    cursorScale = 2.5;
    poligon = [];
    poligon2 = [];
    simplexList= [];
    gjk = new GJK();
    for (let i = 0; i<sides; i++){
        p=createVector(10,10);
        p.mult(poligonScale);
        p.rotate((2*PI)/sides * i);
        poligon[i] = createVector(p.x-15*poligonScale, p.y);
    }
    for (let i = 0; i<sides2; i++){
        p=createVector(10,10);
        p.mult(poligonScale);
        p.rotate((2*PI)/sides2 * i);
        poligon2[i] = createVector(p.x+15*poligonScale, p.y);
    }  
}

function draw(){
    translate(width/2, height/2);
    background(200);
    fill(255,0,0);
    frameRate(2);

    // Polígono Estático
    beginShape();
    for (let i = 0; i<sides; i++){
        vec = poligon[i];
        vertex(vec.x, vec.y);
    }
    endShape(CLOSE);

    beginShape();
    for (let i = 0; i<sides2; i++){
        vec = poligon2[i];
        vertex(vec.x, vec.y);
    }
    endShape(CLOSE);

    gjk.collide(poligon, poligon2);
    
    // p1 = createVector(100,100);
    // p2 = createVector(100,-20);
    // console.log(gjk.mirroredProper(p1,p2));
    // noLoop();

    // let cursorPoligon = [createVector(mouseX + 10*cursorScale, mouseY + 10*cursorScale),
    //                      createVector(mouseX -10*cursorScale, mouseY + 10*cursorScale),
    //                      createVector(mouseX - 10*cursorScale, mouseY - 10*cursorScale),
    //                      createVector(mouseX + 10*cursorScale, mouseY - 10*cursorScale)];
    

    // Polígono no cursor
    // beginShape();
    // vertex(mouseX + 10*cursorScale, mouseY + 10*cursorScale);
    // vertex(mouseX -10*cursorScale, mouseY + 10*cursorScale);
    // vertex(mouseX - 10*cursorScale, mouseY - 10*cursorScale);
    // vertex(mouseX + 10*cursorScale, mouseY - 10*cursorScale);
    // endShape(CLOSE);

}