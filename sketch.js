function setup(){
    createCanvas(400,400);
    p1 = createVector(20,40);
    p2 = createVector(50,70);
    p3 = createVector(60,30);
    p4 = createVector(0,0);
    p5 = createVector(0,10);
    p6 = createVector(10,0);
    p7 = createVector(10,10);
}

function draw(){
    background(200);
    fill(255,0,0);
    beginShape();
    vertex(50, 200);
    vertex(90, 120);
    vertex(110, 230);
    endShape(CLOSE);
    beginShape();
    vertex(mouseX + 10, mouseY + 10);
    vertex(mouseX -10, mouseY + 10);
    vertex(mouseX - 10, mouseY - 10);
    vertex(mouseX + 10, mouseY - 10);
    endShape(CLOSE);
}