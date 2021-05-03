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
    // frameRate(2);

    // Polígono Estático
    // beginShape();
    // for (let i = 0; i<sides; i++){
    //     vec = poligon[i];
    //     vertex(vec.x, vec.y);
    // }
    // endShape(CLOSE);

    // beginShape();
    // for (let i = 0; i<sides2; i++){
    //     vec = poligon2[i];
    //     vertex(vec.x, vec.y);
    // }
    // endShape(CLOSE);



    ellipse(0,0,10,10); // Draw origin for clarity



    // ===============================================    
    // ========== TESTE convexHull ===================
    // ===============================================
    // let points = [];
    // for (let i = 0; i< 20; i++){
    //     let px = random(-width/2, width/2);
    //     let py = random(-height/2, height/2);
    //     points.push(createVector(px,py));
    //     ellipse(px,py,10,10);
    // }
    // let convexHull = gjk.convexHull(points);
    // beginShape();
    // for (let p of points){
    //     vertex(p.x, p.y);
    // }
    // endShape();
    // noLoop();
    
    
    // ===============================================    
    // ========== TESTE containsOrigin ===============
    // ===============================================
    // let cursorPoligon = [createVector(mouseX + 10*cursorScale - width/2, mouseY + 10*cursorScale - height/2),
    //                      createVector(mouseX -10*cursorScale - width/2, mouseY + 10*cursorScale - height/2),
    //                      createVector(mouseX - 10*cursorScale - width/2, mouseY - 10*cursorScale - height/2)];
    // let collideOirigin = gjk.containsOrigin(cursorPoligon[0], cursorPoligon[1], cursorPoligon[2], createVector(0,0))
    // if(collideOirigin){
    //     fill(0,255,0);
    // } else {
    //     fill(255,0,0);
    // }
    // // Polígono no cursor
    // beginShape();
    // for (let i of cursorPoligon) {
    //     vertex(i.x,i.y);
    // }
    // endShape(CLOSE);


    



    // ===============================================    
    // ========== TESTE makeDirection ================
    // ===============================================
    // let p1,p2;
    // p1 = createVector(75,20);
    // push();
    // p2 = createVector(mouseX-width/2, mouseY-height/2);
    // pop();
    // line(p1.x, p1.y, p2.x, p2.y);
    // let newDir = gjk.makeDirection(p1,p2);
    // stroke(255,0,0);
    // line(0,0,newDir.x,newDir.y);
    // stroke(0);


    // gjk.collide(poligon, poligon2);
    
    // p1 = createVector(100,100);
    // p2 = createVector(100,-20);
    // console.log(gjk.mirroredProper(p1,p2));
    // noLoop();


}