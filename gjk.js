
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
        let pLength = poligon2.length;
        let simplexList = [];
        let origin = createVector(0,0);
        let direction = p5.Vector.fromAngle(random(2*PI)); //creates vector pointing to a random direction
        let result = this.supportFunction(direction, poligon);  //finds first vertice of the first polygon using the support function
        let result2 = this.supportFunction(direction, poligon2, true); //finds second vertice using the support function (opposite direction)
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y));  //finds the first vertice of the simplex
        let end = simplexList[0];
        let start = createVector(0,0);
        let newDirection = createVector(start.x-end.x, start.y - end.y).normalize(); //finds the new direction that points to origin
        result = this.supportFunction(newDirection, poligon); // finds the second vertice of the first polygon using the support function
        result2 = this.supportFunction(newDirection, poligon2, true); //finds the second vertice of the second polygon using the support function (opposite direction)
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y)); //finds the second vertice of the simplex
        let startCopy = simplexList[0].copy()
        push();
        startCopy.rotate(PI/2); // rotates the first vector of the simplex
        pop();
        let v2 = createVector(simplexList[0].x-simplexList[1].x, simplexList[0].y - simplexList[1].y); // 
        let xp = (simplexList[0].x*v2.y - simplexList[0].y*v2.x)>0;
        let v4 = createVector(startCopy.x - simplexList[0].x, startCopy.y - simplexList[0].y);
        let xp2 = (simplexList[0].x*v4.y - simplexList[0].y*v4.x)>0; 
        if(xp==xp2) return false;
        let makedir = this.makeDirection(simplexList[0], simplexList[1])
        result = this.supportFunction(makedir, poligon); // finds the second vertice of the first polygon using the support function
        result2 = this.supportFunction(makedir, poligon2, true); //finds the second vertice of the second polygon using the support function (opposite direction)
        simplexList.push(createVector(result.x-result2.x, result.y - result2.y)); //finds the second vertice of the simplex
        for(let i = 2; i < pLength; i ++){
            if(this.containsOrigin(simplexList[0], simplexList[1], simplexList[i], origin) == 1){
                return true;
            }
            else{
                makedir = this.makeDirection(simplexList[i-1], simplexList[i])
                result = this.supportFunction(makedir, poligon); 
                result2 = this.supportFunction(makedir, poligon2, true); 
                simplexList.push(createVector(result.x-result2.x, result.y - result2.y)); 
            }

        }
        return false;
        


        

        

                
        // let giveUp = false;
        // let point1, point2;
        // // while (!giveUp){
            
        // //     point1 = simplexList[0];
        // //     point2 = simplexList[simplexList.length -1];
        // //     let direction = this.makeDirection(point1, point2);
        // //     let result = this.supportFunction(direction, poligon);
        // //     let result2 = this.supportFunction(direction, poligon2, true);
        
        
        
        // // }
        // // console.log(result, result2, result3);

        // let center = this.calculateCentroid(poligon);
        // let center2 = this.calculateCentroid(poligon2);
        // ellipse(result.x, result.y, 8,8);
        // ellipse(center2.x, center2.y, 8,8);
        // ellipse(result2.x, result2.y, 8,8);
        // ellipse(center.x, center.y, 8,8);
        // fill(255,0,0);


        // return false;
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
        return createVector(-intersection.x, -intersection.y);        
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

    minkowski(pol1, pol2){
        let poligonsum = []
        let vector;
        let allVertices =[];
        for(let i = 0; i < pol1.length; i ++){
            for(let j = 0; j < pol2.length; j ++){
                allVertices.push([int((pol1[i].x - pol2[j].x)),int((pol1[i].y - pol2[j].y)) ])
            }
        }
    
        for(let i = 0; i < pol1.length; i ++){
            for(let j = 0; j < pol2.length; j ++){
                vector = createVector((pol1[i].x - pol2[j].x), (pol1[i].y - pol2[j].y))
                poligonsum.push(vector);
            }
        }
        return poligonsum;
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

    // https://rosettacode.org/wiki/Convex_hull#JavaScript
    convexHull(points) {
        points.sort(this.comparison);
        var L = [];
        for (var i = 0; i < points.length; i++) {
            while (L.length >= 2 && this.cross(L[L.length - 2], L[L.length - 1], points[i]) <= 0) {
                L.pop();
            }
            L.push(points[i]);
        }
        var U = [];
        for (var i = points.length - 1; i >= 0; i--) {
            while (U.length >= 2 && this.cross(U[U.length - 2], U[U.length - 1], points[i]) <= 0) {
                U.pop();
            }
            U.push(points[i]);
        }
        L.pop();
        U.pop();
        return L.concat(U);
    }
     
    comparison(a, b) {
        return a.x == b.x ? a.y - b.y : a.x - b.x;
    }
     
    cross(a, b, o) {
        return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
    }

}