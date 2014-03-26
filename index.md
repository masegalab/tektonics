---
layout: default
title: Earthquakes
---

<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
<script src='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.js'></script>
<link href='https://api.tiles.mapbox.com/mapbox.js/v1.6.2/mapbox.css' rel='stylesheet' />
<script src="{{site.baseurl}}/bower_components/d3/d3.js"></script>

<div class="container-fluid">
    <div class="row">
        <div class="col-md-6">
            <div id="map-container" style="height:600px;"></div>
        </div>
        <div class="col-md-6">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </div>
    </div>
</div>


<script type="text/javascript">
    // Create a map in the div #map
    var map = L.mapbox.map('map-container', 'pnavarrc.hkfg0gbf')
        .setView([-33, -70], 6);

    var D3Layer = L.Class.extend({

        initialize: function(geojson) {
            this._data = geojson.features;
        },

        onAdd: function(map) {

            var div = d3.select(map.getPanes().overlayPane),
                svg = div.selectAll('svg.points').data(this._data);

            this._data.forEach(function(d) {
                d.LatLng = new L.LatLng(d.geometry.coordinates[1], d.geometry.coordinates[0]);
            });

            var rScale = d3.scale.sqrt()
                .domain([0, d3.max(this._data, function(d) { return d.properties.mag; })])
                .rangeRound([0, 50]);

            svg.enter().append('svg')
                .attr('width', function(d) { return 2 * rScale(d.properties.mag); })
                .attr('height', function(d) { return 2 * rScale(d.properties.mag); })
                .style('position', 'absolute')
                .attr('class', 'point leaflet-zoom-hide');

            svg.append('circle')
                .attr('cx', function(d) { return rScale(d.properties.mag); })
                .attr('cy', function(d) { return rScale(d.properties.mag); })
                .attr('r', function(d) { return rScale(d.properties.mag);  })
                .attr('fill-opacity', 0.1);

            function updateBubbles() {
               svg
                .style('left', function(d) {
                    var dx = map.latLngToLayerPoint(d.LatLng).x;
                    return (dx - rScale(d.properties.mag)) + 'px';
                })
                .style('top', function(d) {
                    var dy = map.latLngToLayerPoint(d.LatLng).y;
                    return (dy - rScale(d.properties.mag)) + 'px';
                });
            }

            // Update the bubbles on zoom/pan
            map.on('viewreset', updateBubbles);
            updateBubbles();
        },

        onRemove: function(map) {}

    });

    d3.json('{{site.baseurl}}/data/earthquakes.json', function(error, data) {

        if (error) { return error; }

        var layer = new D3Layer(data);
        map.addLayer(layer);
    });

</script>