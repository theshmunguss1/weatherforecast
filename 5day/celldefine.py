section = 2
TAB = "    "  # tab string
DAYSTR = ["MON","TUE","WED","THU","FRI","SAT","SUN"]

if section == 1:
    for x in range(1,7+1):
        print(f'{TAB*4}<td class="DAY" id="d{x}">')
        # Day Name
        print(f'{TAB*5}<div class="DAYNAME" id="name{x}">{DAYSTR[x-1]}</div>')
        # Sky Condition
        print(f'{TAB*5}<div id="SKYcontainer{x}" style="position:relative;width:100%;">')
        print(f'{TAB*6}<img class="SKYCON" id="sky{x}" src="5day/sky_sun_clr.svg" skyindex="0">')
        print(f'{TAB*6}<div class="SKYcycle up" title="Sky: Cycle Up" id="sky{x}up" onClick="sky_select({x},\'-\')"><div class="desctext">&Delta;</div></div>')
        print(f'{TAB*6}<div class="SKYcycle dn" title="Sky: Cycle Down" id="sky{x}dn" onClick="sky_select({x},\'+\')"><div class="desctext">&Del;</div></div>')
        print(f'{TAB*5}</div>')
        # Description
        print(f'{TAB*5}<div id="DESCcontainer" title="Descriptor Toggle/Cycle" style="position:relative;width:100%;">')
        print(f'{TAB*6}<img class="DESC" id="desc{x}" src="5day/desc_blank.svg" descindex="0">')
        print(f'{TAB*6}<div class="DESCcycle left" title="Description: Cycle Left" id="desc{x}L" onClick="desc_select({x},\'-\')"><div class="desctext">&vltri;</div></div>')
        print(f'{TAB*6}<div class="PERC" id="perc{x}"></div>')
        print(f'{TAB*6}<div class="DESCcycle right" title="Description: Cycle Right" id="desc{x}R" onClick="desc_select({x},\'+\')"><div class="desctext">&vrtri;</div></div>')
        print(f'{TAB*5}</div>')
        # UVI
        print(f'{TAB*5}<table id="uvi{x}" class="UVI" uvivalue="1">')
        print(f'{TAB*6}<tr>')
        print(f'{TAB*7}<td class="UVIcell footer" colspan="11">UVI: <span id="uvi{x}num">1</span></td>')
        print(f'{TAB*6}</tr>')
        print(f'{TAB*6}<tr>')
        print(f'{TAB*7}<td class="UVIcell low" colspan="2">low</td>')
        print(f'{TAB*7}<td class="UVIcell mod" colspan="3">mod</td>')
        print(f'{TAB*7}<td class="UVIcell high" colspan="2">high</td>')
        print(f'{TAB*7}<td class="UVIcell veryhigh" colspan="3">very high</td>')
        print(f'{TAB*7}<td class="UVIcell extreme">ex</td>')
        print(f'{TAB*6}</tr>')
        print(f'{TAB*6}<tr>')
        for y in range(1,11+1):
            if y == 1: print(f'{TAB*7}<td id="uvi{x}-lv{str(y).zfill(2)}" class="UVIcell marker" title="UVI {y}" onClick=\'uvi_chg("{x}","{str(y).zfill(2)}")\'>&Delta;</td>')
            else: print(f'{TAB*7}<td id="uvi{x}-lv{str(y).zfill(2)}" class="UVIcell marker" title="UVI {y}" onClick=\'uvi_chg("{x}","{str(y).zfill(2)}")\'></td>')
        print(f'{TAB*6}</tr>')	
        print(f'{TAB*5}</table>')
        # Wind
        print(f'{TAB*5}<div class="WIND" id="wind{x}" style="display:none;">')
        print(f'{TAB*6}<img class="WINDboxlogo" src="5day/windboxlogo.svg">')
        print(f'{TAB*6}<span id="wind{x}dir"></span>&nbsp;')
        print(f'{TAB*6}<span id="wind{x}spd"></span>')
        print(f'{TAB*5}</div>')
        # Hi / Lo Temps
        print(f'{TAB*5}<div class="HI" id="hi{x}"></div>')
        print(f'{TAB*5}<div class="LO" id="lo{x}"></div>')
        print(f'{TAB*4}</td>')

