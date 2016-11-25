var margin={top:40, bottom:100, left:150, right:90},//set margin
  width=1000-margin.left-margin.right,
  height=600-margin.top-margin.bottom;

  var horizontal=d3.scaleBand().rangeRound([0,width]).padding(0.3),
  vertical=d3.scaleLinear().rangeRound([height,0]);

  var x = d3.scaleBand().rangeRound([0,width], 0.2,0.2);
  var	y = d3.scaleLinear().rangeRound([height, 0]); //set y axis position

  /*var	xAxis = d3.svg.axis().scale(x)
  .orient("bottom");

  var	yAxis = d3.svg.axis().scale(y)
  .orient("left");*/

  var	valueline = d3.line()
  .x(function(d) { return x(d.regions); })
  .y(function(d) { return y(d.Fat); });

  var	valueline2 = d3.line()
  .x(function(d) { return x(d.regions); })
  .y(function(d) { return y(d.Protien); });

  var	valueline3 = d3.line()

  .x(function(d) { return x(d.regions); })
  .y(function(d) { return y(d.carbohydrates ); });

  var	svg = d3.select("#multiline")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  d3.json("../js/json/Countries2.json", function(error, data) {
	data.forEach(function(d) { //get the data
		d.regions = d.regions;
		d.Fat = d.Fat;
		d.Protien = d.Protien;
	});

  x.domain(data.map(function(d){
    return d.regions;
  }));


  y.domain([0, d3.max(data, function(d) { console.log(d.Fat +"" + d.Protien+"" + d.carbohydrates) 
    return Math.max(d.Fat, d.Protien,d.carbohydrates);
  })]);

  svg.append("path")		
  .attr("class", "line")
  .style("stroke", "red")    
  .attr("d", valueline(data));
  svg.append("path")		
  .attr("class", "line")
		.style("stroke", "green")  //regions Vs Protien
		.attr("d", valueline2(data));
    svg.append("path")		
    .attr("class", "line")
      .style("stroke", "blue")   ////regions Vs carbohydrates
      .attr("d", valueline3(data));
      svg.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .append("text")
      .attr("transform", "translate(" + width + ",0)")
      .attr("dy","1.3em")
      .attr("dx","1.2em")
      .style("font-size","15px")
      .style("font-weight","bold")
      .style("color","red")
      .text("Regions");
      svg.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("dy","1em")
      .style("text-anchor", "end")
      .style("font-size","12px")
      .style("font-weight","bold")
      .text("Fat,Protien,carbohydrates  ");
      var text = svg.append("svg:text");
    });