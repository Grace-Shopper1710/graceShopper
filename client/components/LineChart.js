import React from 'react'
import ReactDOM from 'react-dom'
import * as d3 from 'd3'
import PropTypes from 'prop-types'
//import { LineChart } from 'rd3'

class Axis extends React.Component {
    componentDidUpdate () { this.renderAxis(); }
    componentDidMount () { this.renderAxis(); }
    renderAxis () {
        var node = ReactDOM.findDOMNode(this);
        d3.select(node).call(this.props.axis);

    }
    render () {

        var translate = 'translate(0,"+(this.props.h)+")';

        return (
            <g className="axis" transform={this.props.axisType=='x'?translate:""} >
            </g>
        );
    }

}

class Grid extends React.Component {
  

    componentDidUpdate () { this.renderGrid() }
    componentDidMount () { this.renderGrid() }
    renderGrid() {
        var node = ReactDOM.findDOMNode(this)
        d3.select(node).call(this.props.grid)
    }
    render () {
        var translate = "translate(0,"+(this.props.h)+")"
        return (
            <g className="y-grid" transform={this.props.gridType === 'x' ? translate : ""} />
        )
    }
}

class ToolTip extends React.Component {
    
    render () {

        var visibility="hidden";
        var transform="";
        var x=0;
        var y=0;
        var width=150,height=70;
        var transformText='translate('+width/2+','+(height/2-5)+')';
        var transformArrow="";

        if(this.props.tooltip.display==true){
            var position = this.props.tooltip.pos;

            x= position.x;
            y= position.y;
            visibility="visible";

            //console.log(x,y);

            if(y>height){
                transform='translate(' + (x-width/2) + ',' + (y-height-20) + ')';
                transformArrow='translate('+(width/2-20)+','+(height-2)+')';
            }else if(y<height){

                transform='translate(' + (x-width/2) + ',' + (Math.round(y)+20) + ')';
                transformArrow='translate('+(width/2-20)+','+0+') rotate(180,20,0)';
            }



        }else{
            visibility="hidden"
        }

        return (
            <g transform={transform}>
                <rect className="shadow" width={width} height={height} rx="5" ry="5" visibility={visibility} fill="#6391da" opacity=".9"/>
                <polygon className="shadow" points="10,0  30,0  20,10" transform={transformArrow}
                         fill="#6391da" opacity=".9" visibility={visibility}/>
                <text visibility={visibility} transform={transformText}>
                    <tspan x="0" textAnchor="middle" fontSize="15px" fill="#ffffff">{this.props.tooltip.data.key}</tspan>
                    <tspan x="0" textAnchor="middle" dy="25" fontSize="20px" fill="#a9f3ff">{this.props.tooltip.data.value+" visits"}</tspan>
                </text>
            </g>
        )
    }
}

class Dots extends React.Component {
    
    render () {

        var _self=this;

        //remove last & first point
        var data=this.props.data.splice(1);
        data.pop();

        var circles=data.map(function(d,i){

            return (<circle className="dot" r="7" cx={_self.props.x(d.date)} cy={_self.props.y(d.count)} fill="#7dc7f4"
                            stroke="#3f5175" strokeWidth="5px" key={i}
                            onMouseOver={_self.props.showToolTip} onMouseOut={_self.props.hideToolTip}
                            data-key={d3.time.format("%b %e")(d.date)} data-value={d.count}/>)
        });

        return(
            <g>
                {circles}
            </g>
        );
    }
}


class LineChart extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            tooltip:{ display:false,data:{key:'',value:''}},
            width:0
      }
      this.setState = this.setState.bind(this)
    }

    componentWillMount() {
    }

    componentWillReceiveProps(nextProps) {
    }

    showToolTip (e) {
        e.target.setAttribute('fill', '#FFFFFF');

        this.setState({tooltip:{
            display:true,
            data: {
                key:e.target.getAttribute('data-key'),
                value:e.target.getAttribute('data-value')
                },
            pos:{
                x:e.target.getAttribute('cx'),
                y:e.target.getAttribute('cy')
            }

            }
        });
    }

    hideToolTip (e) {
        e.target.setAttribute('fill', '#7dc7f4');
        this.setState({tooltip:{ display:false,data:{key:'',value:''}}});
    }

    render() {
        let data=[
            {day:'02-11-2016',count:180},
            {day:'02-12-2016',count:250},
            {day:'02-13-2016',count:150},
            {day:'02-14-2016',count:496},
            {day:'02-15-2016',count:140},
            {day:'02-16-2016',count:380},
            {day:'02-17-2016',count:100},
            {day:'02-18-2016',count:150}
        ];

        let margin = {top: 5, right: 50, bottom: 20, left: 50},
            w = this.props.width - (margin.left + margin.right),
            h = this.props.height - (margin.top + margin.bottom);

        let parseDate = d3.time.format("%m-%d-%Y").parse
        data.forEach(function (d) {
            d.date = parseDate(d.day);
        });

         var x = d3.time.scale()
            .domain(d3.extent(data, function (d) {
                return d.date;
            }))
            .rangeRound([0, w]);

        var y = d3.scale.linear()
            .domain([0,d3.max(data,function(d){
                return d.count+100;
            })])
            .range([h, 0]);

        var line = d3.svg.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            }).interpolate("cardinal");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .tickValues(data.map(function(d,i){
                if(i>0)
                    return d.date;
            }).splice(1))
            .ticks(4);

        var xGrid = d3.svg.axis()
            .scale(x)
            .orient('bottom')
            .ticks(5)
            .tickSize(-h, 0, 0)
            .tickFormat("");


        var yGrid = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(5)
            .tickSize(-w, 0, 0)
            .tickFormat("");

        let transform = 'translate(' + margin.left + ',' + margin.top + ')';
        return (
            <div>
                <svg id={this.props.chartId} width={this.props.width} height={this.props.height}>

                    <g transform={transform}>

                        <Grid h={h} grid={yGrid} gridType="y"/>
                        <Grid h={h} grid={xGrid} gridType="x"/> 

                        <Axis h={h} axis={yAxis} axisType="y" />
                        <Axis h={h} axis={xAxis} axisType="x"/>

                        <path className="line shadow" d={line(data)} strokeLinecap="round"/>

                        <Dots data={data} x={x} y={y} showToolTip={this.showToolTip} hideToolTip={this.hideToolTip}/>

                        <ToolTip tooltip={this.state.tooltip}/>
                    </g>
                </svg>
            </div>
      )
    }
  }


const SalesLineChart = () => {
    return (
        <div>
            <h3>Sales Chart
            </h3>
            <div className="bottom-right-svg">
                <LineChart />
            </div>
        </div>
    )
}

module.exports = SalesLineChart

//PropsTypes
LineChart.propTypes = {
	width: PropTypes.number,
    height: PropTypes.number,
    chartId: PropTypes.string
}

LineChart.defaultProps = {
    width: 800,
    height: 300,
    chartId: 'v1_chart'
}


Axis.propTypes = {
    h: PropTypes.number,
    axis: PropTypes.func,
    axisType: PropTypes.oneOf(['x','y'])
}

Grid.propTypes = {
    h: PropTypes.number,
    grid: PropTypes.func,
    gridType: PropTypes.oneOf(['x','y'])
}

// ToolTip.propTypes = {
//     tooltip: PropTypes.object
// }

Dots.propTypes = {
    data: PropTypes.array,
    x: PropTypes.func,
    y: PropTypes.func

}
