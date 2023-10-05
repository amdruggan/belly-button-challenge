//Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data);
});

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// To do this will create a function called Bargraph that takes in a subject ID to generate the bar chart.

// This function creates a bar chart for a given subject ID
function BarGraph(subject) {

    // This reads in the data from the JSON file using D3
    d3.json(url).then((data) => {

        // This extracts the samples data from the JSON file
        const samples = data.samples;

        // This filters the samples data to only include the data for the given subject ID
        let resultArray = samples.filter(subjectSample => subjectSample.id == subject);
        let result = resultArray[0];

        // These variables are declared to be used for the charts
        let OTU_ids = result.otu_ids;
        let OTU_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // This creates the y-axis labels for the bar chart
        let yAxisTickLabels = OTU_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        // This creates the data for the bar chart
        const barChartData = [
            {
                y: yAxisTickLabels,
                x: sample_values.slice(0, 10).reverse(),
                text: OTU_labels.slice(0, 10).reverse(),
                type: "bar",
                orientation: "h",
            }
        ];

        // This stipulates formatting parameters for the bar chart
        const barChartFormatting = {
            title: "Top 10 OTUs for Individual",
            margin: { t: 30, l: 150 }
        };

        // This displays the bar chart        
        Plotly.newPlot("bar", barChartData, barChartFormatting);

    });
}

// Create a bubble chart that displays each sample.
// To do this will create a function called BubbleChart that takes in a subject ID to generate the bubble chart.

// This function creates a bubble chart for a given subject ID
function BubbleChart(subject) {

    // This reads in the data from the JSON file using D3
    d3.json(url).then((data) => {

        // This extracts the samples data from the JSON file
        const samples = data.samples;

        // This filters the samples data to only include the data for the given subject ID
        let resultArray = samples.filter(subjectSample => subjectSample.id == subject);
        let result = resultArray[0];

        // These variables are declared to be used for the charts
        let OTU_ids = result.otu_ids;
        let OTU_labels = result.otu_labels;
        let sample_values = result.sample_values;

        // This creates the data for the bubble chart
        const bubbleChartData = [
            {
                x: OTU_ids,
                y: sample_values,
                text: OTU_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: OTU_ids,
                }
            }
        ];

        // This stipulates formatting parameters for the bubble chart
        const bubbleChartFormatting = {
            title: "OTU ID",
            height: 600,
            width: 1000
        };

        // This displays the bubble chart
        Plotly.newPlot("bubble", bubbleChartData, bubbleChartFormatting);

    });
}

// Create a function that gets the sample metadata for a given subject ID
function MetaData(subject) {

    // This reads in the data from the JSON file using D3
    d3.json(url).then((data) => {

        // This extracts the metadata from the JSON file
        const metadata = data.metadata;

        // This filters the metadata to only include the data for the given subject ID
        let resultArray = metadata.filter(subjectMetadata => subjectMetadata.id == subject);
        let result = resultArray[0];

        // This selects the Demographic Info box
        let demographicInfo = d3.select("#sample-metadata");

        // This clears the Demographic Info box
        demographicInfo.html("");

        // This appends the metadata to the Demographic Info box
        Object.entries(result).forEach(([key, value]) => {
            demographicInfo.append("h5").text(`${key}: ${value}`);
        });

    });
}


// Create a function that gets the washing frequency for a given subject ID, then plots the washing frequency on a plot.ly gauge chart
function GaugeChart(subject) {

    // This reads in the data from the JSON file using D3 and creates a variable for number of washes
    d3.json(url).then((data) => {

        // This extracts the metadata from the JSON file
        const metadata = data.metadata;

        // This filters the metadata to only include the data for the given subject ID
        let resultArray = metadata.filter(subjectMetadata => subjectMetadata.id == subject);
        let result = resultArray[0];

        // This creates a variable for the number of washes
        let washes = result.wfreq;

        // Defining some custom green shades
        const customColors = [
         "#f0fff0", // Very faint green
        "#c1ffc1",
        "#92ff92",
        "#64ff64",
        "#35ff35",
        "#06ff06",
        "#00e600",
        "#00cc00",
        "#00b300" // Saturated jewel tone green
        ];

        // This adds the number of washes to the gauge chart and also inputs all the variables for the gauge chart parameters
        var GaugeData = [
            {
                // Type of gauge chart
                type: "indicator",

                // Included modes (gauge and number)
                mode: "gauge+number",

                // Sets the number of washes based on the subject ID (from the D3 read-in above)
                value: washes,

                // Sets the title of the gauge chart
                title: { text: "Belly Button Washing Frequency", font: { size: 24 } },

                // Sets the range of the gauge chart
                gauge: {
                    axis: { range: [null, 9], tickwidth: 1, tickcolor: "darkblue" },
                    bar: { color: "darkblue" },
                    bgcolor: "white",
                    borderwidth: 2,
                    bordercolor: "gray",
                    steps: [
                        { range: [0, 1], color: customColors[0] },
                        { range: [1, 2], color: customColors[1] },
                        { range: [2, 3], color: customColors[2] },
                        { range: [3, 4], color: customColors[3] },
                        { range: [4, 5], color: customColors[4] },
                        { range: [5, 6], color: customColors[5] },
                        { range: [6, 7], color: customColors[6] },
                        { range: [7, 8], color: customColors[7] },
                        { range: [8, 9], color: customColors[8] }
                    ],
                    threshold: {
                        line: { color: "red", width: 4 },
                        thickness: 0.5,
                        value: 9
                    }
                }
            }
        ];

        // This sets the formatting parameters for the gauge chart
        var GaugeLayout = {
            width: 500,
            height: 400,
            margin: { t: 25, r: 25, l: 25, b: 25 },
            font: { color: "darkblue", family: "Arial" }
        };

        // This displays the gauge chart
        Plotly.newPlot("gauge", GaugeData, GaugeLayout);
    });
}


// Create a function that updates all of the plots any time that a new sample is selected, calls on each function we have created
function ApplyGraphs(subject) {
    BarGraph(subject);
    BubbleChart(subject);
    MetaData(subject);
    GaugeChart(subject);
}

// Create a function that initializes the page with a default subject ID
function start() {

    // Selects an HTML element with the id "selDataset" using D3.js
    let dropdown = d3.select("#selDataset");

    // This reads in the data from the JSON file using D3
    d3.json(url).then((data) => {
        let subjectIDs = data.names;

        // This appends the subject IDs to the dropdown menu
        subjectIDs.forEach((subject) => {
            dropdown.append("option").text(subject).property("value", subject);
        });

        // Find first subjectID
        const firstSubject = subjectIDs[0];

        // Use the first subjectID to build the initial plots
        ApplyGraphs(firstSubject);

    });
}

// This updates the graphs with a new subject
function optionChanged(subject) {
    ApplyGraphs(subject);
}

// Start the page
start();