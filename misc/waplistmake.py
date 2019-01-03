# https://radar.weather.gov/ridge/RadarImg/N0R/FCX_N0R_0.gif
# http://radar.weather.gov/ridge/Legend/N0R/xxx


prefix_R = "https://radar.weather.gov/ridge/RadarImg/"
prefix_L = "http://radar.weather.gov/ridge/Legend/"
types = ["N0R","N0V","N0S","N1P","NTP","NET","NVL"]

# CO - TDEN - Denver
with open("waplist.txt","r") as r:
    for each in r.readlines():
        print("\t\t\t\t<option value=\"" + each[6:9] + "\">" + each.rstrip("\n") + "</option>")
