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

  console.log(`plotWidth: ${plotWidth}`);
  console.log(`plotHeight: ${plotHeight}`);

  const svg = d3.select(container)
      .attr('xmlns', 'http://www.w3.org/2000/svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('viewBox', `0 0 ${chartWidth} ${chartHeight}`);

  const parseTime = d3.timeParse('%d-%b-%y');

  const x = d3.scaleTime()
      .rangeRound([0, plotWidth]);

  const y = d3.scaleLinear()
      .rangeRound([plotHeight, 0]);

// load data
  d3.json(dataFile, (err, data) => {
    if (err) throw err;
    console.log(data);

    const seriesKeys = _.map(data.y.series, 'key');
    console.log(seriesKeys);

// caculate domain
    if (!data.xDomain) {
      data.xDomain = d3.extent(data.data, d => new Date(d[data.x.series]));
    }

    console.log(data.xDomain);

    if (!data.yDomain) {
      data.yDomain = [];
      data.yDomain[0] = d3.min(data.data, (d) => {
        const values = seriesKeys.map(key => {
          return Math.floor(Number(d[key]));
        });
        return d3.min(values);
      });

      data.yDomain[1] = d3.max(data.data, (d) => {
        const values = seriesKeys.map(key => {
          return Math.ceil(Number(d[key]));
        });
        return d3.max(values);
      });
    }

    console.log(data.yDomain);

    x.domain(data.xDomain)
        .nice();
    y.domain(data.yDomain)
        .nice();

// add text
    svg.append('text')
        .classed('chart-title', true)
        .attr('dominant-baseline', 'hanging')
        .attr('y', 2)
        .attr('font-size', 20)
        .attr('fill', '#43423e')
        .text(data.title);

    svg.append('text')
        .classed('chart-subtitle', true)
        .attr('dominant-baseline', 'hanging')
        .attr('y', 22)
        .attr('font-size', 15)
        .attr('fill', '#43423e')
        .text(data.subtitle);

    svg.append('text')
        .classed('chart-source', true)
        .attr('y', chartHeight - 5)
        .attr('font-size', 10)
        .attr('fill-opacity', 0.4)
        .text('来源: ' + data.source + '. ' + data.updated);

    const container = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

// add axis
    const xAxis = d3.axisBottom(x)
      .ticks(5)
      .tickSizeOuter(0);

    const yAxis = d3.axisLeft(y)
      .ticks(4)
      .tickSize(plotWidth);

    container.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0,${plotHeight})`)
        .call(xAxis);

    container.append('g')
        .attr('class', 'y axis')
        .attr('transform', `translate(${plotWidth},0)`)
        .call(yAxis);

// add path
    const linesContainer = container.append('g');
    
    seriesKeys.slice(0).reverse().forEach((key, i) => {
      const line = d3.line()
          .defined(d => d[key] != null && !isNaN(d[key]))
          .x(d => x(new Date(d.date)))
          .y(d => y(d[key]));

      linesContainer.append('path')
          .attr('d', line(data.data))
          .attr('fill', 'none')
          .attr('stroke', 'steelblue')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('stroke-width', 1.5);
    });

  });
}

export default autoGraph;