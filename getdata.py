import json
import requests

USGS_API_URL = 'http://comcat.cr.usgs.gov/fdsnws/event/1/query'

# METHOD = 'query'
PARAMS = {
    'starttime': '2014-01-01T21:02:17',
    'endtime': '2014-03-28T21:02:17',
    'minlatitude': -56,
    'maxlatitude': -18,
    'minlongitude': -79,
    'maxlongitude': -60,
    'minmagnitude': 5.5,
    'format': 'geojson'
}

if __name__ == '__main__':

    r = requests.get(USGS_API_URL, params=PARAMS)

    jsonfile = open('data/earthquakes.json', 'w')
    json.dump(r.json(), jsonfile)
    jsonfile.close()

