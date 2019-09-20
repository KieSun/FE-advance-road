import React from 'react'
import { mount } from 'enzyme'
import Loading from './index'

describe('loading', () => {
  it('allows us to set props', () => {
    const wrapper = mount(<Loading size="small" />)
    expect(wrapper.props().size).toEqual('small')
  })
})
