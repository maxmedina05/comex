import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class MenuGridItemModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
		this.toggle = this.toggle.bind(this);
		this.onAddMeal = this.onAddMeal.bind(this);
	}

	toggle() {
		this.setState({
			showModal: !this.state.showModal
		});
	}

	onAddMeal() {
		const meal = this.props.menu;
		console.log(meal);
		this.toggle();
	}

	render() {
		return (
			<div>
				<Button color="danger" onClick={this.toggle}>
					Ver
				</Button>
				<Modal
					isOpen={this.state.showModal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>{this.props.menu.name}</ModalHeader>
					<ModalBody />
					<ModalFooter>
						<Button color="secondary" onClick={this.toggle}>
							Cancelar
						</Button>{' '}
						<Button color="primary" onClick={this.onAddMeal}>
							Pedir
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}

MenuGridItemModal.propTypes = {
	menu: PropTypes.object.isRequired
};
