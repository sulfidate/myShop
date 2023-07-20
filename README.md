# 01 Tools

* VSCode - ES7 React Native Snippets - Prettier - JS ES6 code Snippets - CodePilot - Github Dark
* Git
* Node.js
* Postman
* React Developer Tools
* Redux DevTools Mit brew aufgesetzt.


---

# 02 Setup



---

# 03 Folder - Structure 

	/proshop-v2 /frontend /backend


---

# 04 CLIENT SITE - Frontend with React, Bootstrap



* Client Interface erstellen:


---

# 05. React Setup & Git init

* React Seite erstellen -> npx create-react-app frontend
* Bootstrap installeren -> npm i react-bootstrap bootstrap react-icons


---

# 06. Components Ordner mit Header & Footer

* Components Ordner mit Header & Footer - importieren


---

# 07. Bootstrap custom files & Logo 

	1. Bootstrap custom files & Logo in assets Ordner importers


---

# 08. List Products

	1. Screens Ordner erstellen  mit HomeScreen


---

# 09. Implement react-router

	1. Implement react-router


---

# 10. Raiting Component erstellen

	1. Raiting Component erstellen


---

# 11. ProductScreen mit Route über :id

	1. ProductScreen mit Route über :id


---

# 12. SERVER SITE - Backend with node.js express server

 



	* Routes with actions: Get-, Post-, Put-, Delete-requestion the REST API
	* Authentication with http-only cookie on server site 
	* Store data in database MongoDB Atlas with mongoose Query
	* Server side Jason install in the root folder -> npm init with Entrypoint: =server.js
	* Package.json implement type module and test=start node backend/server.js
	* Install express in the root: npm I express


---

# 13. Server.js in the backend folder 

	1. Server.js in the backend folder 


			import express from ‘express’
			const port = 3001 (5000 is taken)
			const app = expres()
			app.get( ‘/‘, (req, res) => { res.send(‘API is running…’) })
			app.listen(port, () => console.log(‘Server running on port ${port}’))


---

# 14. Nodemon & Concurrently

>> Nodemon & Concurrently $ npm i -D nodemon concurrently implement in package.json =

		 "server": "nodemon backend/server.js" (changes get automatically, no server restart) "client": "npm start --prefix frontend" (goes to frontend folder and start server)  "dev": "concurrently \"npm run server\" \"npm run client\""

>>  to start the server backend / frontend / and both togethter



---

# 15. Environment Variables

>> Environment Variables $ npm i -D dotenv => .env in the root: 

		 NODE_ENV=development PORT=3001 => server.js: import dotenv from "dotenv" dotenv.config() const port = process.env.PORT || 3002


---

# 16. Fetch Products

Install Postman & getting started with

**Fetch Products from database:**

**-> create Collections and Requests in Postmann**

**$ mkdir /backend/routes/ -> productRoutes.js**

import express from "express"

const router = express.Router() 

import asyncHandler from '../middleware/asyncHandler.js'

import Product from '../models/productModel.js'

router.get('/', asyncHandler ( async (req, res) => {

> const products = await Product.find({})

> res.json(products)

> }

))

