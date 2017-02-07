function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

function barChartOrdinal(container, dataFile) {
  const width = 960;
  const height = 500;

  const x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(.1);

  const y = d3.scaleLinear()
      .range([height, 0]);

  const chart = d3.select(container)
      .attr('width', width)
      .attr('height', height);

  d3.tsv(dataFile, type, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.value)]);

    const bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr('transform', d => `translate(${x(d.name)},0)`);

    bar.append('rect')
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .attr('width', x.bandwidth());

    bar.append('text')
        .attr('fill', '#fff')
        .attr('x', x.bandwidth() / 2)
        .attr('y', d => y(d.value) + 3)
        .attr('dy', '.75em')
        .text(d => d.value);
  });
}

export default barChartOrdinal;