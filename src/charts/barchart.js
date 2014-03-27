/* globals d3:false */

var charts = charts || {};

charts.barchart = function() {
    'use strict';

    // Component Attributes
    var me = {
        width: 100,
        height: 100,
        margin: {top: 5, right: 5, bottom: 5, left: 5},
        time: function(d) { return new Date(d.time); },
        latitude: function(d) { return d.lat; },
        latExtent: [-45, 0],
        rExtent: [10, 40],
        magExtent: [4, 11],
        magnitude: function(d) { return d.magnitude; },
        duration: 50
    };

    function chart(selection) {
        selection.each(function(data) {

            var div = d3.select(this),
                svg = div.selectAll('svg').data([data]),
                margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom;

            svg.enter().append('svg').call(chart.init);

            var gcont = svg.select('g.bar-chart'),
                gchart = gcont.select('g.chart'),
                gxaxis = gcont.select('g.xaxis');

            var xScale = d3.time.scale()
                .domain(d3.extent(data, me.time))
                .range([0, width]);

            var yScale = d3.scale.linear()
                .domain(me.latExtent)
                .range([height, 0]);

            var rScale = d3.scale.linear()
                .domain(me.magExtent)
                .range(me.rExtent);

            var bars = gchart.selectAll('rect').data(data);

            bars.enter().append('rect')
                .attr('width', 2)
                .attr('height', function(d) {
                    return rScale(me.magnitude(d));
                })
                .attr('fill-opacity', 0.3);

            bars.transition().duration(me.duration)
                .attr('x', function(d) { return xScale(me.time(d)); })
                .attr('y', function(d) { return yScale(me.latitude(d)); });

            // X Axis
            var xaxis = d3.svg.axis()
                .orient('top')
                .scale(xScale);

            gxaxis.call(xaxis);

        });
    }

    // Component Initialization
    chart.init = function(selection) {
        selection.each(function(data) {

            var svg = d3.select(this),
                margin = me.margin,
                width = me.width - margin.left - margin.right,
                height = me.height - margin.top - margin.bottom;

            svg
                .attr('width', width)
                .attr('height', height);

            var gcont = svg.append('g')
                .attr('class', 'bar-chart')
                .attr('transform', 'translate(' + [margin.left, margin.top] + ')');

            gcont.append('rect')
                .attr('width', width)
                .attr('height', height)
                .attr('fill', '#eeeeec');

            gcont.append('g').attr('class', 'chart');
            gcont.append('g').attr('class', 'axis xaxis');

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