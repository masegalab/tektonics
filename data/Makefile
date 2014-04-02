
URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/110m/physical/ne_110m_land.zip

ne_110m_land.zip:
	curl -LO $(URL)

ne_110m_land.shp: ne_110m_land.zip
	unzip ne_110m_land.zip
	touch ne_110m_land.shp

land.json: ne_110m_land.shp
	topojson -o land.json ne_110m_land.shp