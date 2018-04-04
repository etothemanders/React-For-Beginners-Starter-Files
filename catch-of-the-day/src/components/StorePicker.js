import React from 'react';
import PropTypes from 'prop-types';

import { getFunName } from '../helpers';

class StorePicker extends React.Component {
	myInput = React.createRef();

	static propTypes = {
		history: PropTypes.object.isRequired,
	};

	goToStore = event => {
		event.preventDefault();
		const storeName = this.myInput.value.value; // first .value is a React thing, second .value is just grabbing the html form input
		this.props.history.push(`/store/${storeName}`); // can access route history.props because StorePicker component is the component rendered directly as first child at this route
	}
	
	render() {
		return (
			<form className="store-selector" onSubmit={this.goToStore}>
				<h2>Please Enter A Store</h2>
				<input
					type="text"
					ref={this.myInput}
					required
					placeholder="Store Name"
					defaultValue={getFunName()}
				/>
				<button type="submit">Visit Store -></button>
			</form>
		);
	}
}

export default StorePicker;
