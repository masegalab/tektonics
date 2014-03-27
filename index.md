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

            <h1>Lorem ipsum dolor sit amet.</h1>

            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

            <div class="row chart-container">
                <div class="col-md-4" id="map-mini"></div>
                <div class="col-md-8" id="chart-barchart"></div>
            </div>
        </div>
    </div>
</div>


<script type="text/javascript">
    // Create a map in the div #map
    var map = L.mapbox.map('map-container', 'pnavarrc.hkfg0gbf')
        .setView([-33, -70], 6);

    var barchart = charts.barchart()
        .height(300)
        .time(function(d) { return new Date(d.properties.time + 60 * 1e3 * d.properties.tz); })
        .latitude(function(d) { return +d.geometry.coordinates[1]; })
        .margin({top: 20, right: 5, bottom: 5, left: 5})
        .magnitude(function(d) { return +d.properties.mag; });

    d3.json('{{site.baseurl}}/data/land.json', function(error, data) {

        if (error) { return error; }

        var miniMap = charts.map();

        // console.log(data.features);

        d3.select('#map-mini').data([data.features]).call(miniMap);

    });

    d3.json('{{site.baseurl}}/data/earthquakes.json', function(error, data) {

        if (error) { return error; }

        var layer = new charts.D3Layer(data.features);
        map.addLayer(layer);

        var bounds = map.getBounds(),
            minLat = bounds._southWest.lat,
            maxLat = bounds._northEast.lat;

        barchart.latExtent([minLat, maxLat]);

        var barchartWidth = parseInt(d3.select('#chart-barchart').style('width'), 10);

        barchart.width(barchartWidth);

        d3.select('#chart-barchart')
            .data([data.features])
            .call(barchart);

        function updateBarchart() {

            var bounds = this.getBounds(),
                minLat = bounds._southWest.lat,
                maxLat = bounds._northEast.lat;

            barchart.latExtent([minLat, maxLat]);

            d3.select('#chart-barchart').data([data.features])
                .call(barchart);
        }

        map.addEventListener('viewreset drag', updateBarchart, map);

    });

</script>