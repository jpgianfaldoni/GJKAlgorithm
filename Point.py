class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Point(self.x+other.x, self.y+other.y)

    def negative(self):
        self.x = -self.x
        self.y = -self.y






        






    




