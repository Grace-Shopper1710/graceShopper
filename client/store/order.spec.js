// import { expect } from 'chai'
// import { createStore } from 'redux'
// import thunk from 'redux-thunk'
// import fetchMock from 'fetch-mock'
// import orderReducer from './order'

// describe('Order Reducer', () => {
//   let testStore;

//   const orders = [
//         {
//           name: 'Jane Doe',
//           id: 1
//         },
//         {
//           name: 'John Doe',
//           id: 2
//         }
//       ]

//   let order = {name: 'Jane Stiller', id: 1}

//   beforeEach('mock store', () => {
//     testStore = createStore(orderReducer)

//   })

//   it('has an initial state', () => {
//     expect(orderReducer(undefined, [])).to.be.deep.equal([])
//   })

//   describe('GET_ALL_ORDERS', () => {
//     it('sets orders from action', () => {
//       testStore.dispatch({
//         type: 'GET_ALL_ORDERS',
//         orders: orders
//       })
//       expect(testStore.getState()).to.be.deep.equal(
//         [{name: 'Jane Doe', id: 1}, {name: 'John Doe', id: 2}])
//     })
//   })

//   it('creates UPDATE_STATUS when fetching updated orders', () => {
//     fetchMock
//       .putOnce('/orders', {name: 'Jane Stiller', id: 1}, headers : {'content-type': 'application/'})
//   })

  // describe('UPDATE_ORDER', () => {
  //   it('sets orders from action', () => {
  //     testStore.dispatch({
  //       type: 'UPDATE_ORDER',
  //       order: order
  //     })
  //     expect(testStore.getState()).to.be.deep.equal({name: 'Jane Stiller', id: 1})
  //   })

  // })

})
