import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import {NavLink} from 'react-router-dom'

import BeerItem from './BeerItem'

describe('BeerItem', () => {
    let beerItem;

    const beer = {
        id: 1,
        name: "Delicious Beer",
        image: "a cute pic",
        styleId: 2,
        style: {name: "IPA"}
    }

	beforeEach('create component', () => {
		beerItem = shallow(<BeerItem beer={beer} isStyle={false} isBrewery={true} isAdmin={false} />);
	})

	it('should be a <div> that has 3 instances of a NavLink if you are not Admin and it is rendered from a Brewery page', () => {
		expect(beerItem.is('div')).to.be.equal(true)
		expect(beerItem.find(NavLink).length).to.be.equal(3)
	})
})
