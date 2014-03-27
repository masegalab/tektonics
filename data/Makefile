
URL = http://www.naturalearthdata.com/http//www.naturalearthdata.com/download/50m/physical/ne_50m_land.zip

ne_50m_land.zip:
	curl -LO $(URL)

ne_50m_land.shp: ne_50m_land.zip
	unzip ne_50m_land.zip
	touch ne_50m_land.shp

land.json: ne_50m_land.shp
	ogr2ogr -f GeoJSON land.json ne_50m_land.shp