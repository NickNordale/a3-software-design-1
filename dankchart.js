var DankChart = function() {
	var width = 550,
		height = 350,
		margin = {
			top: 50,
			right: 30,
			bottom: 90,
			left: 60
		},
		xLabel = 'X',
		yLabel = 'Y',
		title = "chart";

	var xScale = d3.scaleBand(),
		yScale = d3.scaleLinear(),
		colorScale = d3.scaleOrdinal(d3.schemeCategory10),
		domain = [];

	var tip = d3.tip().attr('class', 'd3-tip');


	// constructor
	// 	selection: a d3 selection, can be multiple elements
	var chart = function(selection) {
		var drawHeight = height - margin.bottom - margin.top;
		var drawWidth = width - margin.left - margin.right;

		selection.each(function(data) {
			var data = data.values;

			var el = d3.select(this);
			var container = el.selectAll("svg").data([data]);

			var svg = container.enter().append('svg')
				.attr('width', width)
				.attr('height', height);

			// svg.append('text')
   //              .attr('transform', 'translate(' + (margin.left + drawWidth / 2) + ',' + 20 + ')')
   //              .text(title)
   //              .attr('class', 'chart-title');

			var g = svg.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
				.attr('width', drawWidth)
				.attr('height', drawHeight)
				.attr('class', 'draw-space');

			g.call(tip);

			var xAxisLabel = svg.append('g')
				.attr('transform', 'translate(' + margin.left + ',' + (drawHeight + margin.top) + ')')
            	.attr('class', 'axis x');

        	var xAxisText = svg.append('text')
        		.attr('transform', 'translate(' + (margin.left + drawWidth / 2) + ',' + (margin.top + drawHeight + margin.bottom) + ')')
        		.attr('class', 'title')
        		.text(xLabel);

        	var yAxisLabel = svg.append('g')
        		.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        		.attr('class', 'axis y');

        	var xAxisText = svg.append('text')
        		.attr('transform', 'translate(' + (margin.left + drawWidth / 2) + ',' + (margin.top + drawHeight) + ')')
        		.attr('transform', 'translate(' + (margin.left - 40) + ',' + (margin.top + drawHeight / 2) + ') rotate(-90)')
        		.text(yLabel);

    		var xAxis = d3.axisBottom();
    		var yAxis = d3.axisLeft().tickFormat(d3.format('.2s'));

    		//console.log('data', data);
    		//var domain = data.map(function(d) {return d.x; });
            xScale.range([0, drawWidth]).padding(0.2).domain(domain);

            var yMax = d3.max(data, (d) => +d.y) * 1.15;
            var yMin = d3.min(data, (d) => +d.y) * .85;
            yScale.range([drawHeight, 0]).domain([yMin, yMax]);



            xAxis.scale(xScale);
            yAxis.scale(yScale);

            xAxisLabel.transition().duration(1000).call(xAxis);
            yAxisLabel.transition().duration(1000).call(yAxis);

            el.select('.title.x').text(xLabel);
            el.select('.title.y').text(yLabel);

            var bars = el.select('.draw-space').selectAll('rect').data(data);

            bars.enter().append('rect')
            	.merge(bars)
                .attr('class', '.bar')
                .attr('x', (d) => xScale(d.x))
                .attr('y', (d) => yScale(d.y))
                .attr('width', xScale.bandwidth())
                .attr('height', (d) => (drawHeight - yScale(d.y)))
                .attr('fill', (d) => colorScale(d.color))
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

            bars.exit().remove();

            xAxisLabel.selectAll('text')
                .attr("y", 15)
                .attr('transform', 'rotate(45) translate(10,-2)')
                //.attr("dy", ".35em")
                .style("text-anchor", "start");
		});
	}

	// sets or gets the width of the entire chart
	chart.width = function(val) {
		if(!arguments.length) return width;
		width = val;
		return chart;
	}

	// sets or gets the height of the entire chart
	chart.height = function(val) {
		if(!arguments.length) return height;
		height = val;
		return chart;
	}

	// sets or gets the margin of the entire chart
	// the supplied argument must be an object with the appropriate properties, else
	// 		throws an error
	chart.margin = function(val) {
		if(!arguments.length) return margin;
		val.hasOwnProperty('top')
			&& val.hasOwnProperty('right')
			&& val.hasOwnProperty('bottom')
			&& val.hasOwnProperty('left') 
		? margin = val : console.error('Object has incorrect properties: You must supply an object top, left, bottom, right');
		return chart;
	}

	chart.domain = function(val) {
		if(!arguments.length) return domain;
		if( Object.prototype.toString.call( val ) !== '[object Array]' ) {
    		console.error('Error: domain input must be an array');
		}

		domain = val;
		return chart;
	}
	chart.color = function(val1, val2) {
		if(!arguments.length) return colorScale;
		if(arguments.length != 2) console.error('Incorrect number of params: Must supply both a color domain and a range');
		if( Object.prototype.toString.call( val1 ) !== '[object Array]' || Object.prototype.toString.call( val2 ) !== '[object Array]' ) {
    		console.error('Error: domain input must be an array');
		}
		colorScale.domain(val1);
		colorScale.range(val2);
		return chart;
	}

	chart.colorDomain = function(val) {
		if(!arguments.length) return colorScale.domain();
		if( Object.prototype.toString.call( val ) !== '[object Array]' ) {
    		console.error('Error: domain input must be an array');
		}
		colorScale.domain(val);
		return chart;
	}

	chart.colorRange = function(val) {
		if(!arguments.length) return colorScale.range();
		if( Object.prototype.toString.call( val ) !== '[object Array]' ) {
    		console.error('Error: range input must be an array');
		}
		colorScale.range(val);
		return chart;
	}

	chart.xLabel = function(val) {
		if(!arguments.length) return xLabel;
		xLabel = val;
		return chart;
	}

	chart.yLabel = function(val) {
		if(!arguments.length) return yLabel;
		yLabel = val;
		return chart;
	}

	chart.tipText = function(val) {
		if(!arguments.length) return tip.html();
		if( Object.prototype.toString.call( val ) !== '[object Function]') {
			console.error('Error: input parameter must be a function');
		}
		tip.html(val);
		return chart;
	}

	return chart;
}