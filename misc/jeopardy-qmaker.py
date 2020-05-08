# Puts questions/answers in a format to be used by the JS Jeopardy script

cats = 4    # QTY of Categories
qa = 5   # QTY of questions/answers per category

topics = []  # List holding the categories and question/answer objects

class NewC:
    def __init__(self):
        self.category = input("INPUT CATEGORY: ")
        self.Q = []     # Will hold the question/answer object

    def addQ(self,c,qnum):
        self.Q.append(NewQ(c,qnum))

class NewQ:
    def __init__(self,c,qnum):
        self.question = input("CATEGORY {}; QUESTION #{}: ".format(c+1,qnum+1))
        self.answer = input("....ANSWER #{}: ".format(qnum+1))

print("* 1) Input Category. 2) The script will then ask for those questions/answers for that category *")
for x in range(cats):
    topics.append(NewC())     # Initiate new category
    for y in range(qa):
        topics[x].addQ(x,y)

# HTML SECTION INFO
print("*** PASTE THE FOLLOWING WITHIN THE <div id='BOARD'> brackets ***")
prices = ["$10","$25","$50","$75","$100"]

print('\t\t\t\t<div class="row"><!-- CATEGORIES -->')
for each in range(cats):
    print('\t\t\t\t\t<div class="col cat">{}</div>'.format(topics[each].category))
print('\t\t\t\t</div>')
for y in range(qa):
    print('\t\t\t\t<div class="row">')
    for z in range(cats):
        print('\t\t\t\t\t<div class="col price" onClick="pullques(\'{}\',\'{}\')">{}</div>'.format(z,y,prices[y]))
    print('\t\t\t\t</div>')

# JS SCRIPT INFO
print("*** PASTE FOLLOWING IN THE JEOPARDY SCRIPT JS SECTION (overwrite if there is similar code already there ***")
print("\t\tvar questions = [",end="")
for each in range(cats):    # var questions = [[],[],[],[]]
    print("[]",end = "")
    if each == cats - 1: print("];")
    else: print(",",end="")
for x in range(len(topics)):
    for y in range(len(topics[x].Q)):
        print('\t\tquestions[{}].push("{}");'.format(x,topics[x].Q[y].answer))


        
        

        
        
        
        
