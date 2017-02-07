function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

function barChartAxis(container, dataFile) {
  const width = 960;
  const height = 500;
  const margin = {
    top: 20,
    right: 30,
    bottom: 30,
    left: 40
  };

  const x = d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(.1);

  const y = d3.scaleLinear()
      .range([height, 0]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y)
      .ticks(10, '%');

  const chart = d3.select(container)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

  d3.tsv(dataFile, type, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    x.domain(data.map(d => d.name));
    y.domain([0, d3.max(data, d => d.value)]);

    chart.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

    chart.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
// Not working?        
      .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text("Frequency");

    const bar = chart.selectAll('.bar')
        .data(data)
      .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('height', d => height - y(d.value))
        .attr('width', x.bandwidth());
  });
}

export default barChartAxis;