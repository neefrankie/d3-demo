(function () {
'use strict';

function barChart(container) {
  const data = [4, 8, 15, 16, 23, 42];

  const width = 420;
  const barHeight = 20;

  const x = d3.scaleLinear().domain([0, d3.max(data)]).range([0, width]);

  const chart = d3.select(container).attr('width', width).attr('height', barHeight * data.length);

  var bar = chart.selectAll('g').data(data).enter().append('g').attr('transform', (d, i) => {
    return "translate(0," + i * barHeight + ")";
  });

  bar.append('rect').attr('width', d => {
    return x(d);
  }).attr('height', barHeight - 1);

  bar.append("text").attr('x', d => {
    return x(d) - 3;
  }).attr('y', barHeight / 2).attr('dy', '.35em').text(d => d);
}

function type(d) {
  d.value = +d.value;
  return d;
}

function barCharExternalData$1(container, dataFile) {
  const width = 420;
  const barHeight = 20;

  const x = d3.scaleLinear().range([0, width]);

  const chart = d3.select(container).attr('width', width);

  d3.tsv('bar-chart.tsv', type, (err, data) => {

    if (err) {
      console.log(err);
      return;
    }
    console.log(data);

    x.domain([0, d3.max(data, d => d.value)]);
    chart.attr('height', barHeight * data.length);

    const bar = chart.selectAll('g').data(data).enter().append('g').attr('tranform', (d, i) => {
      return `translate(0, ${ i * barHeight })`;
    });

    bar.append('rect').attr('width', d => x(d.value)).attr('height', barHeight - 1);

    bar.append('text').attr('x', d => x(d.value) - 3).attr('y', barHeight / 2).attr('dy', '.35em').text(d => d.value);
  });
}

// For demo purposes, load d3.js directly in the browser to reduce rollup build time.
// import * as d3 from "d3";

barChart('#bar-chart');
barCharExternalData$1('#bar-chart__external-data', 'bar-chart.tsv');

}());
//# sourceMappingURL=main.js.map
