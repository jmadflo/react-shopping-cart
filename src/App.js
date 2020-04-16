import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import data from './data'
import ProductContext from './contexts/ProductContext'
import CartContext from './contexts/CartContext'
import useLocalStorage from './hooks/localStorage'
// Components
import Navigation from './components/Navigation'
import Products from './components/Products'
import ShoppingCart from './components/ShoppingCart'

function App() {
	const [products] = useState(data)
	const [cart, setCart] = useState([])

	const [storedCart, setStoredCart] = useLocalStorage('storedCart', cart)

	// get cart from localstorage at the beginning
	useEffect(() => {
		setCart(storedCart)
	}, [])

	// set update stored cart whenever cart changes
	useEffect(() => {
		setStoredCart(cart)
	}, [cart])

	const addItem = item => {
		// add the given item to the cart
		setCart([ ...cart, item ])
	}

	// filter out the selected item from cart
	const removeItem = productId => {
		setCart([ ...cart.filter(item => {
			if (item.id !== productId){
				return item
			}
		})])
	}

	return (
		<div className="App">
			<ProductContext.Provider value={{ products, addItem }}>
				<CartContext.Provider value={{ cart, removeItem }}>
					<Navigation />
					{/* Routes */}
					<Route exact path="/">
						<Products />
					</Route>
					<Route path="/cart">
						<ShoppingCart />
					</Route>
				</CartContext.Provider>
			</ProductContext.Provider>
		</div>
	)
}

export default App
