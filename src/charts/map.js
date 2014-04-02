/* global d3:false */

var charts = charts || {};

charts.map = function() {
    'use strict';

    // Component Attributes
    var me = {
        width: 100,
        height: 100,
        margin: {top: 0, right: 0, bottom: 0, left: 0},
        center: [0, 0],
        scale: 150
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]),
                margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom;

            svg.enter().append('svg').call(chart.init);

            var gcont = svg.select('g.map-container');

            var projection = d3.geo.mercator()
                .center(me.center)
                .scale(me.scale)
                .translate([width / 2, height / 2]);

            var path = d3.geo.path()
                .projection(projection);

            var featurePaths = gcont.selectAll('path.feature').data([data]);

            featurePaths.enter().append('path').attr('class', 'feature');

            featurePaths.attr('d', function(d) {
                var p = path(d);
                return p ? p : 'M 1,0';
            });

        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var svg = d3.select(this),
                margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom;

            svg.attr('width', width).attr('height', height);

            var gcont = svg.append('g')
                .attr('class', 'map-container');
        });
    };

    // Generate Accessor Methods
    function createAccessor(attr) {
        return function(value) {
            if (!arguments.length) { return me[attr]; }
            me[attr] = value;
            return chart;
        };
    }

    for (var attr in me) {
        if ((!chart[attr]) && (me.hasOwnProperty(attr))) {
            chart[attr] = createAccessor(attr);
        }
    }

    return chart;
};