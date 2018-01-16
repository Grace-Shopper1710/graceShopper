import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { PolarArea as PolarAreaChart } from 'react-chartjs'
import SalesLineChart from './LineChart'


let styleData = [
	{
		value: 300,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "Red"
	},
	{
		value: 50,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "Green"
	},
	{
		value: 100,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "Yellow"
	},
	{
		value: 40,
		color: "#949FB1",
		highlight: "#A8B3C5",
		label: "Grey"
	},
	{
		value: 120,
		color: "#4D5360",
		highlight: "#616774",
		label: "Dark Grey"
	}

];

export class Charts extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {

	}

	render () {
		let orderData = []
		if (this.props.orders) {
			let orders = this.props.orders
			orders.forEach(order => {
				let isAdded = false
				for (let i = 0; i < orderData.length; i++) {
					if (orderData[i].day === new Date(order.updatedAt).toLocaleDateString()) {
						orderData[i].count += Math.round(order.total * 100)/100
						isAdded = true
						break
					}
				}
				if (!isAdded)orderData.push({ day: new Date(order.updatedAt).toLocaleDateString(), count: order.total })
			})
			orderData.sort(compare)
			console.log(orderData)
		}
		return (
	        <div className="container">
	            <div className="row">
	                <div className="col-xs-12" >
	                    <div className="top" id="top-line-chart">
	                        {/*<LineChart data={salesData} options={{scaleShowGridLines : true, scaleGridLineColor : "grey"}} width="700" height="350" />*/}
	                        <SalesLineChart orderData={orderData} />
	                    </div>
	                </div>
	            </div>
	            <div className="row">
	                <div className="col-xs-7">
	                    <div className="bottom-left" id="browser">
	                        <PolarAreaChart width='400' height='400' data={styleData} />
	                    </div>
	                </div>
	                <div className="col-xs-5">
	                    <div className="bottom-right" id="ret_visitors">
							<div className='AdminButton'>
								<NavLink to={'/beers'}><button type="button" class="btn btn-warning">ADD/EDIT BEER</button></NavLink>
							</div>
							<div className='AdminButton'>
								<NavLink to={'/breweries'}><button type="button" class="btn btn-warning" >ADD/EDIT BREWERY</button></NavLink>
							</div>
							<div className='AdminButton'>
								<NavLink to={'/styles'}><button type="button" class="btn btn-warning" >ADD/EDIT STYLE</button></NavLink>
							</div>
	                    </div>
	                </div>
	            </div>
	        </div>
		)
	}
}

const mapStateToProps = state => ({ orders: state.order})

const chartsContainer = connect(mapStateToProps)(Charts)
export default chartsContainer

//Helper Function
function compare(a, b) {
  const day1 = a.day;
  const day2 = b.day;
  let comparison = 0;
  if (day1 > day2) {
    comparison = 1;
  } else if (day1 < day2) {
    comparison = -1;
  }
  return comparison;
}
