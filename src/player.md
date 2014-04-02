---
layout: default
title: Player
---

<script src="{{site.baseurl}}/bower_components/underscore/underscore.js"></script>
<script src="{{site.baseurl}}/bower_components/backbone/backbone.js"></script>

<div id="player"></div>
<div id="content"></div>

<script>
    var chartname = function() {
        'use strict';

        // Component Attributes
        var me = {
            width: 100,
            height: 100,
            margin: {top: 5, right: 5, bottom: 5, left: 5}
        };

        function chart(selection) {
            selection.each(function(data) {

                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]);

                svg.enter().append('svg').call(chart.init);

                var gcont = svg.select('g.container-group');

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
                    .attr('class', 'container-group');
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

        _.extend(chart, Backbone.Events);
        return chart;
    };


</script>