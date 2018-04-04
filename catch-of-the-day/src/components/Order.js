import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';

import { formatPrice } from '../helpers';

class Order extends React.Component {
	static propTypes = {
		fishes: PropTypes.object,
		order: PropTypes.object, 
		removeFromOrder: PropTypes.func.isRequired,
	};

	renderOrderItem = key => {
		const fish = this.props.fishes[key];
		const count = this.props.order[key];
		const isAvailable = fish && fish.status === 'available';
		const orderItemTransitionSettings = {
			classNames: 'order',
			key,
			timeout: { enter: 500, exit: 500 },
		};

		// In case there is no fish because they haven't loaded from firebase yet, return null
		if (!fish) return null;

		if (!isAvailable) {
			return (
        <CSSTransition { ...orderItemTransitionSettings }>
        	<li key={key}>Sorry {fish ? fish.name : 'that fish'} is no longer available</li>
      	</CSSTransition>
      );
		}

		return (
      <CSSTransition { ...orderItemTransitionSettings }>
	      <li key={key}>
	      	<span>
	      		<TransitionGroup component="span" className="count">
	      			<CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
		      			<span>{count}</span>
	      			</CSSTransition>
      			</TransitionGroup>
		      	lbs {fish.name}
		      	{formatPrice(count * fish.price)}
		      	<button onClick={() => this.props.removeFromOrder(key)}>&times;</button>
	      	</span>
	      </li>
      </CSSTransition>
    );
	}

	render() {
		const orderIds = Object.keys(this.props.order);
		const total = orderIds.reduce((acc, key) => {
			const fish = this.props.fishes[key];
			const count = this.props.order[key];
			const isAvailable = fish && fish.status === 'available';
			if (isAvailable) {
				return acc + (count * fish.price);
			}
			return acc;
		}, 0);

		return (
			<div className="order-wrap">
				<h2>Order</h2>
				<TransitionGroup component="ul" className="order">
					{orderIds.map(this.renderOrderItem)}
				</TransitionGroup>
				<div className="total">
					Total: 
					<strong>{formatPrice(total)}</strong>
				</div>
			</div>
		);
	}
}

export default Order;
