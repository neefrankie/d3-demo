function type(d) {
  d.value = +d.value;
  return d;
}

function barChartVertical(container, dataFile) {
  const width = 960;
  const height = 500;

  const y = d3.scaleLinear().range([height, 0]);
  // const y = d3.scaleLinear().range([0, height]);

  const chart = d3.select(container)
    .attr('width', width)
    .attr('height', height);

  d3.tsv(dataFile, type, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    y.domain([0, d3.max(data, d => d.value)]);

    const barWidth = width / data.length;

    const bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('transform', (d, i) => `translate(${i * barWidth},0)`);

    bar.append('rect')
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        // .attr('y', d => height - y(d.value))
        // .attr('height', d => y(d.value))
        .attr('width', barWidth - 1);

    bar.append('text')
        .attr('fill', '#fff')
        .attr('x', barWidth / 2)
        .attr('y', d => y(d.value) + 3)
        // .attr('y', d => height - y(d.value) + 3)
        .attr('dy', '.75em')
        .text(d => d.value);
  });
}

export default barChartVertical;