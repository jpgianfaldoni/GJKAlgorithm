from Point import Point

class Polygon:
    def __init__(self, points):
        self.vertices = points
        self.centroid = self.centroid()


    def centroid(self):
        x = [p.x for p in self.vertices]
        y = [p.y for p in self.vertices]
        return(Point((sum(x) / len(self.vertices)), (sum(y) / len(self.vertices))))

    def supportFunction(self, direction):
        #return most far vertice in a given direction
        return 