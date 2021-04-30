var sides, sides2, poligonScale, cursorScale, poligon, poligon2;
console.log("Reiniciou");
let gjk, direction, simplexList;

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
    direction = p5.Vector.fromAngle(random(2*PI));
    
    
    
    
}

function draw(){
    translate(width/2, height/2);
    background(200);
    fill(255,0,0);
    framerate(5);

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

    

    fill(0,200,0);

    // line(mouseX,mouseY, center.x, center.y);
    let result = gjk.supportFunction(direction, poligon);
    let result2 = gjk.supportFunction(direction, poligon2, true);
    
    simplexList.push(createVector(result.x-result2.x, result.y - result2.y));
    
    // console.log(result, result2, result3);

    let center = gjk.calculateCentroid(poligon);
    let center2 = gjk.calculateCentroid(poligon2);
    ellipse(result.x, result.y, 8,8);
    ellipse(center2.x, center2.y, 8,8);
    ellipse(result2.x, result2.y, 8,8);
    ellipse(center.x, center.y, 8,8);
    fill(0,0,255);
    ellipse(result3.x, result3.y, 8,8);
    fill(255,0,0);
    


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