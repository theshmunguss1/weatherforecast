c1 = [8,7,6,5,4,3,2,1]
c2 = ["a","b","c","d","e","f","g","h"]
n = [2,14,26,38,50,62,74,86]
m = [2,14,26,38,50,62,74,86]
bgcolor = "dark"

def toggle(c):
    if c == "dark": return "light"
    else: return "dark"

for x in range(len(c1)):
    if x == 1 or x == 3 or x == 5 or x == 7: bgcolor = "white"
    else: bgcolor = "dark"
    for y in range(len(c2)):
        bgcolor = toggle(bgcolor)
        print('<div id="{}{}" class="CELLS {}" style="top:{}%;left:{}%;" onClick="move(\'{}{}\')"></div>'.format(c2[y],c1[x],bgcolor,m[x],n[y],c2[y],c1[x]))


