---
layout: default
title: Earthquakes
---

<div class="container-fluid">
    <div class="row">
        <div class="col-md-6">
            <div id="map-container" style="height:100%;"></div>
        </div>
        <div class="col-md-6">
            <div class="row chart-container">
                <div class="col-md-4" id="map-mini"></div>
                <div class="col-md-8" id="chart-barchart"></div>
            </div>
        </div>
    </div>
</div>

<script>

    // Store the land and earthquake data in the global scope
    var land, eqdata;

    // Charts
    // ------

    // Mini Map
    var miniMap = charts.map()
        .width(200)
        .height(300);

    // Mapbox
    var map = L.mapbox.map('map-container', 'pnavarrc.hkfg0gbf')
        .setView([-33, -70], 6);

    // Barchart
    var barchart = charts.barchart()
        .height(300)
        .width(300)
        .time(function(d) { return new Date(d.properties.time + 60 * 1e3 * d.properties.tz); })
        .latitude(function(d) { return +d.geometry.coordinates[1]; })
        .margin({top: 20, right: 5, bottom: 5, left: 5})
        .magnitude(function(d) { return +d.properties.mag; });


    // Load the TopoJSON data
    d3.json('{{site.baseurl}}/data/land.json', function(error, data) {

        if (error) { return error; }

        land = topojson.feature(data, data.objects.ne_110m_land);

        if (map.getCenter()) { update(); }
    });

    // Load the Earthquake data
    d3.json('{{site.baseurl}}/data/earthquakes.json', function(error, data) {

        if (error) { return error; }

        eqdata = data;

        if (map.getCenter()) {
            map.addLayer(new charts.D3Layer(eqdata.features));
        }

        d3.select('#chart-barchart')
            .data([data.features])
            .call(barchart);
    });

    function update() {

        var center = map.getCenter(),
            bounds = map.getBounds(),
            alpha = Math.PI * (bounds._northEast.lat - bounds._southWest.lat) / 180;

        // Update the minimap
        miniMap
            .center([center.lng, center.lat])
            .scale(miniMap.height() / alpha);

        if (land.features) {
            d3.select('#map-mini').data([land]).call(miniMap);
        }

        barchart.latExtent([bounds._southWest.lat, bounds._northEast.lat]);

        if (eqdata) {

            var isEmpty = d3.select(map.getPanes().overlayPane).select('svg').empty();

            if (isEmpty) {
                map.addLayer(new charts.D3Layer(eqdata.features));
            }

            d3.select('#chart-barchart').data([eqdata.features])
                .call(barchart);
        }
    }

    map.addEventListener('viewreset drag load', update);
</script>
