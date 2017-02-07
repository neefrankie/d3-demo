function type(d) {
  d.value = +d.value;
  return d;
}

function barCharExternalData(container, dataFile) {
  const width = 420;
  const barHeight = 20;

  const x = d3.scaleLinear()
    .range([0, width]);

  const chart = d3.select(container)
    .attr('width', width);

  d3.tsv('bar-chart.tsv', type, (err, data) => {

    if (err) {
      console.log(err);
      return;
    }
    console.log(data);

    x.domain([0, d3.max(data, d => d.value)]);
    chart.attr('height', barHeight * data.length);

    const bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('transform', (d, i) => {
          return `translate(0,${i * barHeight})`;
        });

    bar.append('rect')
        .attr('width', d => x(d.value))
        .attr('height', barHeight - 1);

    bar.append('text')
        .attr('fill', '#fff')
        .attr('x', d => x(d.value) - 3)
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(d => d.value);
  });
}

export default barCharExternalData;