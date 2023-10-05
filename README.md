# Belly Button Biodiversity Interactive Dashboard

In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Static App Deployment to Pages:

If you want to see the app created in this repository, please visit the following GitHub Pages link: https://amdruggan.github.io/belly-button-challenge/

## Getting Started

To get started with this interactive dashboard, you'll need to include the following JavaScript code in your project:

```javascript
// Use the D3 library to read in samples.json from the URL provided
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

d3.json(url).then(function(data) {
    console.log(data);
});

// ... (rest of your JavaScript code)
```

### Prerequisites

Make sure you have the D3 library included in your project to read data from the provided URL.

### Installing

No installation is required for this project. You can simply clone this repository and open the HTML file in your browser.

## Features

This interactive dashboard provides the following features:

### 1. Bar Chart

- Display the top 10 OTUs (Operational Taxonomic Units) found in an individual's navel using a horizontal bar chart.
- Use a dropdown menu to select the subject (individual) for which you want to view the data.
- The bar chart shows the OTU ID, sample values, and OTU labels.

### 2. Bubble Chart

- Display a bubble chart for the selected subject to visualize the distribution of OTUs.
- The size of each bubble represents the sample values, and the color represents the OTU IDs.
- The X and Y axes display the OTU IDs and sample values.

### 3. Metadata

- Display demographic information for the selected subject.
- The information is shown in a box with the ID "sample-metadata."

### 4. Gauge Chart

- Show the washing frequency for the selected subject on a gauge chart.
- The gauge chart provides a visual representation of the washing frequency.

### 5. Updating Plots

- All plots update automatically whenever a new subject is selected from the dropdown menu.
- The `ApplyGraphs` function is responsible for updating all the plots with the selected subject's data.

## Usage

To use this interactive dashboard:

1. Clone this GitHub repository to your local machine.
2. Open the HTML file in your preferred web browser.
3. Use the dropdown menu to select the subject (individual) for which you want to view the data.
4. Explore the bar chart, bubble chart, metadata, and gauge chart for the selected subject.

## Built With

- JavaScript
- D3.js
- Plotly.js

## Authors

- Alec Druggan