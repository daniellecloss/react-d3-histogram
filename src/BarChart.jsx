import React from 'react';
import * as d3 from "d3";
import ChartAxis from './ChartAxis';

const BarChart = ({ width, height, data }) => {
    // chart margins and measurements
    const chartMargin = { top: 0, right: 5, bottom: 5, left: 5 };
    const calculatedWidth = width - (chartMargin.left + chartMargin.right);
    const calculatedHeight = height - (chartMargin.top + chartMargin.bottom);

    // transform used for bars
    const transform = 'translate(' + chartMargin.left + ',' + chartMargin.top + ')';

    const cssPadding = {paddingLeft: 35, paddingBottom: 40, paddingTop: 25};

    // axis transforms
    const axisLabelPadding = 10;
    const axisTransform = transform;
    const bottomAxisTransform = 'translate(' + chartMargin.left + ',' + (chartMargin.top + height) + ')';
    const labelAxisTransform = 'translate(' + (-cssPadding.paddingLeft) + (chartMargin.top - axisLabelPadding) + ')';
    const labelBottomAxisTransform = 'translate(' + ((width / 2) - cssPadding.paddingLeft) + ',' + (chartMargin.top + height + cssPadding.paddingLeft) + ')';

    if (data.length > 0) {
      // The DOM manipulations (here in this render) are handled by React (virtual DOM);
      // React handles the data, and feeds the data to the react data
      // visualization elements, and D3 is doing the rest (xScale and yScale)
      const xScale = d3
        .scaleBand()
        .domain(data.map(function(d) {return d.alert_gid}))
        .rangeRound([0, calculatedWidth], .35);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, function(d) { return d.size; })])
        .rangeRound([calculatedHeight, 0]);

      // This is the sub-component that contains the bars for the bar graph
      const bars = (data).map(function(d, i) {
        return (
          <rect
            fill = "#006699"
            stroke = "#000000"
            strokeWidth = "1"
            key = {i}
            x = {xScale(d.alert_gid)}
            y = {yScale(d.size)}
            className = "bar"
            height = {calculatedHeight - yScale(d.size)}
            width = {(xScale.range()[1] / data.length)}
          />
        )
      });

      // This is the main bar chart component, containing the sub-components above
      // The ChartAxis component (in the return below) is contained in another component file,
      // and it has one DOM manipulation done by D3
      return (
        <div className = "bar_chart_container">
          <svg
            id = 'bar_chart'
            width = {calculatedWidth}
            height = {calculatedHeight}
            style = {cssPadding}
          >
            <g transform = {transform}>
              {bars}
            </g>

            <ChartAxis
              orient = 'y'
              scale = {yScale}
              translate = {axisTransform}
              label = "Size (bps)"
              labelTranslate = {labelAxisTransform}
            />

            <ChartAxis
              orient = 'x'
              scale = {xScale}
              translate = {bottomAxisTransform}
              label = "Alert GID"
              labelTranslate = {labelBottomAxisTransform}
            />

          </svg>
        </div>
      );
    } else {
      // This is an early return, to account for no data in the data array (the data array
      // that that was passed into the BarChart component)
      return (<div className = "bar_chart_container">No Data to Display</div>);
    }
  }


export default BarChart;
