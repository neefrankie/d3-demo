// For demo purposes, load d3.js directly in the browser to reduce rollup build time.
// import * as d3 from "d3";

import barChart from './js/bar-chart.js';
import barChartExternalData from './js/bar-chart-external-data.js';
import barchartVertical from './js/bar-chart-vertical.js';
import barChartOrdinal from './js/bar-chart-ordinal.js';
import barChartAxis from './js/bar-chart-axis.js';
import lineChart from './js/line-chart.js';
import autoGraph from './js/autograph.js';

barChart('#bar-chart');
barChartExternalData('#bar-chart__external-data', 'bar-chart.tsv');
barchartVertical('#bar-chart__vertical', 'bar-chart.tsv');
barChartOrdinal('#bar-chart__ordinal', 'bar-chart.tsv');
barChartAxis('#bar-chart__axis', 'bar-chart.tsv');
lineChart('#line-chart', 'apple-stock.tsv');
autoGraph('#uk-gdp-growth', 'uk-gdp-growth.json');
autoGraph('#china-bound-yields', 'china-bound-yields-and-spread.json');

console.log(document.defaultView);