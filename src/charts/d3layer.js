/* global L, d3:false*/

var charts = charts || {};

charts.D3Layer = L.Class.extend({

    initialize: function(features) {
        this._data = features;
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