
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
        let vec = createVector(direction.x, direction.y);
        if(rev){
            vec.rotate(PI);
        }
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
        let simplexList = [];
        const origin = createVector(0,0);
        let direction = p5.Vector.fromAngle(  PI/3  );//random(2*PI)); //creates vector pointing to a random direction
        let result = this.supportFunction(direction, poligon);  //finds first vertice of the first polygon using the support function
        let result2 = this.supportFunction(direction, poligon2, true); //finds second vertice using the support function (opposite direction)
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y));  //finds the first vertice of the simplex
        let end = simplexList[0];
        let start = createVector(0,0);
        let newDirection = createVector(start.x-end.x, start.y - end.y).normalize(); //finds the new direction that points to origin
        result = this.supportFunction(newDirection, poligon); // finds the second vertice of the first polygon using the support function
        result2 = this.supportFunction(newDirection, poligon2, true); //finds the second vertice of the second polygon using the support function (opposite direction)
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y)); //finds the second vertice of the simplex
        if(!this.opposesOrigin(simplexList[0], simplexList[1])){
            return false;
        }       
        let makedir = this.makeDirection(simplexList[0], simplexList[1])
        result = this.supportFunction(makedir, poligon); // finds the third vertice of the first polygon using the support function
        result2 = this.supportFunction(makedir, poligon2, true); //finds the third vertice of the second polygon using the support function (opposite direction)
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y)); //finds the third vertice of the simplex
        if(!this.opposesOrigin(makedir.copy().mult(-1), simplexList[2])){
            return false;
        }        
        let notDone = 0;
        let currSimplex = simplexList.slice();
        while (notDone < max(poligon.length, poligon2.length)) {
            let A = currSimplex.pop();
            let B = currSimplex.pop();
            let C = currSimplex.pop();
            let dir1 = this.makeDirection(A, B);
            let dir2 = this.makeDirection(A, C);
            const AO = A.copy();
            const BO = B.copy().mult(-1);
            const CO = C.copy().mult(-1);
            if(dir1.dot(CO)>0){
                result = this.supportFunction(dir1, poligon);
                result2 = this.supportFunction(dir1, poligon2, true);
                currSimplex.push(A);
                currSimplex.push(B);
                currSimplex.push(createVector(result.x-result2.x, result.y - result2.y));
                if(!this.opposesOrigin(dir1, currSimplex[1])){
                    return false;
                }
            } else if (dir2.dot(BO)>0){
                result = this.supportFunction(dir2, poligon);
                result2 = this.supportFunction(dir2, poligon2, true);
                currSimplex.push(A);
                currSimplex.push(C);
                currSimplex.push(createVector(result.x-result2.x, result.y - result2.y));
                if(!this.opposesOrigin(dir2, currSimplex[1])){
                    return false;
                }
            } else {
                return true;
            }
            notDone++;
        }
        return false;
    }

    makeDirection(A,B){
        let AO = A.copy().mult(-1);
        let AB = createVector(B.x-A.x, B.y-A.y);
        return p5.Vector.cross(p5.Vector.cross(AB, AO), AB);
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

    // http://brian3kb.github.io/graham_scan_js/
    minkowski(pol1, pol2){
        var convexHull = new ConvexHullGrahamScan();
        let poligonsum = []
        let vector;    
        for(let i = 0; i < pol1.length; i ++){
            for(let j = 0; j < pol2.length; j ++){
                vector = createVector((pol1[i].x - pol2[j].x), (pol1[i].y - pol2[j].y))
                convexHull.addPoint(vector.x, vector.y);
            }
        }
        return convexHull.getHull();
    }
    
    containsOrigin(p1,p2,p3,p){
        let alpha = ((p2.y - p3.y)*(p.x - p3.x) + (p3.x - p2.x)*(p.y - p3.y)) / ((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));
        let beta = ((p3.y - p1.y)*(p.x - p3.x) + (p1.x - p3.x)*(p.y - p3.y)) /((p2.y - p3.y)*(p1.x - p3.x) + (p3.x - p2.x)*(p1.y - p3.y));
        let gamma = 1 - alpha - beta;
        if((alpha > 0) && (beta > 0) && (gamma > 0)){
            return 1;
        }
        else{
            return 0;
        }
    }

    opposesOrigin(A, B){
        let revB = B.copy().normalize();
        return p5.Vector.dot(A, revB)<0;
    }

}