function barChart(container) {
  const data = [4, 8, 15, 16, 23, 42];

  const width = 420;
  const barHeight = 20;

  const x = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .range([0, width]);

  const chart = d3.select(container)
    .attr('width', width)
    .attr('height', barHeight * data.length)

  var bar = chart.selectAll('g')
      .data(data)
    .enter().append('g')
      .attr('transform', (d, i) => {
        return "translate(0," + i * barHeight + ")";
      });
  console.log(bar.nodes());

  bar.append('rect')
      .attr('width', (d) => {
        return x(d);
      })
      .attr('height', barHeight - 1);

  bar.append("text")
      .attr('fill', '#fff')
      .attr('x', (d) => {
        return x(d) - 3;
      })
      .attr('y', barHeight / 2)
      .attr('dy', '.35em')
      .text(d => d);  
}

export default barChart;