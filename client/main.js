// For demo purposes, load d3.js directly in the browser to reduce rollup build time.
// import * as d3 from "d3";

import barChart from './js/bar-chart.js';
import barChartExternalData from './js/bar-chart-external-data.js';

barChart('#bar-chart');
barChartExternalData('#bar-chart__external-data', 'bar-chart.tsv');

