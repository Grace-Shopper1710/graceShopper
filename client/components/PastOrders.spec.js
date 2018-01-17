import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'

import PastOrders from './PastOrders'

describe('PastOrders Component', () => {
  let wrapper
  const orders = [
    {
      name: 'Jane Doe',
      id: 1
    },
    {
      name: 'John Doe',
      id: 2
    }
  ]

  beforeEach(() => {
    wrapper = shallow(<PastOrders orders={orders} />)
  })

  it('renders', () => {
    expect(wrapper.length).toEqual(1)
  })

  it('contains recieves props of orders', () => {
    expect(wrapper.find())
  })
})
