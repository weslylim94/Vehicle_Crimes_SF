(function() {
    'use strict';

    d3.eesur = {}; // namespace

    d3.eesur.legend = function() {

        var container = 'legend', // ID of DIV container
            list = 'legend-list', // ID for UL 
            dataKeys = []; // array of key values from JSON data

        var dispatch = d3.dispatch('toggleLegend');

        var c20 = d3.scale.category20();


        var legend = function() {

            // ensure container is visible 
            d3.select('#' + container).transition().duration(1000).style('opacity', 1);

            var legend = d3.select('#' + container + ' ul');
            // create legend container if doesn't exist
            if (legend.empty()) {
                legend = d3.select('#' + container)
                    .attr('class', 'legend_wrap');
                legend
                    .append('ul')
                    .attr('id', list);
            
                // add the legend items
                var legendList = d3.select('#' + list)
                    .selectAll('li')
                    .data(dataKeys);

                legendList   
                    .enter()
                    .append('li')
                    .attr('class', 'legend-item')
                    .attr('id', function(d, i) {
                        return 'li-' + i;
                    })
                    .on('click', function(d,i) {  
                        return dispatch.toggleLegend(d, i); 
                    });

                legendList.append('span')
                    .attr('class', 'legend-line')
                    .style('color', function(d,i) { return c20(i); })
                    .html('&mdash; ');

                legendList.append('span')
                    .attr('class', 'legend-title')
                    .style('color', '#7AC143;')   
                    .html(function(d, i) { return dataKeys[i]; }); 
            }
        };


       legend.container = function(value) {
            if (!arguments.length) return container;
            container = value;
            return this;
        };

        legend.list = function(value) {
            if (!arguments.length) return list;
            list = value;
            return this;
        };

        legend.dataKeys = function(value) {
            if (!arguments.length) return dataKeys;
            dataKeys = value;
            return this;
        };


        d3.rebind(legend, dispatch, 'on');

        return legend;
    };

}());

