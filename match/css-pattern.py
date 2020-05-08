# CSS STAR-FIELD GENERATOR
# Code by Kyle Gentry (online handle: ksgwxfan)
# Feel free to implement in a project, modify, and/or improve as needed
# I'd appreciate credit (in your code or source) if it is some use to you in your project

# WHAT IT DOES: Outputs code for a star-field for use in CSS projects by generating x-number of
# radial gradients (the stars)
# INSTRUCTIONS: Tweak the predefined variables for your liking; Copy/paste the code into your style sheet

# PRE-DEFINED VARIABLES
rows = 20
cols = 20
dotsize = 2   # Size of the dots in percent
dotcolor = "red"
bgcolor = "yellow"

for x in range(rows):
    for y in range(cols):
        print("radial-gradient(circle at {}% {}%, {} 0% {}%, rgba(255,255,255,0) {}%), ".format(x*10+5,y*10+5,dotcolor,dotsize,dotsize),end="")
print(bgcolor + "")

