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


/// initial y and x axis

var chosenXAxis = "poverty";

var chsenYAxis = "obesity";

// create svg wrapper, append svg and set the width and height
var svg=d3
    .select("#scatter")
    .append("svg")
    .attr("width",svgWidth)
    .attr("height",svgHeight);


// appends an svg group and sets the transform attribute

var graphGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);




/// function for updating x scale variable
function updateXScale(xData,curXAxis){
    var xLineraScale = d3.scaleLinear()
        .domain(d3.min(xData, d=> d[curXAxis]),d3.max(xData, d=> d[curXAxis]))
        .range([0,chartWidth]);
    return xLineraScale;      

}

/// fucntion for updating y scale variable
function updateYScale(yData,curYaxis){
    var yLinearScale = d3.scaleLinear()
        .domain(d3.min(yData, d=> d[curYaxis]),d3.max(yData, d=> d[curYaxis]))
        .range([0,chartWidth]);  
    return yLinearScale;
}




// function for updating xAxis when click
function makeXAx(xScale,xAxis){
    var bottomAx = d3.axisBottom(xScale);
    xAxis.transition()
        .duration(1000)
        .call(bottomAx);
    return xAxis;
}

// function for updating the y axis
function makeYAx(yScale,yAxis){
    var leftAx = d3.axisLeft(yScale);
        yAxis.transition()
        .duration(1000)
        .call(leftAx);
    return yAxis;
}







d3.csv("assets/data/data.csv").then(function(data){

    /// for now we're just opening the data and console logging it
    // console.log(data);
    // console.log(data.find(x => x.abbr == "AL"));



    /// parse data, turning it into float
    data.forEach(function(rowdata){

        rowdata.poverty = parseFloat(rowdata.poverty);
        rowdata.age=parseFloat(rowdata.age);
        rowdata.income=parseFloat(rowdata.income);
        rowdata.healthcare=parseFloat(rowdata.healthcare);
        rowdata.obesity=parseFloat(rowdata.obesity);
        rowdata.smokes=parseFloat(rowdata.smokes);
    });



    //// use the function updateXScale function to define xLinearScale
    var xLinearScale=updateXScale(data,chosenXAxis);

    var yLinearScale=updateYScale(data,chosenyAxis);







    // // append x axis
    // var xAxis = graphGroup.append("g")
    // .classed("x-axis", true)
    // .attr("transform", `translate(0, ${chartHeight})`)
    // .call(bottomAxis);


    // var chosenXAxis = "age";

    // var xLinearScale=updateXScale(data,chosenXAxis);




});