import os

DIR = os.listdir()
imglist = []

for each in DIR:
    #print(each[len(each)-4:len(each)])
    if each[len(each)-4:len(each)] == ".jpg" or each[len(each)-4:len(each)] == ".png":
        #print("TRUE")
        imglist.append(each)

for each in imglist:
    print('\t\t\t<div class="col"><img src="iresume/thumbs/tn_{}" onClick="showfull(\'iresume/full/{}\')"></div>'.format(each,each))
