function ConvexHullGrahamScan(){this.anchorPoint=void 0,this.reverse=!1,this.points=[]}ConvexHullGrahamScan.prototype={constructor:ConvexHullGrahamScan,Point:function(a,b){this.x=a,this.y=b},_findPolarAngle:function(a,b){var c,d,e=57.295779513082;if(!a||!b)return 0;if(c=b.x-a.x,d=b.y-a.y,0==c&&0==d)return 0;var f=Math.atan2(d,c)*e;return this.reverse?0>=f&&(f+=360):f>=0&&(f+=360),f},addPoint:function(a,b){var c=void 0===this.anchorPoint||this.anchorPoint.y>b||this.anchorPoint.y===b&&this.anchorPoint.x>a;c?(void 0!==this.anchorPoint&&this.points.push(new this.Point(this.anchorPoint.x,this.anchorPoint.y)),this.anchorPoint=new this.Point(a,b)):this.points.push(new this.Point(a,b))},_sortPoints:function(){var a=this;return this.points.sort(function(b,c){var d=a._findPolarAngle(a.anchorPoint,b),e=a._findPolarAngle(a.anchorPoint,c);return e>d?-1:d>e?1:0})},_checkPoints:function(a,b,c){var d,e=this._findPolarAngle(a,b),f=this._findPolarAngle(a,c);return e>f?(d=e-f,!(d>180)):f>e?(d=f-e,d>180):!0},getHull:function(){var a,b,c=[];if(this.reverse=this.points.every(function(a){return a.x<0&&a.y<0}),a=this._sortPoints(),b=a.length,3>b)return a.unshift(this.anchorPoint),a;for(c.push(a.shift(),a.shift());;){var d,e,f;if(c.push(a.shift()),d=c[c.length-3],e=c[c.length-2],f=c[c.length-1],this._checkPoints(d,e,f)&&c.splice(c.length-2,1),0==a.length){if(b==c.length){var g=this.anchorPoint;return c=c.filter(function(a){return!!a}),c.some(function(a){return a.x==g.x&&a.y==g.y})||c.unshift(this.anchorPoint),c}a=c,b=a.length,c=[],c.push(a.shift(),a.shift())}}}},"function"==typeof define&&define.amd&&define(function(){return ConvexHullGrahamScan}),"undefined"!=typeof module&&(module.exports=ConvexHullGrahamScan);