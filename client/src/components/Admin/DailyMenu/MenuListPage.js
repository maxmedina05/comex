import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ResourceTable from '../../reusable-components/resource-table';
import axios from 'axios';

export default class MenuListPage extends Component {
	constructor(props) {
		super(props);

		this.header = ['id', 'Nombre', 'Empieza', 'Termina'];
		this.displayFields = ['name', 'startDate', 'endDate'];
		this.handleListItemClick = this.handleListItemClick.bind(this);
		this.handleDeleteActionClick = this.handleDeleteActionClick.bind(this);
		this.loadMenus = this.loadMenus.bind(this);
		this.state = {
			Menus: []
		};
	}

	componentDidMount() {
		this.loadMenus();
	}

	handleListItemClick(objectId) {
		this.props.history.push(`/admin/menus/${objectId}`, objectId);
	}

	async handleDeleteActionClick(objectId) {
		try {
			const response = await axios.delete(`/api/v1/products/${objectId}`);
			const body = response.data;

			if (body.status === 'success') {
				window.location.reload();
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err.message || err);
		}
	}

	async loadMenus() {
		try {
			const response = await axios('/api/v1/menus');
			const body = response.data;

			if (body.status === 'success') {
				this.setState({
					menus: body.data
				});
			} else {
				throw Error(body.message);
			}
		} catch (err) {
			console.log(err.message || err);
		}
	}

	render() {
		return (
			<div>
				<h1>Product List Page</h1>
				<Link to="/admin/menus/new" className="btn btn-info">
					Agregar Menu Nuevo
				</Link>
				<ResourceTable
					header={this.header}
					dataSource={this.state.menus}
					displayFields={this.displayFields}
					listItemClick={this.handleListItemClick}
					deleteActionClick={this.handleDeleteActionClick}
				/>
			</div>
		);
	}
}
