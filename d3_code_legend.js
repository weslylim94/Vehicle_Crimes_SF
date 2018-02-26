(function() {
    'use strict';

//************************************************************
// Set up variables
//************************************************************

    var items = 0; // data items (used by slider)


    var dataReference = [];

    var n = 0, // set initial value
        w = 800, // width
        h = 200; // height

    var c20 = d3.scale.category20();

    // add yScale
    var yScale = d3.scale.linear()
        .domain([0, 200])
        .range([h, 0]);


 
// -----------------------------   

    function createLines(selection) {

        selection
            .append('line')
            .attr({
                x1: function(d, i) { return i *20 +10; },
                y1: function(d) { return yScale(d.value); },
                x2: function(d, i) { return i *20 +10; },
                y2: yScale(0),
                id: function(d,i) { return 'line-' + i; },
                class: 'line'
            })
            .style({
                'stroke-width': 5,
                stroke: function(d,i) { 
                        if (i < 10) {
                            return c20(i);
                        } else {
                            var j = i % 20;
                            return c20(j);
                        }
                    }
            })
            .on('mouseover', function(d,i) {
                // move legend on mouse over
                moveLegend('li-' + i);
                // update n for the buttons
                n = i;
            });
    }
    

    var svg = d3.select('#chart')
        .append('svg')
        .attr({
            width: w,
            height: h
        });


//************************************************************
// Legend
//************************************************************ 
    
    function renderLegend(data) {

        // create legend
        var legend = d3.eesur.legend()
            .dataKeys(dataReference);

        // event to update yScale when toggling line series
        legend.on('toggleLegend', function(d, i) { 

            // console.log('toggleLegend: ' + d, i); 
            // reference line via it's id 
            var line = d3.select('#line-' + i);
            // reference legend item via it's ID e.g. 'li-0', 'li-1' etc
            var liID = 'li-' + i;

            // toggle item in array
            if (line.classed('legend-active')) {

                // toggle line
                line
                    .style('opacity', 1)
                    .classed('legend-active', false);
                // toggle legend item
                d3.select('#' + liID).style('opacity', 1);

            } else {

                // fade line
                line
                    .style('opacity', 0.2)
                    .classed('legend-active', true);
                // fade legend item
                d3.select('#' + liID).style('opacity', 0.2);
            }

        });


    d3.select('#legend-list')
            .call(legend);
    }

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  d3.select('#slider-text-items').text(months[items]);
  
  d3.select('#slider-items').call(d3.slider().value(items).min(0).max(11).on('slide', function(evt, value) {
      items = d3.round(value); // ensure whole number
      d3.select('#slider-text-items').text(months[items]); // update the text to show value
      temp(items);
      render(items); // update with new amount of items

  }));

  function temp(month){
    d3.csv("car_theft.csv", function(error, data) {
      data.forEach(function(d) {
        d.X = +d.X;
        d.Y = +d.Y;
        if(parseInt(d.Date.split("/")[0]) == (month+1)){
          return
        }
      });
    });
  }
    

})();