router.get('/:id', asyncHandler (async (req, res) => {

 const product = await Product.findById([req.params.id](http://req.params.id))

> if (product) {

> res.json(product)

> }

> else {

>> res.status(404).json({message: "Product not found"})

> }

> }

> 

))



export default router

**$ changes in server.js:**

import express from "express"

import dotenv from "dotenv"

dotenv.config()

import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"

const port = process.env.PORT || 8000

connectDB() // connect to MongoDB

const app = express()

app.get('/', (req, res) => {

> res.send("API is running...")

> }

)

app.use("/api/products", productRoutes)

app.listen(port, () => {    

> console.log(`Server running on port ${port}`)

> }

)

**create own asyncHandler:**

**$ mkdir /backend/middleware -> asyncHandler.js:**

const asyncHandler = (fn) => (req, res, next) =>

> Promise.resolve(fn(req, res, next)).catch(next)

export default asyncHandler  

		
		
		Fetch Products => frontend/package.json: "proxy": "http://localhost:8000", => HomeScreen.jsx: import { useEffect, useState } from 'react' import Product from '../components/Product' import { Row, Col } from 'react-bootstrap' import axios from 'axios'  const HomeScreen = () => {   const [products, setProducts] = useState([])   useEffect(() => {     const fetchProducts = async () => {       const { data } = await axios.get('/api/products')       setProducts(data)     }     fetchProducts()   }, []) 
		ProductScreen.jsx:  import React from 'react' import { useParams } from 'react-router-dom' import { useState, useEffect } from 'react' import Rating from '../components/Rating' import { Link } from 'react-router-dom' import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap' import axios from 'axios' const ProductScreen = () => {     const [product, setProduct] = useState({})     const { id: productId } = useParams()     useEffect(() => {         const fetchProduct = async () => {             const { data } = await axios.get(`/api/products/${productId}`)             setProduct(data)         }         fetchProduct()     }, [productId])


---

# 17. MongoDB Atlas

> MongoDB Atlas Setup Setup Cloud Database MDB Atlas  - create Projekt - Build Database - M0 - AWS - DE-Server - add username Connect to App: string for application = copy and fill in .env - fill in passwort and database name Browse Collections: add my own data - database name - collection name .env should be in .gitignore add new file: example.env without values to show wich variables needed for the app



---

# 18. MongoDB Compass

	1. MongoDB Compass Setup Compass is the GUI to MongoDB setup: Download, install, open - search connection string for Compass in MDB Atlas and copy it to URI in Compass, change Password and Database - connect


---

# 19. mongoose

	1. mongoose - connect with mongoose in /backend/config/db.js

> 

		import mongoose from "mongoose";
		const connectDB = async () => {
			try {
				const conn = await mongoose.connect(process.env.MONGO_URI);
				console.log(`MongoDB Connected: ${conn.connection.host}`);
			} catch (error) {
				console.log(`Error: ${error.message}`);
				process.exit(1);
			}
			}
			export default connectDB;


---

# 20. Modeling data

Modeling data like for 

=> backend/models/userModel.js: import mongoose from "mongoose"; const userSchema = mongoose.Schema(   // Schema is a class     {         name: { type: String, required: true },         email: { type: String, required: true, unique: true }, // unique: true means that email must be unique         password: { type: String, required: true },         isAdmin: { type: Boolean, required: true, default: false },     }     , {         timestamps: true     } ) const User = mongoose.model('User', userSchema ) export default User





=> productModel.js import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(   // Schema is a class    

> {

>> user: {

>>> type: mongoose.Schema.Types.ObjectId,

>>> required: true,

>>> ref: 'User'

>> },

>> name: { type: String, required: true },

>> rating: { type: Number, default: 0, required: true },

>> comment: { type: String, required: true },

> }

> , {

>> timestamps: true

> }

)



const produtSchema = mongoose.Schema(   // Schema is a class

> {

>> user: {

>>> type: mongoose.Schema.Types.ObjectId,

>>> required: true,

>>> ref: 'User'

>> },

>> name: { type: String, required: true },

>> image: { type: String, required: true },

>> brand: { type: String, required: true },

>> category: { type: String, required: true },

>> description: { type: String, required: true },

>> reviews: [reviewSchema],

>> rating: { type: Number, default: 0, required: true },

>> numReviews: { type: Number, default: 0, required: true },

>> price: { type: Number, default: 0, required: true },

>> countInStock: { type: Number, default: 0, required: true },

> }

> , {

>> timestamps: true

> }

)

const Product = mongoose.model('Product', produtSchema)

export default Product





=> orderModel.js

import mongoose from "mongoose";

const orderSchema = mongoose.Schema(   // Schema is a class

> {

>> user: {

>>> type: mongoose.Schema.Types.ObjectId,   

>>> required: true,

>>> ref: 'User' // ref: 'User' means that user is an object id of the User model

>> },

>> orderItems: [

>>> {

>>>> name: { type: String, required: true },

>>>> qty: { type: Number, required: true },

>>>> image: { type: String, required: true },

>>>> price: { type: Number, required: true },

>>>> product: {

>>>>> type: mongoose.Schema.Types.ObjectId,

>>>>> required: true,

>>>>> ref: 'Product' // ref: 'Product' means that product is an object id of the Product model

>>>> },

>>> }

>> ],

>> shippingAddress: {

>>> address: { type: String, required: true },

>>> city: { type: String, required: true },

>>> postalCode: { type: String, required: true },

>>> country: { type: String, required: true },

>> },

>> paymentMethod: {

>>> type: String,

>>> required: true

>> },

>> paymentResult: {

>>> id: { type: String }, // id is the id of the payment

>>> status: { type: String },

>>> update_time: { type: String },

>>> email_address: { type: String },

>> },

>> itemsPrice: {

>>> type: Number,

>>> required: true,

>>> default: 0.0    // 0.0 means 0

>> },

>> taxPrice: {

>>> type: Number,

>>> required: true,

>>> default: 0.0    // 0.0 means 0

>> },

>> shippingPrice: {

>>> type: Number,

>>> required: true,

>>> default: 0.0    // 0.0 means 0

>> },

>> totalPrice: {

>>> type: Number,

>>> required: true,

>>> default: 0.0    // 0.0 means 0

>> },

>> isPaid: {

>>> type: Boolean,

>>> required: true,

>>> default: false    // false means not paid

>> },

>> paidAt: {

>>> type: Date,

>> },

>> isDelivered: {

>>> type: Boolean,

>>> required: true,

>>> default: false    // false means not delivered

>> },

>> deliveredAt: {

>>> type: Date,

>> },

> }

> , {

>> timestamps: true

> }

)

const Order = mongoose.model('Order', orderSchema)

export default Order  



---

# 21. Prepare sample data: 

=> Prepare sample data: 

=> /backend/data/users.js  import bcrypt from 'bcryptjs';

const users = [

> {

>> name: 'Admin User',

>> email: '[admin@email.com](mailto:admin@email.com)',

>> password: bcrypt.hashSync('123456', 10),

>> isAdmin: true,

> },

> {

>> name: 'John Doe',

>> email: '[john@email.com](mailto:john@email.com)',

>> password: bcrypt.hashSync('123456', 10),

>> isAdmin: false,

> },

> {

>> name: 'Jane Doe',

>> email: '[jane@email.com](mailto:jane@email.com)',

>> password: bcrypt.hashSync('123456', 10),

>> isAdmin: false,

> },

];

export default users;

=> /backend/products.js

const products = [

  {

> name: 'Airpods Wireless Bluetooth Headphones',

> image: '/images/airpods.jpg',

> description:

>   'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',

> brand: 'Apple',

> category: 'Electronics',

> price: 89.99,

> countInStock: 10,

> rating: 4.5,

> numReviews: 12,

  },

  {

> name: 'iPhone 11 Pro 256GB Memory',

> image: '/images/phone.jpg',

> description:

>   'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',

> brand: 'Apple',

> category: 'Electronics',

> price: 599.99,

> countInStock: 7,

> rating: 4.0,

> numReviews: 8,

  },

  {

> name: 'Cannon EOS 80D DSLR Camera',

> image: '/images/camera.jpg',

> description:

>   'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',

> brand: 'Cannon',

> category: 'Electronics',

> price: 929.99,

> countInStock: 5,

> rating: 3,

> numReviews: 12,

  },

  {

> name: 'Sony Playstation 4 Pro White Version',

> image: '/images/playstation.jpg',

> description:

>   'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',

> brand: 'Sony',

> category: 'Electronics',

> price: 399.99,

> countInStock: 11,

> rating: 5,

> numReviews: 12,

  },

  {

> name: 'Logitech G-Series Gaming Mouse',

> image: '/images/mouse.jpg',

> description:

>   'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',

> brand: 'Logitech',

> category: 'Electronics',

> price: 49.99,

> countInStock: 7,

> rating: 3.5,

> numReviews: 10,

  },

  {

> name: 'Amazon Echo Dot 3rd Generation',

> image: '/images/alexa.jpg',

> description:

>   'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',

> brand: 'Amazon',

> category: 'Electronics',

> price: 29.99,

> countInStock: 0,

> rating: 4,

> numReviews: 12,

  },

]

export default products





---

# 22. Seeding sample data:

=> Seeding sample data:  import mongoose from "mongoose";

import dotenv from "dotenv";

import colors from "colors";

import users from "./data/users.js";

import products from "./data/products.js";

import User from "./models/userModel.js";

import Product from "./models/productModel.js";

import Order from "./models/orderModel.js";

import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const importData = async () => {

> try {

>> await Order.deleteMany();

>> await Product.deleteMany();

>> await User.deleteMany();

>> const createdUsers = await User.insertMany(users);

>> const adminUser = createdUsers[0]._id;

>> const sampleProducts = products.map((product) => {

>>> return { ...product, user: adminUser };

>> });

>> await Product.insertMany(sampleProducts);

>> console.log("Data Imported!".green.inverse);

>> process.exit();

> }   catch (error) {

>> console.error(`${error}`.red.inverse);

>> process.exit(1);

> }   

};

const destroyData = async () => {

> try {

>> await Order.deleteMany();

>> await Product.deleteMany();

>> await User.deleteMany();

>> console.log("Data Destroyed!".red.inverse);

>> process.exit();

> }   catch (error) {

>> console.error(`${error}`.red.inverse);

>> process.exit(1);

> }   

}

if (process.argv[2] === "-d") {

> destroyData();

}   else {

> importData();

}



---

# 23. Postman getting started



---

# 24. Get Products from Database



---

# 25. Custom Error Middleware

19. Custom Error Middleware

** Create custom Error Handler to be more elegant with error handling:  $ fetch /backend/middleware/ -> errorMiddleware.js**

const notFound = (req, res, next) => {

> const error = new Error(`Not Found - ${req.originalUrl}`);

> res.status(404);

> next(error);

> }

const errorHandler = (err, req, res, next) => {

   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

   let message = err.message;

   if(err.name === 'CastError' && err.kind === 'ObjectId') {

>>  statusCode = 404;

>>> message = 'Ressource Not Found';

> }

> res.status(statusCode).json({

>> message,

>> stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,

>> });

> }



export { notFound, errorHandler }

**$Changes in server.js:**

import express from "express"

import dotenv from "dotenv"

dotenv.config()

import connectDB from "./config/db.js"

import  { notFound, errorHandler } from "./middleware/errorMiddleware.js"

import productRoutes from "./routes/productRoutes.js"

const port = process.env.PORT || 8000

connectDB() // connect to MongoDB

const app = express()

app.get('/', (req, res) => {

> res.send("API is running...")

> }

)

app.use("/api/products", productRoutes)

app.use(notFound)

app.use(errorHandler)



app.listen(port, () => {    

> console.log(`Server running on port ${port}`)

> }

)



**$ Changes in productRoutes.js:**

import express from "express"

const router = express.Router() 

**import asyncHandler from '../middleware/asyncHandler.js'**

import Product from '../models/productModel.js'

router.get('/', asyncHandler ( async (req, res) => {

> const products = await Product.find({})

> **// throw new Error("Some error")**

> res.json(products)

> }

))

router.get('/:id', asyncHandler (async (req, res) => {

 const product = await Product.findById([req.params.id](http://req.params.id))

> if (product) {

> res.json(product)

> }

> else {

>> **res.status(404)**

>> **throw new Error("Ressource not found")**

> }

> }

> 

))



export default router



---

# 26. Product Controller

 

**$ mkdir /backend/controllers/**

**productController.js**

import asyncHandler from '../middleware/asyncHandler.js';

import Product from '../models/productModel.js';

// @desc Fetch all products

// @route GET /api/products

// @access Public

const getProducts = asyncHandler(async (req, res) => {

> const products = await Product.find({});

> // throw new Error("Some error")

> res.json(products);

}

);

// @desc Fetch single product

// @route GET /api/products/:id

// @access Public

const getProductById = asyncHandler(async (req, res) => {

> const product = await Product.findById([req.params.id](http://req.params.id));

> if (product) {

>> res.json(product);

> }

> else {

>> res.status(404);

>> throw new Error("Ressource not found");

> }

}

);

export { getProducts, getProductById };



**and adapt changes in productRoute.js:**

import express from "express"

const router = express.Router() 

import { getProducts, getProductById } from "../controllers/productController.js"

router.route("/").get(getProducts)

router.route("/:id").get(getProductById)



export default router





---

# 27. Redux & State Overview

component state

The state is an instance of React Component Class that can be defined as an object of a set of observable properties that control the behavior of the component. In other words, the State of a component is an object that holds some information that may change over the lifetime of the component.



global state



---

# 28. Redux Store & API Slice

* **install Redux Toolkit and Redux React:**

$ npm install @reduxjs/toolkit react-redux

* **mkdir /frontend/src/ store.js:**

import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";

const store = configureStore({

> reducer: {

>> [apiSlice.reducerPath]: apiSlice.reducer

> },

> middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),

> devTools: true,

});

export default store;

* **mkdir /frontend/src/slices/ apiSlice.js:**

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { BASE_URL } from '../constants';

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })

export const apiSlice = createApi({

> baseQuery,

> tagTypes: ['Product', 'Order', 'User'  ],

> endpoints: (builder) => ({ })

})

* **adapt changes to index.js:**

import React from 'react';

import ReactDOM from 'react-dom/client';

import {

  createBrowserRouter,

  createRoutesFromElements,

  Route,

  RouterProvider} from 'react-router-dom';

  **import { Provider } from 'react-redux';**

**  import store from './store';**

// import 'bootstrap/dist/css/bootstrap.min.css';

import './assets/styles/bootstrap.custom.css';

import './assets/styles/index.css';

import App from './App';

import reportWebVitals from './reportWebVitals';

import HomeScreen from './screens/HomeScreen';

import ProductScreen from './screens/ProductScreen';

const router = createBrowserRouter(

  createRoutesFromElements(

> <Route path="/" element={<App />}>

>   <Route index={true} path="/" element={<HomeScreen />} />

>   <Route path="/product/:id" element={<ProductScreen />} />

> </Route>

  )

);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

> **<Provider store={store}>**

   <RouterProvider router={router} />

> **</Provider>**

  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function

// to log results (for example: reportWebVitals(console.log))

// or send to an analytics endpoint. Learn more: [bit.ly/CRA-vitals](https://bit.ly/CRA-vitals)

reportWebVitals();

* **fetch /frontend/src/constants.js**

export const BASE_URL = process.env.NODE_ENV === 'development' ? '[http://localhost:8000' : '](http://localhost:8000'%20:%20')';

export const PRODUCTS_URL = '/api/products';

export const USERS_URL = '/api/users';

export const ORDERS_URL = '/api/orders';

export const PAYPAL_URL = '/api/config/paypal';



---

# 29. Products API Slice & Get Products Endpoint

**$ fetch /frontend/src/slices productsApiSlice.js (-> to inject endpoint in parent file apiSlice.js)**

import { PRODUCTS_URL } from "../constants";

import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({

> endpoints: (builder) => ({

>> getProducts: builder.query({

>>> query: () => PRODUCTS_URL,

>> }),

>> keepUnusedDataFor : 5

> }),

})

export const { useGetProductsQuery } = productsApiSlice;

* **change HomeScreen.js to:**

import React from 'react'

import Product from '../components/Product'

import { Row, Col } from 'react-bootstrap'

**import { useGetProductsQuery } from '../slices/productsApiSlice'**

const HomeScreen = () => {

**const { data: products, isLoading, error } = useGetProductsQuery()**

  return (

> <>

> **{isLoading ? (**

>> **<h1>Loading...</h1>**

> **) : error ? (<div> {error?.data?.message || error.error} </div>) : (<><h1>Latest Products</h1>**

>> <Row>

>>> {products.map(product => (

>>>> <Col key={product._id} sm={12} md={6} lg={4} xl={3}>

>>>>> <Product product={product} />

>>>> </Col>

>>> ))}

>> **</Row></>)}**

>> 

> </>

  )

}

export default HomeScreen

* **change contants.js to:**

// export const BASE_URL = process.env.NODE_ENV === 'development' ? '[http://localhost:8000' : '](http://localhost:8000'%20:%20')';

export const BASE_URL = '';

export const PRODUCTS_URL = '/api/products';

export const USERS_URL = '/api/users';

export const ORDERS_URL = '/api/orders';

export const PAYPAL_URL = '/api/config/paypal';



---

# 30. Get Product Details Endpoint Challenge

	**add changes to productsApiSlice.js:**
	import { PRODUCTS_URL } from "../constants";
	import { apiSlice } from "./apiSlice";
	export const productsApiSlice = apiSlice.injectEndpoints({
		endpoints: (builder) => ({
			getProducts: builder.query({
				query: () => ({
					url: PRODUCTS_URL,
			}),
			keepUnusedDataFor : 5
		}), 
		**getProductDetails: builder.query({**
			**query: (productId) => ({**
				**url: `${PRODUCTS_URL}/${productId}`,**
			**}),**
			**keepUnusedDataFor : 5**
		**}),**
		}),
	});
	
	export const { useGetProductsQuery,** useGetProductDetailsQuery** } = productsApiSlice;
	**add changes to ProductScreen.js:**
	import { useParams } from 'react-router-dom'
	import Rating from '../components/Rating'
	import { Link } from 'react-router-dom'
	import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
	**import { useGetProductDetailsQuery } from '../slices/productsApiSlice'**
	const ProductScreen = () => {
		const { id: productId } = useParams()
		**const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)**
	  return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			**{isLoading ? (**
				**<h1>Loading...</h1>**
			**) : error ? (**
			**<div>{error?.data?.message || error.error}</div>**
			**) :  (**
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating value={product.rating} text={`${product.numReviews} reviews`} />
						</ListGroup.Item>
						<ListGroup.Item>
							Price: ${product.price}
						</ListGroup.Item>
						<ListGroup.Item>
							Description: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>
										Price:
									</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										Status:
									</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button className='btn-block' type='button' disabled={product.countInStock === 0}>
									Add to Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			**)**
			**}**
	
		</>
	  )
	}
	export default ProductScreen


---

# 31. Loader & Message Components

	$ fetch frontend/src/components/Loader.jsx:



	import {Spinner } from 'react-bootstrap'
	const Loader = () => {
	return (
	<Spinner animation='border' role='status' style={{width: '100px', height: '100px', margin: 'auto', display: 'block'}}>
	<span className='sr-only'>Loading...</span>
	</Spinner>
	)
	}
	export default Loader
	
	$ fetch frontend/src/components/Message.jsx:



	import { Alert } from "react-bootstrap";
	const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
	}
	Message.defaultProps = {
	variant: 'info',
	}
	export default Message



	implement in ProductScreen.jsx:



	import { useParams } from 'react-router-dom'
	import Rating from '../components/Rating'
	import { Link } from 'react-router-dom'
	import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
	import Loader from '../components/Loader'
	import Message from '../components/Message'
	import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
	const ProductScreen = () => {
	const { id: productId } = useParams()
	const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
	  return (
	<>
	<Link className='btn btn-light my-3' to='/'>
	Go Back
	</Link>
	
	{isLoading ? (
	<Loader />
	) : error ? (
	<Message variant='danger'> {error?.data?.message || error.error} </Message>
	) :  (
	<Row>
	...


---

# ◆ 00 README FIRST



---

# 32. Cart Slice & Reducer

* [Extracting State Logic into a Reducer](https://react.dev/learn/extracting-state-logic-into-a-reducer)
* [How to use react useReducer() Hook](https://dmitripavlutin.com/react-usereducer/)



$ fetch /frontend/src/slices/cartSlice.js:

	import { createSlice } from '@reduxjs/toolkit';  
	const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []};
	const cartSlice = createSlice({
		name: 'cart',
		initialState,
		reducers:{}
	});
	export default cartSlice.reducer;
	
	


---

# 33. Add to Cart Function

add reducer function to cartSlice => addToCart function

change frontend/src/slices/cartSlice.js:



	import { createSlice } from '@reduxjs/toolkit';  
	
	const initialState = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {cartItems: []};
	
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	
	const cartSlice = createSlice({
		name: 'cart',
		initialState,
		reducers:{
			addToCart: (state, action) => {
				const item = action.payload;
				const existItem = state.cartItems.find((x) => x._id === item._id);
				if(existItem){
					state.cartItems  = state.cartItems.map((x) => x._id === existItem._id ? item : x);
				}else{
					state.cartItems = [...state.cartItems, item];
				}
	
				// Calculate Items price
				state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	
				// Calculate Shipping price (Free shipping if price > 100, else 10$ shipping
				state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
	
				// Calculate Tax price (19% tax)
				state.taxPrice = addDecimals(Number((0.19 * state.itemsPrice).toFixed(2)));
	
				// Calculate Total price
				state.totalPrice = (
					Number(state.itemsPrice) + 
					Number(state.shippingPrice) + 
					Number(state.taxPrice)
					).toFixed(2);
	
				localStorage.setItem('cart', JSON.stringify(state));
			},
		},
	});
	
	export const { addToCart } = cartSlice.actions;
	
	export default cartSlice.reducer;


---

# 34. Qty & Add to Card Handler

add Qty and addToCardHandler to Component ProductScreen.jsx: 



	::import { useState } from 'react'::
	::import { useParams, useNavigate } from 'react-router-dom'::
	::import { useDispatch } from 'react-redux'::
	import Rating from '../components/Rating'
	import { Link } from 'react-router-dom'
	import { Row, Col, Image, ListGroup, Card, Button, ::FormControl:: } from 'react-bootstrap'
	import Loader from '../components/Loader'
	import Message from '../components/Message'
	import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
	::import {addToCart} from '../slices/cartSlice'::
	
	
	const ProductScreen = () => {
		const { id: productId } = useParams()
	
		::const dispatch = useDispatch()::
		::const navigate = useNavigate()::
	
	
		::const [qty, setQty] = useState(1)::
		
		
		const { data: product, isLoading, error } = useGetProductDetailsQuery(productId)
		
			::const addToCartHandler = () => {::
				::dispatch(addToCart({ ...product, qty }))::
				::navigate(`/cart`)::
			::}::
			
		
	  return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				Go Back
			</Link>
			
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'> {error?.data?.message || error.error} </Message>
			) :  (
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							<Rating value={product.rating} text={`${product.numReviews} reviews`} />
						</ListGroup.Item>
						<ListGroup.Item>
							Price: ${product.price}
						</ListGroup.Item>
						<ListGroup.Item>
							Description: {product.description}
						</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroup.Item>
								<Row>
									<Col>
										Price:
									</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>
										Status:
									</Col>
									<Col>
										{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
									</Col>
								</Row>
							</ListGroup.Item>
	
							::{product.countInStock > 0 && (::
	
								::<ListGroup.Item>::
									::<Row>::
										::<Col>Qty</Col>::
										::<Col>::
											::<FormControl ::
												::as='select'::
												::value={qty} ::
												::onChange={(e) => setQty(Number(e.target.value))}>::
												::{::
													::[...Array(product.countInStock).keys()].map((x) => (::
														::<option key={x + 1} value={x + 1}>::
															::{x + 1}::
														::</option>::
													::))::
												::}::
											::</FormControl>::
										::</Col>::
									::</Row>::
								::</ListGroup.Item>::
							::)}::
							<ListGroup.Item>
								<Button 
								className='btn-block' 
								type='button' 
								disabled={product.countInStock === 0}
								onClick={addToCartHandler}
	
								>
									Add to Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
			)
			}
	
	
		</>
	
	  )
	}
	
	export default ProductScreen


---

# 35. Cart Utils File

to clean up the cartSlice.js - file cut out and fill in to cartUtils.js



$ fetch frontend/src/utils/cartUtils.js

  cut out from cartSlice.js:



	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};
	
	.....
	
			   // Calculate Items price
				state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
	
				// Calculate Shipping price (Free shipping if price > 100, else 10$ shipping
				state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
	
				// Calculate Tax price (19% tax)
				state.taxPrice = addDecimals(Number((0.19 * state.itemsPrice).toFixed(2)));
	
				// Calculate Total price
				state.totalPrice = (
					Number(state.itemsPrice) + 
					Number(state.shippingPrice) + 
					Number(state.taxPrice)
					).toFixed(2);
	
				localStorage.setItem('cart', JSON.stringify(state));
				
				

and fill in cartUtils.js:



			   export const addDecimals = (num) => {
				return (Math.round(num * 100) / 100).toFixed(2);
			};
			
			export const updateCart = (state) => {
			
						// Calculate Items price
						state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0));
			
						// Calculate Shipping price (Free shipping if price > 100, else 10$ shipping
						state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 100);
			
						// Calculate Tax price (19% tax)
						state.taxPrice = addDecimals(Number((0.19 * state.itemsPrice).toFixed(2)));
			
						// Calculate Total price
						state.totalPrice = (
							Number(state.itemsPrice) + 
							Number(state.shippingPrice) + 
							Number(state.taxPrice)
							).toFixed(2);
			
						localStorage.setItem('cart', JSON.stringify(state));
			
						return state;
			 
			}
			


---

# 36. Item Count in Header

