import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import store from '../store'

import StripeCheckout from 'react-stripe-checkout'
import Cart from './Cart'

// cart.find(ColorSlider).nodes.map(shallow)
// const el = slider.get(0);
// expect(el.props.min).to.be.equal('0')
// expect(el.props.max).to.be.equal('255')
// slider.simulate('change', { target : {value : 50} })
// expect(onChangeSpy.called).to.be.true;
// expect(group.find(Palette).length).to.be.equal(1)
// expect(group.find(SliderGroup).length).to.be.equal(1)

// const usedPalette = group.find(Palette).nodes[0]
// expect(usedPalette.props.color).to.be.equal(color)

describe('Cart Component', () => {
	let cart, addItemSpy

	beforeEach('create component and spy', () => {
		addItemSpy = spy();
		cart = shallow(<Cart store={store} />)
	})

	it('it uses Stripe', () => {
		expect(cart.find(StripeCheckout).length).to.be.equal(1)
	})

	it('updates local state when ColorSlider broadcasts change', () => {
		// console.log("*****", cart.find(ColorSlider).nodes.map(shallow))
		const [firstSl, secondSl, thirdSl] =

		firstSl.simulate('change', {target : {value : 55}})
		expect(cart.state().red).to.be.equal(55)

		secondSl.simulate('change', {target : {value : 5}})
		expect(cart.state().green).to.be.equal(5)

		thirdSl.simulate('change', {target : {value : 100}})
		expect(cart.state().blue).to.be.equal(100)
	})

})