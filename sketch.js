var sides, sides2, poligonScale, cursorScale, poligon, poligon2, p;
console.log("Reiniciou");
let gjk;
let selectedPoligon = 0;
let sliderSide1, sliderSide2;

function setup(){
    createCanvas(720,720);
    translate(width/2, height/2);
    // sliderSide1 = createSlider(3,15,5,1);
    // sliderSide2 = createSlider(3,15,11,1);    
    poligonScale = 5;
    poligon = [];
    poligon2 = [];
    simplexList= [];
    gjk = new GJK();

    // sides = sliderSide1.value();
    // sides2 = sliderSide2.value();
    sides = 5
    sides2 = 11

    for (let i = 0; i<sides; i++){
        p=createVector(10,10);
        p.mult(poligonScale);
        p.rotate((2*PI)/sides * i);
        poligon[i] = createVector(450-p.x-width/2, 225-p.y-height/2);
    }

    for (let i = 0; i<sides2; i++){
        p=createVector(10,10);
        p.mult(poligonScale);
        p.rotate((2*PI)/sides2 * i);
        poligon2[i] = createVector(p.x-17*poligonScale, 70 + p.y);
    }

}



function draw(){
    translate(width/2, height/2);
    background(200);
    noFill();
    ellipse(0,0,5,5); // Draw origin for clarity
    // sides = sliderSide1.value();
    // sides2 = sliderSide2.value();

    if(keyIsDown(16)){
        selectedPoligon = 1;
    } else {
        selectedPoligon = 0;
    }

    fill(250, 0, 0, 40);
    let mink = gjk.minkowski(poligon, poligon2);
    beginShape();
    for (let p of mink){
        vertex(p.x,p.y);
    }
    endShape(CLOSE);
    noFill();


    let test = gjk.collide(poligon,poligon2);
    if(test){
        fill(0,255,0, 30);
    } else {
        fill(0,0,250, 40);
    }
    beginShape();
    for (let i = 0; i<poligon.length; i++){
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

}

function mouseDragged(){
    if (mouseX > width || mouseX < 0 || mouseY > height || mouseY < 0) return;
    // sides = sliderSide1.value();
    // sides2 = sliderSide2.value();
    if (selectedPoligon == 0){
        poligon = []
        for (let i = 0; i<sides; i++){
            p=createVector(10,10);
            p.mult(poligonScale);
            p.rotate((2*PI)/sides * i);
            poligon[i] = createVector(mouseX-p.x-width/2, mouseY-p.y-height/2);
        }
    } else {
        poligon2 = []
        for (let i = 0; i<sides2; i++){
            p=createVector(10,10);
            p.mult(poligonScale);
            p.rotate((2*PI)/sides2 * i);
            poligon2[i] = createVector(mouseX-p.x-width/2, mouseY-p.y-height/2);
        }
    }
}

function tests(){
    // ===============================================    
    // ========== TESTE minkowski ====================
    // ===============================================
    // let cursorPoligon = [createVector(mouseX + 10*cursorScale - width/2, mouseY + 10*cursorScale - height/2),
    //                      createVector(mouseX -10*cursorScale - width/2, mouseY + 10*cursorScale - height/2),
    //                      createVector(mouseX - 10*cursorScale - width/2, mouseY - 10*cursorScale - height/2)];
    // // Polígono no cursor
    // beginShape();
    // for (let i of cursorPoligon) {
    //     vertex(i.x,i.y);
    // }
    // endShape(CLOSE);
    // // Polígono Estático
    // beginShape();
    // for (let i = 0; i<sides; i++){
    //     vec = poligon[i];
    //     vertex(vec.x, vec.y);
    // }
    // endShape(CLOSE);
    // let cvxHull = gjk.minkowski(cursorPoligon, poligon);
    // fill(255,0,0,20)
    // beginShape();
    // for (let p of cvxHull){
    //     vertex(p.x, p.y);
    // }
    // endShape(CLOSE);

    // ===============================================    
    // ========== TESTE convexHull ===================
    // ===============================================
    // let points = [];
    // var convexHull = new ConvexHullGrahamScan();
    // for (let i = 0; i< 20; i++){
    //     let px = random(-width/2, width/2);
    //     let py = random(-height/2, height/2);
    //     points.push(createVector(px,py));
    //     convexHull.addPoint(px,py);
    //     ellipse(px,py,10,10);
    // }
    // let cvxHull = convexHull.getHull();
    // fill(255,0,0,20)
    // beginShape();
    // for (let p of cvxHull){
    //     vertex(p.x, p.y);
    // }
    // endShape(CLOSE);
    // noLoop();

    // ===============================================    
    // ========== TESTE opposesOrigin ================
    // ===============================================
    // let p1, p2;
    // p1 = createVector(100,100);
    // p2 = createVector(mouseX-width/2, mouseY-height/2);
    // let direction = gjk.makeDirection(p1,p2);
    // line(0,0,direction.x,direction.y);
    // line(p1.x,p1.y,p2.x,p2.y);
    // if(gjk.opposesOrigin(p1,p2)){
    //     fill(0,255,0);
    // }
    // ellipse(p1.x,p1.y,10,10)
    // ellipse(p2.x,p2.y,10,10)

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
}