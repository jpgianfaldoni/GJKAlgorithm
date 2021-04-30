
class GJK{

    constructor(){};

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



        return false;
    }

}