r = 255
g = 0
b = 0

rgblist = []

while (r,g,b) != (0,0,255):
    if r == 255 and g < 255 and b == 0:
        g += 1
    elif g == 255 and r > 0:
        r -= 1
    elif g == 255 and b < 255:
        b += 1
    elif b == 255 and g > 0:
        g -= 1

    rgblist.append((r,g,b))

c = 1.5
for x in range(0,len(rgblist),50):
    print('else if (dist < {}) {{document.getElementById(ID).style.backgroundColor = "rgb({},{},{})";}}'.format(
        round(c,1),rgblist[x][0],rgblist[x][1],rgblist[x][2]))
    c += 1.6
"""
rows = 25
for x in range(rows):
    print('                <div class="ROW">')
    for y in range(rows):
        print('                    <div id="c{}_{}" class="CELL" onClick=reveal(this.id)> </div>'.format(str(x).zfill(2),str(y).zfill(2)))
    print('                </div>')
"""
