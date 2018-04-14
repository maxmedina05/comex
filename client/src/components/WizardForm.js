import React, { Component } from 'react';
import PropTypes from 'prop-types';

export const WizardFormStep = props => {
	if (props.currentStep == props.step) {
		return props.children;
	}
	return null;
};

WizardFormStep.propsTypes = {
	step: PropTypes.number.isRequired,
	currentStep: PropTypes.number.isRequired
};

class WizardForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			steps: [],
			currentStep: 1
		};

		this._handleNext = this._handleNext.bind(this);
		this._handleBack = this._handleBack.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		// this._handleSubmit = this.props.handleSubmit;
		this._getSteps = this._getSteps.bind(this);
	}

	_getSteps() {
		const { children } = this.props;
		if (Array.isArray(children)) {
			return children.filter(x => x.props.step);
		}

		if (children && children.props.step) {
			return [children];
		}

		return [];
	}

	_handleSubmit(event) {
		event.preventDefault();
	}

	_handleNext() {
		const currentStep = this.state.currentStep;
		if (currentStep == this.props.stepCount) {
			return;
		}
		this.setState({
			currentStep: currentStep + 1
		});
	}

	_handleBack() {
		const currentStep = this.state.currentStep;
		if (currentStep == 1) {
			return;
		}

		this.setState({
			currentStep: currentStep - 1
		});
	}

	render() {
		const { children } = this.props;

		const steps =
			this.props.stepCount > 0
				? React.Children.map(this._getSteps(), step =>
						React.cloneElement(step, { currentStep: this.state.currentStep })
				  )
				: [];

		let otherChildren = [];
		if (Array.isArray(children)) {
			otherChildren = this.props.children.filter(x => !x.props.step);
		} else if (!children.props.step) {
			otherChildren = [children];
		}

		return (
			<form onSubmit={this._handleSubmit}>
				{`Current Step: ${this.state.currentStep}`}
				{otherChildren}
				{steps}
				<div>
					<button className="btn btn-warning" onClick={this._handleBack}>
						Back
					</button>
					<button className="btn btn-info" onClick={this._handleNext}>
						Next
					</button>
				</div>
			</form>
		);
	}
}

WizardForm.propsTypes = {
	stepCount: PropTypes.number.isRequired
};

export default WizardForm;
