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

var chosenYAxis = "obesity";

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
        .domain([d3.min(xData, d=> d[curXAxis]),d3.max(xData, d=> d[curXAxis])])
        .range([0,chartWidth]);
    return xLineraScale;      

}

/// fucntion for updating y scale variable
function updateYScale(yData,curYaxis){
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(yData, d=> d[curYaxis]),d3.max(yData, d=> d[curYaxis])])
        .range([chartHeight,0]);

    // var yLinearScale = d3.scaleLinear()
    //     .domain([d3.min(yData, d=> d[curYaxis]),d3.max(yData, d=> d[curYaxis])])
    //     .range([0,chartHeight]);
        
        
    return yLinearScale;
}




// function for updating xAxis when click
function makeXAx(xScale,xAxis){
    var bottomAx = d3.axisBottom(xScale);
    xAxis.transition().duration(1000).call(bottomAx);
    return xAxis;
}

// function for updating the y axis when clicked
function makeYAx(yScale,yAxis){
    var leftAx = d3.axisLeft(yScale);
    yAxis.transition()
        .duration(1000)
        .call(leftAx);
    return yAxis;
}

//// funciton that appends circle to the graph, might need to change this so the circles can be updated, maybe use the .exit().remove() functions
function appCircle(data,chosenXAxis,chosenYAxis,xLinearScale,yLinearScale){
    var circlesGroup=graphGroup.selectAll('circle')
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", x => xLinearScale(x[chosenXAxis]))
    .attr("cy", y => yLinearScale(y[chosenYAxis]))
    .attr("r", 20)
    .attr("fill", "pink")
    .attr("opacity", ".75");

    return circlesGroup;
}


//// function used for updating circles with new tooltip
function updateToolTip(chosenXAxis,chosenYAxis,circlesGroup){

    var toolTip = d3.tip()
        .attr("class", "tooltip")
        .offset([80, -60])
        .html(function(d) {
        return (`x axis:${d[chosenXAxis]}<br> y axis:${d[chosenYAxis]}`);
    });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
      toolTip.show(data);
    })
      // onmouseout event
      .on("mouseout", function(data) {
        toolTip.hide(data);
      });
  
    return circlesGroup;

}


