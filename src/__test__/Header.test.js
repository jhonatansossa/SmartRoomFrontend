import Header from '../components/Header'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { mount, render } from 'enzyme'
import { configure } from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

configure({ adapter: new Adapter() })

let wrapper

beforeEach(() => {
	wrapper = mount(
		<Router>
			<Header />
		</Router>
	)
})

test('Header Component renders the title', () => {
	const { getByText } = render(
		<Router>
			<Header />
		</Router>
	)
	const p = wrapper.find('#modal')
	console.log(p)

	expect(getByText('SmartRoom')).toBeInTheDocument()
})
test('Header Component renders Overview', () => {
	expect(
		wrapper.findWhere((n) => n.type() === 'Nav.Link' && n.contains('Overview'))
	).toBe(true)
})
test('Header Component renders All Devices', () => {
	expect(
		wrapper.findWhere(
			(n) => n.type() === 'Nav.Link' && n.contains('All Devices')
		)
	).toBe(true)
})

test('Header Component renders All Switches', () => {
	expect(
		wrapper.findWhere(
			(n) => n.type() === 'Nav.Link' && n.contains('All Switches')
		)
	).toBe(true)
})
test('Header Component renders Logout', () => {
	expect(
		wrapper.findWhere((n) => n.type() === 'Nav.Link' && n.contains('Logout'))
	).toBe(true)
})
