import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'

import PastOrders from './PastOrders'

describe('PastOrders Component', ()=> {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<PastOrders />)
  })
})
