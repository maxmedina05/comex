import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class LoginRegisterModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showModal: false
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			showModal: !this.state.showModal
		});
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
					<ModalHeader toggle={this.toggle}>Heaader</ModalHeader>
					<ModalBody>Body</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggle}>
							Cancelar
						</Button>{' '}
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
