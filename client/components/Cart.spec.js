import 'jsdom-global/register';
import React from 'react';
import {expect} from 'chai';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import StripeCheckout from 'react-stripe-checkout'
import {Cart} from './Cart'
import store from '../store'

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
        const beers = [
        {id:1, name: "Beer1"},
        {id:2, name: "Delicious"},
        {id: 3, name: "hello"}
        ]

        const promoCode = {
            amount_off:null,
            created:1515943358,
            currency:null,
            duration:"once",
            duration_in_months:null,
            id:"ILOVEBEER",
            livemode:false,
            max_redemptions:100,
            metadata:{},
            object:"coupon",
            percent_off:50,
            redeem_by:null,
            times_redeemed:0,
            valid: true
        }
        const discount = 0
        cartTest = shallow(<Cart
            cart={cart}
            beers={beers}
            promoCode={promoCode}
            discount={discount}
            handleChange={() => {}}
            handleClick={() => {}}
            onToken={() => {}}
            removePromoCode={() => {}}
            handlePromoCode={() => {}}
             />)
	})

	it('it uses Stripe', () => {
		expect(cartTest.find(StripeCheckout)).to.have.length(1)
    })
    it('renders out the same amount of items for your cart', () => {
        expect(cartTest.find('.cartItems')).to.have.length(3);
    })
})
