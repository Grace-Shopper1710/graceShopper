import React from 'react';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {FilterBar} from './FilterBar'
import SearchBar from './SearchBar'

describe('FilterBar', () => {
    let filterBar;

	beforeEach('create component', () => {
        filterBar = shallow(<FilterBar
        product={[]}
        brewery={[]}
        style={[]}
        handleBreweryFilter={()=>{}}
        handleStyleFilter={()=>{}}
        handleSortChange={()=>{}}
        clearAllFilters={()=>{}}
        />);
	})

	it('should be a <div>', () => {
		expect(filterBar.is('div')).to.be.equal(true)
    })

    it('should have a <SearchBar/> component', () => {
		expect(filterBar.find(SearchBar)).to.have.length(1)
    })

    it('should render three <select> options ', () => {
		expect(filterBar.find('select').length).to.be.equal(3)
	})
})
