import { h, Component } from 'preact';
import PropTypes from 'prop-types';

import Wizard from '../../models/wizard';

class WizardController extends Component {
	static propTypes = {
		controller: PropTypes.instanceOf(Wizard).isRequired
	};

	render() {
		<div>{this.props.children}</div>;
	}
}

export { WizardController };
