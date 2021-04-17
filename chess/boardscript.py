import itertools

COL = [0,8,7,6,5,4,3,2,1,0]
ROW = [0,"a","b","c","d","e","f","g","h", 0]
n = [2,14,26,38,50,62,74,86]
m = [2,14,26,38,50,62,74,86]

tab = "    "
bgcycle = itertools.cycle(["dark", "light"])

for col in COL:
    next(bgcycle)
    print(f'{tab*3}<div class="board-row">')
    for row in ROW:
        ID = f"{row}{col}"
        BG = next(bgcycle)
        print('{}<div {}class="{}">{}</div>'.format(
            tab*4,
            'id="{}" '.format(ID) if col != 0 and row != 0 else "",
            'CELL {}'.format(BG) if col != 0 and row != 0 \
                else ("COLUMN" if row != 0 \
                else "ROW"),
            "&nbsp;" if (col != 0 and row != 0) \
                or (col == 0 and row == 0) \
                else (row if col == 0 \
                else col)
        ))
    print(f'{tab*3}</div>')
