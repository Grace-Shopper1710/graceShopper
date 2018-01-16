import {expect} from 'chai';
import {updateBeer, deleteBeer, getAllProducts} from './product'

describe('Product Actions', () => {
	describe('getAllBeers', () => {
		it('returns all the products, and action type FETCH_ALL_PRODUCTS ', () => {
			const testProducts = [
                {
                name: 'Beery',
                inventory: 100,
                price: 13.99,
                packaging: '6 pack',
                description: 'a delicious beer',
                abv: 2.5,
                breweryId: 2,
                styleId: 2},
                {
                name: 'Hoppy',
                inventory: 50,
                price: 10.99,
                packaging: '6 pack',
                description: 'a deliciousER beer',
                abv: 4.5,
                breweryId: 1,
                styleId: 3}
            ]

			expect(getAllProducts(testProducts)).to.be.deep.equal({
				type: 'FETCH_ALL_PRODUCTS',
				products: testProducts
			})
		})
	})

	describe('updateBeer', () => {
		it('returns a single beer that needs to be updated and UPDATE_BEER action', () => {
			const testBeer = {
                name: 'HoppyTheUpdatedBeer',
                inventory: 50,
                price: 10.99,
                packaging: '6 pack',
                description: 'a deliciousER beer',
                abv: 4.5,
                breweryId: 1,
                styleId: 3}

			expect(updateBeer(testBeer)).to.be.deep.equal({
				type: 'UPDATE_BEER',
				beer: testBeer
			})
		})
	})

	describe('deleteBeer', () => {
		it('returns proper action', () => {
			const testBeerId = '2'
			expect(deleteBeer(testBeerId)).to.be.deep.equal({
				type: 'DELETE_BEER',
				beerId: testBeerId
            })
        })
	})
})