elif section == 2:
    # Day Header Row
    print(f'{TAB*3}<!-- DAY HEADER ROW BOX -->')
    print(f'{TAB*3}<div class="ROW">')
    for x in range(1,7+1):
        if x in [6,7]: print(f'{TAB*4}<div class="CELL OPTS" id="d{x}optsblock"><u><span id="d{x}name"></span></u></div>')
        else: print(f'{TAB*4}<div class="CELL OPTS"><u><span id="d{x}name"></span></u></div>')
    print(f'{TAB*3}</div>')
    # Percent Box Row
    print(f'{TAB*3}<!-- PERCENT-BOX ROW -->')
    print(f'{TAB*3}<div class="ROW">')
    for x in range(1,7+1):
        if x in [6,7]: print(f'{TAB*4}<div class="CELL OPTS" id="percentbox{x}block">')
        else: print(f'{TAB*4}<div class="CELL OPTS">')
        print(f'{TAB*5}<u>PRCP Chance (%)</u>:<br />')
        print(f'{TAB*5}<input class="PERCINSERT" pattern="\d*" maxlength="3" placeholder="50" value="" id="percentbox{x}" onInput=perc("perc{x}",this.value) ></input>')
        print(f'{TAB*4}</div>')
    print(f'{TAB*3}</div>')
    # UVI Row
    print(f'{TAB*3}<!-- UVI row -->')
    print(f'{TAB*3}<div class="ROW">')
    for x in range(1,7+1):
        if x in [6,7]: print(f'{TAB*4}<div class="CELL OPTS" id="uvi{x}block">')
        else: print(f'{TAB*4}<div class="CELL OPTS">')
        print(f'{TAB*5}<u>UVI Toggle:</u><br />')
        print(f'{TAB*5}<input type="radio" name="uvitoggle{x}" id="uvi{x}off" onClick=\'document.getElementById("uvi{x}").style.display = "none"\' checked>OFF</input>')
        print(f'{TAB*5}<input type="radio" name="uvitoggle{x}" id="uvi{x}on" onClick=\'document.getElementById("uvi{x}").style.display = "table"\'>ON</input>')
        print(f'{TAB*4}</div>')
    print(f'{TAB*3}</div>')
    # Wind
    print(f'{TAB*3}<div class="ROW">')
    for x in range(1,7+1):
        if x in [6,7]: print(f'{TAB*4}<div class="CELL OPTS" id="wind{x}block">')
        else: print(f'{TAB*4}<div class="CELL OPTS">')
        #print(f'{TAB*4}<div class="CELL OPTS">')
        print(f'{TAB*5}<u>Wind:</u><br />')
        print(f'{TAB*5}<input type="radio" name="windtoggle{x}" id="wind{x}off" onClick=\'document.getElementById("wind{x}").style.display = "none"; document.getElementById("wind{x}desc").style.display = "none"\' checked>OFF</input>')
        print(f'{TAB*5}<input type="radio" name="windtoggle{x}" id="wind{x}on" onClick=\'document.getElementById("wind{x}").style.display = "block"; document.getElementById("wind{x}desc").style.display = "block"\'>ON</input>')
        print(f'{TAB*5}<div id="wind{x}desc" style="display:none">')
        print(f'{TAB*6}<select title="Wind Direction" id="wind{x}select" onChange=\'document.getElementById("wind{x}dir").innerHTML = this.value\'>')
        print("""{T}<option value="">--</option>
{T}<option value="N">N</option>
{T}<option value="NNE">NNE</option>
{T}<option value="NE">NE</option>
{T}<option value="ENE">ENE</option>
{T}<option value="E">E</option>
{T}<option value="ESE">ESE</option>
{T}<option value="SE">SE</option>
{T}<option value="SSE">SSE</option>
{T}<option value="S">S</option>
{T}<option value="SSW">SSW</option>
{T}<option value="SW">SW</option>
{T}<option value="WSW">WSW</option>
{T}<option value="W">W</option>
{T}<option value="WNW">WNW</option>
{T}<option value="NW">NW</option>
{T}<option value="NNW">NNW</option>
{T}<!--<option value="Variable">Variable</option>-->""".format(T=TAB*7))
        print(f'{TAB*6}</select><br />')
        print(f'{TAB*6}<input type="number" class="WINDmph" value="" id="wind{x}spdchg" placeholder="Speed" onInput=\'document.getElementById("wind{x}spd").innerHTML = this.value\'></input>')
        print(f'{TAB*6}<br />')
        print(f'{TAB*5}</div>')
        print(f'{TAB*4}</div>')
    print(f'{TAB*3}</div>')
    # Hi Temperature Row
    print(f'{TAB*3}<!-- HI TEMPERATURE ROW -->')
    print(f'{TAB*3}<div class="ROW">')
    for x in range(1,7+1):
        if x in [6,7]: print(f'{TAB*4}<div class="CELL OPTS" id="tmax{x}block">')
        else: print(f'{TAB*4}<div class="CELL OPTS">')
        print(f'{TAB*5}<u>High Temp</u>:<br>')
        print(f'{TAB*5}<input class="TEMPINSERT" maxlength="3" value="" id="tmax{x}" onInput=change_temp("hi{x}",this.value) ></input>')
        print(f'{TAB*4}</div>')
    print(f'{TAB*3}</div>')
    # Low Temperature Row
    print(f'{TAB*3}<!-- LO TEMPERATURE ROW -->')
    print(f'{TAB*3}<div class="ROW">')
    for x in range(1,7+1):
        if x in [6,7]: print(f'{TAB*4}<div class="CELL OPTS" id="tmin{x}block">')
        else: print(f'{TAB*4}<div class="CELL OPTS">')
        print(f'{TAB*5}<u>Low (AM) Temp</u>:<br>')
        print(f'{TAB*5}<input class="TEMPINSERT" maxlength="3" value="" id="tmin{x}" onInput=change_temp("lo{x}",this.value) ></input>')
        print(f'{TAB*4}</div>')
    print(f'{TAB*3}</div>')
