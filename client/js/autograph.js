function autoGraph(container, dataFile) {
  const chartWidth = 304;
  const chartHeight = 270;

  const margin = {
    top: 100,
    right: 48,
    bottom: 50,
    left: 1
  };

  const plotWidth = chartWidth - margin.left - margin.right;
  const plotHeight = chartHeight - margin.top - margin.bottom;

  const svg = d3.select(container)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`);

  const parseTime = d3.timeParse('%d-%b-%y');

  const x = d3.scaleTime()
      .rangeRound([0, width]);

  const y = d3.scaleLinear()
      .rangeRound([height, 0]);

  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close));

  d3.tsv(dataFile, (d) => {
    d.date = parseTime(d.date);
    d.close = +d.close;
    return d;
  }, (err, data) => {
    if (err) throw err;

    // x.domain(d3.extent(data, d => d.date));
    // y.domain(d3.extent(data, d => d.close));

    // g.append('g')
    //     .attr('transform', `translate(0,${height})`)
    //     .call(d3.axisBottom(x));

    // g.append('g')
    //     .call(d3.axisLeft(y))
    //   .append('text')
    //     .attr('fill', '#000')
    //     .attr('transform', 'rotate(-90)')
    //     .attr('y', 6)
    //     .attr('dy', '0.71em')
    //     .attr('text-anchor', 'end')
    //     .text('Price ($)');

    // g.append('path')
    //     .datum(data)
    //     .attr('fill', 'none')
    //     .attr('stroke', 'steelblue')
    //     .attr('stroke-linejoin', 'round')
    //     .attr('stroke-linecap', 'round')
    //     .attr('stroke-width', 1.5)
    //     .attr('d', line)
  });
}

export default autoGraph;