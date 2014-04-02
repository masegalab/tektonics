---
layout: default
title: Player
---

<script src="{{site.baseurl}}/bower_components/underscore/underscore.js"></script>
<script src="{{site.baseurl}}/bower_components/backbone/backbone.js"></script>

<div class="container">

    <h1>Reusable Player</h1>

    <div id="player">
    </div>
    <div id="content"></div>
</div>


<div>
    <style>
        .player-background {
            fill: #eee;
        }

        .player-slider-bg {
            fill: #ccc;
        }

        .player-handler {
            fill: #ccc;
            stroke: #777;
        }
    </style>
</div>

<script>
    var player = function() {
        'use strict';

        // Component Attributes
        var me = {
            width: 100,
            height: 100,
            margin: {top: 5, right: 5, bottom: 5, left: 40},
            rail: {height: 10},
            handler: {width: 20, height: 20},
            domain: [0],
            state: {id: 0, stop: true},
            selection: null,
            duration: 2e3
        };

        function chart(selection) {
            me.selection = selection;
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

                svg.attr('width', me.width).attr('height', me.height);

                // Player background
                svg.append('rect')
                    .attr('class', 'player-background')
                    .attr('width', me.width)
                    .attr('height', me.height);

                var gcont = svg.append('g')
                    .attr('class', 'container-group')
                    .attr('transform', 'translate(' + [margin.left, me.height / 2] + ')');

                var labelControl = gcont.append('text')
                    .attr('class', 'control-label')
                    .attr('x', 8 - me.margin.left)
                    .attr('font-family', 'Glyphicons Halflings')
                    .text('\ue072');

                labelControl
                    .attr('y', function() { return this.getBBox().height / 2 - 1; });

                svg.append('rect')
                    .attr('class', 'control-overlay')
                    .attr('width', me.margin.left)
                    .attr('height', me.height)
                    .attr('fill-opacity', 0)
                    .on('click', function() {
                        if (me.state.id === me.domain.length - 1) {
                            chart.reset();
                        } else {
                            if (me.state.stop) {
                                chart.play();
                            } else {
                                chart.pause();
                            }
                        }
                    });

                // Slider Background
                gcont.append('rect')
                    .attr('class', 'player-slider-bg')
                    .attr('height', me.rail.height)
                    .attr('y', -me.rail.height / 2)
                    .attr('width', width);

                // Handler
                gcont.append('rect')
                    .attr('class', 'player-handler')
                    .attr('width', me.handler.width)
                    .attr('height', me.handler.height)
                    .attr('x', -me.handler.width / 2)
                    .attr('y', -me.handler.height / 2);

            });
        };

        chart.play = function() {
            me.state.stop = false;
            chart.tick();
        };

        chart.pause = function() {
            me.state.stop = true;
        };

        chart.reset = function() {
            me.state.stop = true;
            me.state.id = 0;
            chart.tick();
        };

        chart.tick = function() {

            if (!me.state.stop) {
                me.state.id += 1;
                window.setTimeout(chart.tick, me.duration / me.domain.length);
            }

            me.state.stop = me.state.stop || (me.state.id === (me.domain.length - 1));
            chart.trigger('player:tick', {id: me.state.id, item: me.domain[me.state.id]});
        };

        chart.update = function(tick) {
            me.selection.each(function(data) {

                var div = d3.select(this),
                    svg = div.selectAll('svg').data([data]),
                    gcont = svg.select('g.container-group'),
                    margin = me.margin,
                    width = me.width - margin.left - margin.right,
                    height = me.height - margin.top - margin.bottom;

                var xScale = d3.scale.linear()
                    .domain([0, me.domain.length - 1])
                    .range([-me.handler.width / 2, width - me.handler.width / 2]);

                gcont.select('rect.player-handler')
                    .transition()
                    .ease('linear')
                    .attr('x', xScale(tick.id));

                var labelControl = gcont.select('text.control-label')
                    .text(function() {
                        var content = '';
                        if (me.state.stop) {
                            content = (tick.id === me.domain.length - 1) ? '\ue030' : '\ue072';
                        } else {
                            content = (tick.id === 0) ? '\ue072' : '\ue073';
                        }

                        return content;
                    });

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

        chart.on('player:tick', chart.update);
        return chart;
    };

    var data = d3.range(10);

    var p = player()
        .width(400)
        .height(40)
        .domain(data)
        .duration(6e3);

    d3.select('#player').data([0]).call(p);

    var a = {};
    _.extend(a, Backbone.Events);

    a.listenTo(p, 'player:tick', function(tick) {
        d3.select('#content').html(tick.item);
    });

</script>