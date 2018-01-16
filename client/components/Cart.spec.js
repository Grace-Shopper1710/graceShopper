import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import store from '../store'
import StripeCheckout from 'react-stripe-checkout'
import {Cart} from './Cart'

// *** import dumb ones early *** 
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
	let cartTest

	beforeEach('create component and spy', () => {
        const cart = {
                products: [
                    {id:1, name: "Beer1"},
                    {id:2, name: "Delicious"},
                    {id: 3, name: "hello"}
                ]
        }
        cartTest = shallow(<Cart cart={cart} />)
        
	})

	it('it uses Stripe', () => {
		expect(cart.find(StripeCheckout)).to.have.length(1)
    })
})