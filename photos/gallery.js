// Global vars
photo ={"year":1984,"index":0};

// Upon the page loading, this is used only to display the newest image first
function choosenewest() { chgsrc("<"); }

// Handles selection of year by the 'buttons' at the top
function chooseyear(y) {
	// Only has effect if the selected year is different than the current displayed year
	if (y != photo.year) {
		try {
			let needchg = ["backgroundColor","fontWeight","color"];
			for (x=0;x<3;x++) {document.getElementById("p" + photo.year.toString()).style[needchg[x]] = "inherit";}
		} catch {}
		// change yearselect button to match requested year
		document.getElementById("p" + y.toString()).style.backgroundColor = "rgb(80,80,80)";
		document.getElementById("p" + y.toString()).style.fontWeight = "bold";
		document.getElementById("p" + y.toString()).style.color = "yellow";
		// change currentyear to the requested year
		photo.year = y;
		if (y == 2015) {
			document.getElementById("disp_vid").style.display = "none";
			document.getElementById("disp_vid").src = "";
			document.getElementById("disp").src = "photos/empty.svg";
		}
		// All other years
		else {
			// change the source of the image/video
			// If the image is a video...
			if (album[y][0].src.substr(album[y][0].src.length-3) == "mp4") {
				document.getElementById("disp").src = "photos/wait.svg";
				document.getElementById("disp_vid").src = album[y][0].src;
				document.getElementById("disp_vid").style.display = "block";
			}
			// If the image is a picture...
			else {
				document.getElementById("disp_vid").style.display = "none";
				document.getElementById("disp_vid").src = "";
				document.getElementById("disp").src = album[y][0].src;
			}
			document.getElementById("description").innerHTML = album[y][0].desc;
			photo.index = 0;
		}
	}
}

function chgsrc(dir) {
	if (photo.year != 2015) {
		// Go back a photo
		if (dir == "<") {
			if (photo.index == 0) {var newi = album[photo.year].length-1;}
			else {var newi = photo.index-1;}
		}
		// Go forward a photo
		else {
			if (photo.index == album[photo.year].length-1) {var newi = 0;}
			else {var newi = photo.index+1;}
		}
		// VIDEO CLIP
		if (album[photo.year][newi].src.substr(album[photo.year][newi].src.length-3) == "mp4") {
			document.getElementById("disp").src = "photos/wait.svg";
			document.getElementById("disp_vid").src = album[photo.year][newi].src;
			document.getElementById("disp_vid").style.display = "block";
		}
		// IMAGE
		else {
			document.getElementById("disp").src = album[photo.year][newi].src;
			document.getElementById("disp_vid").style.display = "none";
			document.getElementById("disp_vid").src = "";
		}
		document.getElementById("description").innerHTML = album[photo.year][newi].desc;
		photo.index = newi;
	}
}


