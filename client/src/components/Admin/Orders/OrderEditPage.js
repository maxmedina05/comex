import React, { Component } from 'react';
import axios from 'axios';

export default class OrderEditPage extends Component {
	constructor(props) {
		super(props);

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.loadOrder = this.loadOrder.bind(this);
		this.updateOrder = this.updateOrder.bind(this);

		this.state = {
			objectId: '0',
			isEditMode: false,
			items: [],
			customer: '',
			status: '',
			createdAt: new Date(),
			modifiedAt: new Date()
		};
	}

	componentDidMount() {
		const { match: { params } } = this.props;
		this.setState({ isEditMode: true });
		this.loadOrder(params.objectId);
	}

	async loadOrder(objectId) {
		try {
			const response = await axios.get(`/api/v1/orders/${objectId}`);
			const body = response.data;
			if (body.status === 'success') {
				this.setState({
					objectId: body.data._id,
					items: body.data.items,
					customer: body.data.customer,
					status: body.data.status,
					createdAt: new Date(body.data.createdAt).toDateString()
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err);
		}
	}

	async handleSubmit(event) {
		event.preventDefault();
		this.updateOrder();
	}

	async updateOrder() {
		try {
			const response = await axios.put(
				`/api/v1/orders/${this.state.objectId}`,
				{
					status: this.state.status,
					modifiedAt: new Date()
				}
			);

			if (response.data.status === 'error') {
				throw Error(response.data.message);
			}
			this.props.history.goBack();
		} catch (err) {
			console.log(err);
		}
	}

	handleInputChange(event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	render() {
		return (
			<div>
				<h1>Actualizar Orden</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="objectId">Código</label>
						<input
							className="form-control"
							id="objectId"
							name="objectId"
							readOnly
							value={this.state.objectId}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="createdAt">Fecha de la Orden</label>
						<input
							className="form-control"
							id="createdAt"
							name="createdAt"
							readOnly
							value={this.state.createdAt}
						/>
					</div>
					<div className="form-group">
						<label htmlFor="status">Estado de la Orden</label>
						<select
							type="number"
							className="form-control"
							id="status"
							name="status"
							placeholder="100.00"
							value={this.state.status}
							onChange={this.handleInputChange}
						>
							<option value="Aun no procesada">Aun no procesada</option>
							<option value="En Proceso">En Proceso</option>
							<option value="En Camino">En Camino</option>
							<option value="Entregada">Entregada</option>
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="message">Mensaje del Cliente</label>
						<textarea
							row="3"
							className="form-control"
							id="message"
							name="message"
							readOnly
							value={this.state.message}
						/>
					</div>

					<button className="btn btn-primary">Guardar</button>
				</form>
			</div>
		);
	}
}
