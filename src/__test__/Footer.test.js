import PopUp from '../components/PopUp'
import React from 'react'
import { mount } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

let wrapper

beforeEach(() => {
	wrapper = mount(<PopUp />)
})

test('Footer Component renders the text DATA', () => {
	const p = wrapper.find('#modal')
	console.log(p)

	expect(p.text().includes('DATA')).toBe(true)
})
test('Footer Component renders the text lmao', () => {
	const p = wrapper.find('.center')
	expect(p.text().includes('lmao')).toBe(true)
})