// {YYYY:[{"src": ... ,"desc": ...}...]}
album = {2012:[
			{"src":"photos/2012/2003_0701_shelf.jpg","desc":"07/01/2003 - Ominous Shelf Cloud. This was my first shelfie. It was a beautiful day, and we were on our way back from a trip from Hanging Rock. We were met by this storm and mean-looking shelf. I was so novice at the time I thought it was a wall cloud (associated with a tornadic storm; I always thought the worst), but no, just a shelf-cloud. Impressive gusty winds and heavy rain underneath."},
			{"src":"photos/2012/2003_sunset1.jpg","desc":"~ 2003 - Sunset"},
			{"src":"photos/2012/2003_sunset2.jpg","desc":"~ 2003 - Sunset"},
			{"src":"photos/2012/2005_thunderhead.jpg","desc":"Summer 2005 - Thunderhead. I had just upgraded my camera and was tinkering with it when I was told to look outside. This storm wasn't very strong, but looked cool. It was occurring over Yadkinville, NC."},
			{"src":"photos/2012/2006_afternoon_moon.jpg","desc":"~ 2006 - Waxing Gibbous in the Evening. I took this while testing out a zoom lens that I got that somewhat worked with my Camera."},
			{"src":"photos/2012/2006_winter_sunset.jpg","desc":"Unknown - Sunset in the Winter (I believe)."},
			{"src":"photos/2012/2008_1024_pileus.jpg","desc":"10/2008 - Amazing Cap Cloud. At the time I didn't know what I was looking at other than it was a &quot;cool cloud.&quot; Taken from a plane, not sure where we were during the time. And it could be a wildfire underneath, but I'm pretty sure it was a thunderstorm."},
			{"src":"photos/2012/2008_pilot_knob.jpg","desc":"~ 2008 - Pilot Knob of Pilot Mountain, NC. In the back are Sauratown Mountain and Hanging Rock, respectively."},
			{"src":"photos/2012/2010_0325_tree.jpg","desc":"03/25/2010 - Early-spring blooming on a cold but peaceful day in Nauvoo, IL."},
			{"src":"photos/2012/2010_0615_whalesmouth.jpg","desc":"06/15/2010 - Being devoured by the whale's mouth."},
			{"src":"photos/2012/2011_0503_whalesmouth.jpg","desc":"05/03/2011 - Another whales mouth/shelf-cloud passage (taken from the same place as the 2010 one, ironically), but not as turbulent"},
			{"src":"photos/2012/2012_0621_seagull.jpg","desc":"06/21/2012 - Sea Gull at Myrtle Beach."},
			{"src":"photos/2012/2012_0622_beachsunrise0.jpg","desc":"06/22/2012 - Myrtle Beach Dawn/Twilight"},
			{"src":"photos/2012/2012_0622_beachsunrise0a.jpg","desc":"06/22/2012 - While waiting on the sunrise, I used someone's lost sandal from the day before as a photo opportunity."},
			{"src":"photos/2012/2012_0622_beachsunrise1.jpg","desc":"06/22/2012 - Myrtle Beach Sunrise"},
			{"src":"photos/2012/2012_0622_beachsunrise2.jpg","desc":"06/22/2012 - Myrtle Beach Sunrise"},
			{"src":"photos/2012/2012_0708_tstorm.jpg","desc":"07/08/2012 - Thunderstorm over SW Va."}
		],
		2013:[
			{"src":"photos/2013/0313_sunset.jpg","desc":"03/13/2013 - Sunset. Viewing from UNC-Charlotte campus."},
			{"src":"photos/2013/0628_shelf1_new.jpg","desc":"06/28/2013 - Ominous Shelf Cloud. After watching a movie at the school I was going to go out to the car deck. I hadn't even got out the door when I saw that the sky was very dark! I walked outside and saw this epic shelf cloud from a storm to the northwest (taken from campus). As a weather nut, I was very appreciative of the scene. The storm wasn't as menacing as it looked though."},
			{"src":"photos/2013/0628_shelf2_new.jpg","desc":"06/28/2013 - Shelf cloud. This is looking at it as it was starting to pass over head prior to the arrival to the rain."},
			{"src":"photos/2013/0901_rainbow.jpg","desc":"09/01/2013 - Rainbow at sunset."},
			{"src":"photos/2013/1104_kh.jpg","desc":"11/04/2013 - Kelvin-Helmholtz Waves. Often indicative of strong wind-shear. These are the first of this type that I had ever seen knowing what I was looking at."},
			{"src":"photos/2013/1105_cirrocumulus_new.jpg","desc":"11/05/2013 - Cirro-cumulus."},
			{"src":"photos/2013/1108_autumn_new.jpg","desc":"11/08/2013 - I remember this just being a classically beautiful autumn day."},
			{"src":"photos/2013/1119_cirrus.jpg","desc":"11/19/2013 - Cirrus as the sun was about to set."}
		],
		2014:[
			{"src":"photos/2014/0123_clouds.jpg","desc":"01/23/2014 - Glaciation makes winter clouds amazing."},
			{"src":"photos/2014/0211_campussnow.jpg","desc":"02/11/2014 - Snow on the UNC-Charlotte Campus. Taken from the Student Union."},
			{"src":"photos/2014/0213_snow1_new.jpg","desc":"02/13/2014 - Heavy snow; big flakes were falling this day."},
			{"src":"photos/2014/0213_snow2_new.jpg","desc":"02/13/2014 - Heavy snow. Not only did it look pretty, but it delayed a test or two at school."},
			{"src":"photos/2014/0526_storm_new.jpg","desc":"05/26/2014 - Storm to the east. Taken from NW Charlotte, NC."},
			{"src":"photos/2014/0613_cb_new.jpg","desc":"06/13/2014 - Cumulonimbus approaching maturity."},
			{"src":"photos/2014/0703_striations.jpg","desc":"07/03/2014 - Striations evident on this shelf-like cloud, signalling the approach of some storms west of Charlotte."},
			{"src":"photos/2014/0709_shelf_new.jpg","desc":"07/09/2014 - Shelf cloud. Taken from the UNC-Charlotte campus looking eastward. I believe this is taking place around the airport (KCLT)."},
			{"src":"photos/2014/0724_cb_new.jpg","desc":"07/24/2014 - Mature cumulonimbus. Taken from the UNC-Charlotte campus. Storm is taking place southwest of campus across the stateline I believe."}
		],
		2016:[
			{"src":"photos/2016/0208_shelf1_new.jpg","desc":"02/08/2016 - Shelf Cloud. As a cold front was passing through, this shelf cloud was formed. It was definitely cold enough for the precip to initally fall below cloud-base as snow. Taken at UNC-Charlotte."},
			{"src":"photos/2016/0208_snowshaft_new.jpg","desc":"02/08/2016 - Snow Shaft. As this precip reached the ground, it was probably rain, but in this state in the air, I'm pretty sure it was snow. Taken at UNC-Charlotte."},
			{"src":"photos/2016/0316_sunset.jpg","desc":"03/16/2016 - No words."},
			{"src":"photos/2016/0407_sunset_new.jpg","desc":"04/07/2016 - Beautiful sunset. From a parking lot in the Charlotte, NC area."},
			{"src":"photos/2016/0521_shelf1.jpg","desc":"05/21/2016 - Large Shelf Cloud. Strong storms moved into the Concord, NC area. I had gone to a local park for an activity that, unbeknownst to me, got cancelled. I decided to stick around as some storms started to move in. That decision paid off! But it was foolish as lightning was kind of frequent and I was standing very close to a radio/comm tower."},
			{"src":"photos/2016/0521_shelf2_new.jpg","desc":"05/21/2016 - Shelf Cloud extent. This shows the shelf cloud's northern (I believe) extent. Just like pouring water out into the sink, air is forced outward by falling precipitation in a thunderstorm. The less dense air in front of the storm is forced upward and condenses, giving the shelf cloud its ominous shape."},
			{"src":"photos/2016/0702_distantanvil_new.jpg","desc":"07/02/2016 - Thunderstorm in the distance. Taken from a Florida Beach."},
			{"src":"photos/2016/0702_orphananvil_new.jpg","desc":"07/02/2016 - Orphaned Anvil. As a thunderstorm decays, the anvil usually stays visible after the thunderstorm fizzles. The anvil originates from moisture which was ingested by the storm's updraft being exhausted, spreading outward at the top of the troposphere."},
			{"src":"photos/2016/0715_storm_new.jpg","desc":"07/15/2016 - A storm. Rain shaft on the left; Some possible shelving."},
			{"src":"photos/2016/0719_stormrainbow.jpg","desc":"07/19/2016 - A storm and a rainbow. A prominent rain shaft and strong updrafts, and even a rainbow showed up on this day."},
			{"src":"photos/2016/0801_thunderhead.jpg","desc":"08/01/2016 - My Grandmother's Thunderstorm; about 9am. Florida panhandle. An oddly noisy thunderstorm to the east formed on this particular morning."},
			{"src":"photos/2016/0801_shelf.jpg","desc":"08/01/2016 - Shelf. The thunderstorm led to these shelf clouds to occur."},
			{"src":"photos/2016/0815_thunderhead.jpg","desc":"08/15/2016 - Thunderhead. Nice anvil on this storm."},
			{"src":"photos/2016/1208_aaundu.jpg","desc":"12/08/2016 - Asperitas. That wavy feature appearing along the clould-base are referred to as Asperitas."},
			{"src":"photos/2016/1208_arc.jpg","desc":"12/08/2016 - Circumhorizontal Arc. After the clouds cleared, this formed in the midst of abundant cirrus."}
		],
		2017:[
			{"src":"photos/2017/0201_sunset.mp4","desc":"02/01/2017 - Amazing Sunset! Very windy on this evening and I didn't have a tripod on-hand (hence the needed smoothing) but the dynamic colors were undeniable. Taken from UNCC, on the Union Deck."},
			{"src":"photos/2017/0517_birds.jpg","desc":"May 2017 - Brown Thrashers. Surprisingly fast ground speed (to me)."},
			{"src":"photos/2017/0517_birds2.jpg","desc":"May 2017 - Grackles. I thought they were crows but the colored metallic-like sheen on their heads signal otherwise. Very pesky though. If a bird could be rude, I'd imagine that they'd get the nod for that distinction."},
			{"src":"photos/2017/0519_tower_new.jpg","desc":"05/19/2017 - Developing cell. This young cell was forming in the midst of already-matured (and decaying) cells."},
			{"src":"photos/2017/0520_lightning.gif","desc":"05/20/2017 - Lightning Video Capture. A fast moving complex of storms rolled through. Anvil crawling! This is looking toward the southeast after its passage."},
			{"src":"photos/2017/0613_turbulence.jpg","desc":"06/13/2017 - Turbulence in the clouds."},
			{"src":"photos/2017/0615_cb_new.jpg","desc":"06/15/2017 - Storm over SW Patrick County, VA."},
			{"src":"photos/2017/0615_cb_stokes_new.jpg","desc":"06/15/2017 - Cumulonimbus over Stokes County, NC."},
			{"src":"photos/2017/0624_stormrainbow.jpg","desc":"06/24/2017 - Rainbow amongst cumulus congestus. Captured this scene while watching some convection to the east."},
			{"src":"photos/2017/0701_cb_new.jpg","desc":"07/01/2017 - Captured this storm's top at sunset during a trip; somehwere in SC or GA I believe."},
			{"src":"photos/2017/0705_cb_new.jpg","desc":"07/05/2017 - Cumulus Congestus. Florida Panhandle."},
			{"src":"photos/2017/0706_cumulus_new.jpg","desc":"07/06/2017 - Florida convection is so amazing."},
			{"src":"photos/2017/0706_cumulus2_new.jpg","desc":"07/06/2017 - Close up of the healthy updraft of the convection."},
			{"src":"photos/2017/0706_storm.jpg","desc":"07/06/2017 - Cumulonimbus. You get all stages of the storm here. Anvil spreading out; new cells and updrafts to the north (right)."},
			{"src":"photos/2017/0714_mammatus.jpg","desc":"07/14/2017 - Mammatus! Some mammatus formation appeared on the underside of a large anvil from a thunderstorm over Patrick County, VA."},
			{"src":"photos/2017/0817_anvil.jpg","desc":"08/17/2017 - Thunderstorm to the northeast."},
			{"src":"photos/2017/0920_decay.mp4","desc":"09/20/2017 - Quickly-dying cell. Poof. Gone!"},
			{"src":"photos/2017/0930_moon.jpg","desc":"09/30/2017 - The moon. This is a combination of my camera being high megapixel and its decent zoom capability."},
			{"src":"photos/2017/1021_sundog1.jpg","desc":"10/21/2017 - Sundogs! Sun plus icy cirrus = sundogs!"},
			{"src":"photos/2017/1021_sundog2.jpg","desc":"10/21/2017 - Close up of the left sundog."},
			{"src":"photos/2017/1023_rainbow.jpg","desc":"10/23/2017 - Vivid rainbow at sunset. There was a strong cold front that passed through and we were treated to a near full semi-circle rainbow as clearing started to occur after its passage. This is the north end of the rainbow."},
			{"src":"photos/2017/1111_peak.jpg","desc":"11/11/2017 - Fisher's Peak (the central peak). This is probably my favorite mountain. It's the tallest point in Surry County and sits on the NC/VA line. The blue ridge mountains are so peaceful to me. Taken from Round Peak, Surry County, NC."},
			{"src":"photos/2017/1111_sundog.jpg","desc":"11/11/2017 - Skull Camp Sundog. This occurred around sunset. This is looking south toward the Skull Camp Mountain area. The sundog, apparent due to those wispy, icy cirrus, had extra character as the cirrus was chaotic and unorganized."},
			{"src":"photos/2017/1118_sunrise1_new.jpg","desc":"11/18/2017 - Sunrise. Clouds make sunrises extra special."},
			{"src":"photos/2017/1118_sunrise2_new.jpg","desc":"11/18/2017 - Close-up of the Sunrise. The colors were very vibrant."},
			{"src":"photos/2017/1202_gwaves1.jpg","desc":"12/02/2017 - Gravity waves at night."},
			{"src":"photos/2017/1202_gwaves2.jpg","desc":"12/02/2017 - More gravity waves."},
			{"src":"photos/2017/1208_snow.jpg","desc":"12/08/2017 - Snow! We were treated to a healthy dose of snow shortly after December started."},
			{"src":"photos/2017/1218_gwaves_new.jpg","desc":"12/18/2017 - Gravity Waves. Check out that glaciation!"}
		],
        2018:[
            {"src":"photos/2018/0119_icecicles.jpg","desc":"01/19/2018 - Some icecicles hanging down into the frigid air against the backdrop of a wonderful sunrise."},
            {"src":"photos/2018/0514_clouds.jpg","desc":"05/14/2018 - Some sort of gravity wave emanation, I believe."},
            {"src":"photos/2018/0618_cell.jpg","desc":"06/18/2018 - Evening storm cell. Over NW Surry County, NC."},
            {"src":"photos/2018/0625_shelf1.jpg","desc":"06/25/2018 - Nice shelf-cloud induced by outflow from a thunderstorm to our west over the Blue Ridge. I was alerted to it as I thought I heard rain drops on the tin roof, but when I went to go look at the radar, the storm was approaching. It had a distinct bowing signature. I immediately got up and looked out the door specifically to see if a shelf was evident, and it was! I grabbed my camera and ran outside and got some (blurry) pictures of it."},
            {"src":"photos/2018/0625_shelf2.jpg","desc":"06/25/2018 - Nice shelf-cloud. This is a little later after the shelf had passed over. That rippled chaos you see is typically referred to as a 'whale's mouth.'"},
            {"src":"photos/2018/0715_convection.jpg","desc":"July 2018 - Convection in the distance as sunset approached; the cell's shadow cast on clouds behind it. This is looking southeast. The storms were moving northwest thanks to an outflow boundary from storms originating near the NC coast. It continually triggered new cells as it glided across the gently rising elevation of the state."},
            {"src":"photos/2018/0725_toad.jpg","desc":"07/25/2018 - A young Mr. Toad. I found this little guy hopping around prior to the arrival of some rain."},
            {"src":"photos/2018/0803_insect.jpg","desc":"08/03/2018 - Insect (I don't know what it is; it was really small) on a cucumber bloom."},
            {"src":"photos/2018/0803_ladybug.jpg","desc":"08/03/2018 - A ladybug feasting on a squash leaf (I'm not sure of the species)."},
            {"src":"photos/2018/0803_gravitywaves.jpg","desc":"08/03/2018 - Gravity Waves evident. Looking northeast. These appeared following the passage of a line of storms (I believe a weak frontal boundary). Based on mesoanalysis data, I'd guess that these are occurring in the mid-levels."},
            {"src":"photos/2018/0805_updraft.mp4","desc":"08/05/2018 - Vortical updraft. On this day, one of the most pleasant evening storms occurred. Very little rain; no lightning; wonderful breeze. According to the Mesoanalysis, for that evening, CAPE was around 3000 J/kg, but it was a skinny-CAPE profile, highlighted by low LI's. But DCAPE's were well over 1000 J/kg. While weak vertical accelerations probably prevented this nice cell from producing thunder, portions of sinking parcels with the rain likely generated the exceptional cool breeze (the DCAPE). The rain stayed to our South while streams of sunlight stayed mostly visible here. I was trying to capture some general time-lapse imagery, hoping to get some rain-shafts in-shot when I noticed a small updraft becoming striated, which made me think, rotation! I quickly turned all my focus on this updraft. This is the result. Really cool. Of note, this is about a 10-minute time-lapse, so the overall vorticity shown by this updraft is likely pretty low. But you can clearly see that this updraft was a prominent low-pressure perturbation, being the focus of the inflow. Then you can tell that the bouyant updraft twisted that inflow into the vertical. I wished I had noticed that updraft sooner, but oh well."},
            {"src":"photos/2018/0807_thunderstorm.jpg","desc":"08/07/2018 - Maturing Thunderstorm to the East."},
            {"src":"photos/2018/0808_shelf.mp4","desc":"08/08/2018 - Turbulent Shelving. A thunderstorm rolled down the Blue Ridge, carrying with it an evident shelf-cloud, albeit, I believe, weak on this afternoon. You can see the shelf(underlying cold-pool) forcing upward moisture ahead of it. This environment was marked by Strong CAPE but low shear though."}
		],
        2019:[
            {"src":"photos/2019/0206_sunrise.jpg","desc":"02/06/2019 - Cloudbreaks plus sunrise equals goodness."},
            {"src":"photos/2019/0429_asperitas.mp4","desc":"04/29/2019 - Asperitas Time-Lapse (1hr); increased the contrast/decreased brightness to allow the wavy blanket motion to show better. I've been hoping to get a good Asperitas time-lapse for a while. This one was a blessing."},
            {"src":"photos/2019/0512_rainbow.jpg","desc":"05/12/2019 - Post-Frontal Rainbow"},
            {"src":"photos/2019/0525_deepconv.mp4","desc":"05/25/2019 - Developing Convection. Saw this as it started as a robust updraft cumuliform base. As it tracked ENE over Stokes County, more and more parcels started to explode, leading to a pleasantly surprising convection time-lapse. The storm fizzled after it passed over the Hanging Rock area."},
            {"src":"photos/2019/0525_svacell.jpg","desc":"05/25/2019 - Mature Thunderstorm over SW VA (I believe Henry Co.), with echo-tops punching 50kft. For a time (I believe it was this cell), it hinted at some supercell structure as it traversed Patrick County, (between 23z and 0z had signs of an RFD, a v-notch, and inflow notch)."},
            {"src":"photos/2019/0529_buoyancy.mp4","desc":"05/29/2019 - Great buoyancy displayed here. Time-lapse of around 50 minutes of clips"},
            {"src":"photos/2019/0807_conv.mp4","desc":"08/07/2019 - Post-maturation to decay of a cell in southern tier of county"},
            {"src":"photos/2019/1001_conv.mp4","desc":"10/01/2019 - Slow-moving cell in Patrick County, VA; Strong but skinny-CAPE; deep-layer moderate-shear, but weakly moderate effective-shear. Check out the linear anvil off-shoot, resultant of the 45+ kt UL winds."},
            {"src":"photos/2019/1001_waxingcrescent1.jpg","desc":"10/01/2019 - Setting Waxing Crescent. 0.5s exposure. Clouds from earlier showers had dissapated leaving clear skies, with a young moon chasing the sun."},
            {"src":"photos/2019/1001_waxingcrescent2.jpg","desc":"10/01/2019 - Setting Waxing Crescent. 8sec exposure. Extra time caught more glow from the sliver and the earthshine. Tree-tops were a nice touch."},
            {"src":"photos/2019/1012_sunset.jpg","desc":"Oct 2019 - Very vibrant sunset"},
            {"src":"photos/2019/1112_caa.mp4","desc":"11/12/2019 - Post-Frontal Passage. A strong cold-front moved through this day. Camera is generally pointed south/southeast. Good display of showing winds changing with height. Here, they are 'backing' with height, implying the definite Cold-Air Advection. I was hoping to catch some KH clouds, and I think at times they did but were very short-lived or not robust enough to catch on camera"}
		],
		2020:[
			{"src":"photos/2020/0213_sundog.jpg","desc":"02/13/2020 - Encountered a nice sundog during an evening walk. Enhancement hinted at an upper tangent arc"},
			{"src":"photos/2020/0609_convection.jpg","desc":"06/09/2020 - Beautiful convection blew-up this evening; line to the east, moving northward. A very-faint rainbow made a cameo in this shot (left-half of image)."},
			{"src":"photos/2020/0609_convection.mp4","desc":"06/09/2020 - (time-lapse of ~30 minutes of video) Beautiful convection blew-up this evening; line to the east, moving northward."},
			{"src":"photos/2020/0710-panorama.jpg","desc":"07/10/2020 - Developing shelf-cloud from an approaching storm; looking SSE. Some strong winds were evident as there was some fast-moving scud just above the surface. These strong winds didn't reach the surface or dissipated quickly due to friction."},
			{"src":"photos/2020/0710_lightning_clip.mp4","desc":"07/10/2020 - Post-storm lightning video capture; looking ESE."},
			{"src":"photos/2020/0724_lightning_clip.mp4","desc":"07/24/2020 - This storm developed after sunset I think. It had some really nice lightning with it. This is a combined clip of 3 of those strikes. Anvil crawling evident too. They were spaced by variable amounts of time (I video-time-lapsed for -/+ 40 minutes or so). This storm matured and dissipated a little to the WSW."},
			{"src":"photos/2020/0829_redspider.jpg","desc":"08/29/2020 - Very tiny red spider. Searching for it makes me think it is a <a href='https://en.wikipedia.org/wiki/Blacktailed_red_sheetweaver' target='_blank'>Black-tailed Red Sheetweaver</a> I'd never seen one of these before. It set-up its silk-hammock in a hanging-planter."},
			{"src":"photos/2020/0903_catepillar.jpg","desc":"09/03/2020 - Beautiful caterpillar; the tobacco hornworm. I didn't know what it was, so I looked it up. <a href='http://entnemdept.ufl.edu/creatures/field/tobacco_hornworm.htm' target='_blank'>Here's the link</a>. I was quite pleased with how my camera did in macro mode here. That's a tomato plant it is munching on in the left panel."},
		],
		2021: [
			{"src":"photos/2021/0409_supercell.jpg","desc":"04/09/2021 - A weak supercell (but very-strong for us) approached from the WNW. This is looking toward the storm, with a prominent hail-core on the right. Though not in the photo, very-evident turquoise hue from the hail-core was in the clouds. Of note, the cloud-feature in the middle of the photo, though appearing to wrap around behind the hail core, actually was in front of it. I just wanted to mention that it wasn't part of any recognizable mesocyclone. The NWS did briefly issue a Tornado Warning for this storm, but it primarily was notable for its abundance of pea-size to dime-sized hail."},
			{"src":"photos/2021/0512_bunny.jpg","desc":"05/12/2021 - Well, a decent-sized family of rabbits have made themselves cozy in the backyard this year."},
			{"src":"photos/2021/0612_spider.jpg","desc":"06/12/2021 - Monster-sized spider in the basement. I've seen them down there multiple times. Called a 'Dark Fishing Spider', or something like that."},
			{"src":"photos/2021/0809_spider.jpg","desc":"08/09/2021 - Small spider dangling from a tree catching some late-afternoon rays."},
			{"src":"photos/2021/0811_tstorm_maturing.jpg","desc":"08/11/2021 - Cumulonimbus approaching maturation over Southern Patrick County, VA. This afternoon was characterized by a typical summer atmosphere of moderate CAPE and low-shear. This updraft was punching 40kft according to KFCX Echo Tops. Looking Northeast."},
			{"src":"photos/2021/0812_congestus.mp4","desc":"08/12/2021 - Another Moderate CAPE/low-shear day. This convective surge occurred on the northern Surry/Stokes County border. Half-way in, I accidentally changed the fpm of the time-lapse from 4-per-minute to 12-per-minute. Luckily this occurred as the towering cumulus-congestus was making its push for its 20-25kft climax. At the end, the anvil from a large thunderstorm (echo-tops 45kft+) further east over Stokes County makes a late-appearance. Time-lapse of ~45 minutes."},
		]
	}











