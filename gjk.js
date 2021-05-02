
class GJK{

    constructor(){
        this.collided = false;
    };

    supportFunction(direction, poligon, rev = false){
        let maxDotP = -Infinity
        let maxDotPIndex = -1
        let center = this.calculateCentroid(poligon);
        push();
        translate(center.x, center.y);
        vec = createVector(direction.x, direction.y);
        if(rev){
            vec.rotate(PI);
        }
        // line(0, 0, 50*vec.x, 50*vec.y);
        pop();
        for (let i = 0; i<poligon.length; i++){
            let dotP = vec.dot(poligon[i]);
            if (dotP>maxDotP){
                maxDotP = dotP;
                maxDotPIndex = i;
            }
        }
        return poligon[maxDotPIndex];
    }

    calculateCentroid(poligon){
        let sumx = 0, sumy = 0;
        for (let i of poligon){
            sumx += i.x;
            sumy += i.y;
        }
        return createVector(sumx/poligon.length, sumy/poligon.length);
    }

    collide(poligon, poligon2){
        fill(0,200,0);
        let simplexList = [];
        let direction = p5.Vector.fromAngle(random(2*PI)); 
        let result = this.supportFunction(direction, poligon);
        let result2 = this.supportFunction(direction, poligon2, true);
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y));
        let end = simplexList[0];
        let start = createVector(0,0);
        let newDirection = createVector(start.x-end.x, start.y - end.y).normalize();
        result = this.supportFunction(newDirection, poligon);
        result2 = this.supportFunction(newDirection, poligon2, true);
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y));
        
        let startCopy = simplexList[0].copy()
        push();
        startCopy.rotate(PI/2);
        pop();
        let v2 = createVector(simplexList[0].x-simplexList[1].x, simplexList[0].y - simplexList[1].y);
        let xp = (simplexList[0].x*v2.y - simplexList[0].y*v2.x)>0;
        let v4 = createVector(startCopy.x - simplexList[0].x, startCopy.y - simplexList[0].y);
        let xp2 = (simplexList[0].x*v4.y - simplexList[0].y*v4.x)>0; 
        if(xp==xp2) return false;
                
        let giveUp = false;
        let point1, point2;
        // while (!giveUp){
            
        //     point1 = simplexList[0];
        //     point2 = simplexList[simplexList.length -1];
        //     let direction = this.makeDirection(point1, point2);
        //     let result = this.supportFunction(direction, poligon);
        //     let result2 = this.supportFunction(direction, poligon2, true);
        
        
        
        // }




        
        
        
        
        
        // console.log(result, result2, result3);

        let center = this.calculateCentroid(poligon);
        let center2 = this.calculateCentroid(poligon2);
        ellipse(result.x, result.y, 8,8);
        ellipse(center2.x, center2.y, 8,8);
        ellipse(result2.x, result2.y, 8,8);
        ellipse(center.x, center.y, 8,8);
        fill(255,0,0);


        return false;
    }

    makeDirection(p1,p2){

        /*
        Fazer coef. angular
        oposto inverso coef. angular para reta perp.
        reta perp. passando origem
        inter. reta perp. com reta orig.
        ponto inter. -> origem
        */



        let dx = p1.x-p2.x;
        let dy = p1.y-p2.y;
        if (dy==0){
            if (p1.y == 0) return;
            if (p1.y > 0){
                return p5.Vector.fromAngle(-PI/2);
            }
            return p5.Vector.fromAngle(PI/2);
        }
        if (dx==0){
            if (p1.x == 0) return;
            if (p1.x > 0){
                return p5.Vector.fromAngle(PI);
            }
            return p5.Vector.fromAngle(0);
        }
        let m = dy/dx;
        let perpM = -1/m;
        let perpY = -perpM*300;
        let point1, point2, point3, point4;
        point3 = createVector(0,0);
        point4 = createVector(-300,perpY);
        point1 = p1.copy();
        point2 = p2.copy();

        // LineLine intersection
        let D = (point1.x-point2.x)*(point3.y-point4.y) - (point1.y-point2.y)*(point3.x-point4.x);
        let Px = (point1.x*point2.y - point1.y*point2.x)*(point3.x-point4.x) - (point1.x-point2.x)*(point3.x*point4.y-point3.y*point4.x);
        Px /= D;
        let Py = (point1.x*point2.y - point1.y*point2.x)*(point3.y-point4.y) - (point1.y-point2.y)*(point3.x*point4.y-point3.y*point4.x);
        Py /= D;
        let intersection = createVector(Px, Py);
        // console.log(intersection);
        // console.log("Px, Py, D", Px, Py, D);
        return createVector(intersection.x, intersection.y);        
    }

    mirroredProper(start, newpoint){
        let startCopy = start.copy()
        push();
        start.rotate(PI/2);
        pop();
        let v2 = createVector(start.x-newpoint.x, start.y - newpoint.y);
        let xp = (start.x*v2.y - start.y*v2.x)>0;
        let v4 = createVector(start.x-startCopy.x, start.y - startCopy.y);
        let xp2 = (startCopy.x*v4.y - startCopy.y*v4.x)>0; 
        return xp!=xp2;
    }
}