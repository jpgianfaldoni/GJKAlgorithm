from Point import Point
import numpy as np
from processing_py import *

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
        maxDotP = -1001
        maxDotPIndex = -1
        for i, vertex in enumerate(self.vertices):
            dotP = np.dot([direction.x,direction.y], [vertex.x, vertex.y])
            if dotP>maxDotP:
                maxDotP = dotP
                maxDotPIndex = i
        return self.vertices[maxDotPIndex]