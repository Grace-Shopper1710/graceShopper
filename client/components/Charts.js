import React from 'react'
import { connect } from 'react-redux'
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
		if(this.props.orders[0])console.log(new Date(this.props.orders[0].updatedAt).toLocaleDateString() || "")
		// let orderData = this.props.orders.reduce(order => {
		// 	for(let i = 0; i < accu.length; i++) {
		// 		if(accu[i].day === order.updatedAt)
		// 	}
		// }, [])
		return (
	        <div className="container">
	            <div className="row">
	                <div className="col-xs-12" >
	                    <div className="top" id="top-line-chart">
	                        {/*<LineChart data={salesData} options={{scaleShowGridLines : true, scaleGridLineColor : "grey"}} width="700" height="350" />*/}
	                        <SalesLineChart />
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
	                        {/*<RetVisitors/>*/}
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
