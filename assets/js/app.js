// @TODO: YOUR CODE HERE!
// svg params
var svgHeight = window.innerHeight;
var svgWidth = window.innerWidth;



// margins
var margin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
    };


// chart area 
var chartHeight = svgHeight - margin.top - margin.bottom;
var chartWidth = svgWidth - margin.left - margin.right;



// create svg wrapper, append svg and set the width and height
var svg=d3
    .select("#scatter")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight);


// appends an svg group and sets the transform attribute

var graphGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

/// function for updateing x scale variable
function updateXScale(xData,curXAxis){
    var xLineraScale = d3.scaleLinear()
        .domain(d3.min(xData, d=> d[curXAxis]),d3.max(xData, d=> d[curXAxis]))
        .range([0,width]);

    return xLineraScale;      

}

updateXScale()




d3.csv("assets/data/data.csv").then(function(data){

    /// for now we're just opening the data and console logging it
    // console.log(data);

    console.log(data.find(x => x.abbr == "AL"));



});
