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