d3.csv("assets/data/data.csv").then(function(data){

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
    //// use the function updateXScale function to define yLinearScale
    var yLinearScale=updateYScale(data,chosenYAxis);

    // Create initial axis functions
    var bottomAxis  = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);


    //// appending y axis
    var yAxisG=graphGroup.append("g")
        .classed('y-axis',true)
        .call(leftAxis);
 

    //// appending x axis 
    var xAxisG=graphGroup.append("g") 
        .classed('x-axis',true)
        .attr('transform',`translate(0,${chartHeight})`)
        .call(bottomAxis);

    // use the appCircle function to append the inital circles to the graph
    var circlesGroup = appCircle(data,chosenXAxis,chosenYAxis,xLinearScale,yLinearScale);


    // Create group for x-axis labels
    var xLabelsGroup = graphGroup.append("g")
        .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

    /// x axis label for poverty
    var xPovertyLabel=xLabelsGroup.append("text")
        .attr("x",0)
        .attr("y", 20)
        .attr("value","poverty")
        .classed("active",false)
        .text("Poverty(%)");


    // x axis lavel for age
    var xAgeLabel=xLabelsGroup.append("text")
        .attr("x",-100)
        .attr("y", 20)
        .attr("value","age")
        .classed("inactive",true)
        .text("Age(Median)");


    // x axis label for income
    var xIncomeLabel=xLabelsGroup.append("text")
        .attr("x",150)
        .attr("y", 20)
        .attr("value","income")
        .classed("inactive",true)
        .text("Income (Median)");



    //// creating the group for the y labels
    var yLabelsGroup = graphGroup.append("g")
        .attr("transform", "rotate(-90)");
    


    /// y axis label for obesity
    var yObesityLabel = yLabelsGroup.append("text") 
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("value","obesity")
        .classed("active", true)
        .text("Obesity(%)");

    /// y axis label for smokes
    var ySmokesLabel = yLabelsGroup.append("text") 
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2) + 150)
        .attr("dy", "1em")
        .attr("value","smokes")
        .classed("inactive", true)
        .text("Smokes(%)");

    /// y axis label for Healthcare
    var yHealthcareLabel = yLabelsGroup.append("text") 
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (chartHeight / 2) - 150)
        .attr("dy", "1em")
        .attr('value','healthcare')
        .classed("inactive", true)
        .text("Healthcare");

    


    /// update ToolTip function above csv import
    var circlesGroup=updateToolTip(chosenXAxis,chosenYAxis,circlesGroup);
    
    // console.log(yLabelsGroup);

    /// event listener for y axis
    yLabelsGroup.selectAll("text").on('click',function(){
        // grabs the value that was selected

        var selectedVal = d3.select(this).attr('value');

        // console.log(d3.select(this));
        // if a new value was selected
        if (selectedVal!==chosenYAxis){
            //redefines the chosen y axis
            chosenYAxis = selectedVal;

            //// use the function updatexScale function to define xLinearScale
            var xLinearScale=updateXScale(data,chosenXAxis);
            
            //// use the function updateYScale function to define yLinearScale
            var yLinearScale=updateYScale(data,chosenYAxis);

            /// updates y axis with transistion
            var yAxis=makeYAx(yLinearScale,yAxisG)

            /// updates x  axis with transition
            var xAxis=makeXAx(xLinearScale,xAxisG);

            /// removes the circles
            d3.selectAll("circle").remove();
            
            //// updates circles with new values
            circlesGroup = appCircle(data,chosenXAxis,chosenYAxis,xLinearScale,yLinearScale);

            //// updates tooltips
            circlesGroup = updateToolTip(chosenXAxis,chosenYAxis,circlesGroup);


            /// if statement that make the selected item  bold
            if (chosenYAxis == 'obesity'){
                yObesityLabel.classed("active", true).classed("inactive", false);
                ySmokesLabel.classed("active", false).classed("inactive", true);
                yHealthcareLabel.classed("active", false).classed("inactive", true);
            }
            else if (chosenYAxis == 'smokes'){
                yObesityLabel.classed("active", false).classed("inactive", true);  
                ySmokesLabel.classed("active", true).classed("inactive", false);
                yHealthcareLabel.classed("active", false).classed("inactive", true);                
            }
            else if (chosenYAxis == 'healthcare') {
                yObesityLabel.classed("active", false).classed("inactive", true);  
                ySmokesLabel.classed("active", false).classed("inactive", true);  
                yHealthcareLabel.classed("active", true).classed("inactive", false);  
            }







        };






    });




    /// event listener for x axis
    xLabelsGroup.selectAll("text").on('click',function(){
        // alert("you clicked the x axis");


        // grabs the value that was selected
        var selectedVal = d3.select(this).attr('value');

        console.log(selectedVal);
        /// if this is a new selection
        if (selectedVal!==chosenXAxis){
            // redefine the chosenXAxis variable
            chosenXAxis = selectedVal;
            // alert('you made a new selection');


            //// use the function updatexScale function to define xLinearScale
            var xLinearScale=updateXScale(data,chosenXAxis);
            
            //// use the function updateYScale function to define yLinearScale
            var yLinearScale=updateYScale(data,chosenYAxis);

            /// updates y axis with transistion
            var yAxis=makeYAx(yLinearScale,yAxisG)

            /// updates x  axis with transition
            var xAxis=makeXAx(xLinearScale,xAxisG);

            /// removes the circles
            d3.selectAll("circle").remove();

            //// updates circles with new values
            circlesGroup = appCircle(data,chosenXAxis,chosenYAxis,xLinearScale,yLinearScale);
            
            //// updates tooltips
            circlesGroup = updateToolTip(chosenXAxis,chosenYAxis,circlesGroup);

            if (chosenXAxis == 'poverty'){
                xPovertyLabel.classed("active", true).classed("inactive", false);
                xAgeLabel.classed("active", false).classed("inactive", true);
                xIncomeLabel.classed("active", false).classed("inactive", true);
            }
            else if (chosenXAxis == 'age'){
                xPovertyLabel.classed("active", false).classed("inactive", true);  
                xAgeLabel.classed("active", true).classed("inactive", false);
                xIncomeLabel.classed("active", false).classed("inactive", true);                
            }
            else if (chosenXAxis =='income'){
                xPovertyLabel.classed("active", false).classed("inactive", true);  
                xAgeLabel.classed("active", false).classed("inactive", true);  
                xIncomeLabel.classed("active", true).classed("inactive", false);  
            }






        };


    });





    


    






}).catch(function(error) {
    console.log(error);
  });



