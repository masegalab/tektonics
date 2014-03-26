import json
import requests

USGS_API_URL = 'http://comcat.cr.usgs.gov/fdsnws/event/1/query'

# METHOD = 'query'
PARAMS = {
    'starttime': '2013-03-26T21:02:17',
    'endtime': '2014-03-26T21:02:17',
    'minlatitude': -40,
    'maxlatitude': -30,
    'minlongitude': -75,
    'maxlongitude': -65,
    'minmagnitude': 4,
    'format': 'geojson'
}

if __name__ == '__main__':

    r = requests.get(USGS_API_URL, params=PARAMS)

    jsonfile = open('data/earthquakes.json', 'w')
    json.dump(r.json(), jsonfile)
    jsonfile.close()

