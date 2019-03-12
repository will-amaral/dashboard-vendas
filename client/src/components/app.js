import React, { Component } from 'react';
import { BarChart, Bar, Brush, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
  

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			quantidade: [],
			valor: [],
			isLoading: true,
		};
	}

	componentDidMount() {
		this.onLoad();
	}

	onLoad() {
		fetch(`http://localhost:3001/api/dados`)
		.then(res => res.json())
		.then(res => {
			this.setState({quantidade: Object.values(res.quantidade), valor: Object.values(res.valor), isLoading: false})
			console.log(res.data)
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
					  <div className="loader-container">
						  <div className="loader"></div>
					  </div>
			)
		}

		return (
			<div>
			<BarChart width={600} height={300} data={this.state.quantidade}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="DESCRICAO"/>
				<YAxis/>
				<Tooltip/>
				<Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
				<ReferenceLine y={0} stroke='#000'/>
				<Brush dataKey='DESCRICAO' height={30} stroke="#8884d8"/>
				<Bar name="Produtos Vendidos" dataKey="QUANTIDADE" fill="#8884d8" />
			</BarChart>

			<BarChart width={600} height={300} data={this.state.valor}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
				<CartesianGrid strokeDasharray="3 3"/>
				<XAxis dataKey="DESCRICAO"/>
				<YAxis/>
				<Tooltip/>
				<Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
				<ReferenceLine y={0} stroke='#000'/>
				<Brush dataKey='DESCRICAO' height={30} stroke="#82ca9d"/>
				<Bar name="Total" dataKey="TOTAL" fill="#82ca9d" />
			</BarChart>

			</div>

		);
	}
}

export default App;