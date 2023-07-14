# proshop-v2

#MERN from Scratch 2023 | eCommerce Platform

I. Tools:
- VSCode - ES7 React Native Snippets - Prettier - JS ES6 code Snippets - CodePilot - Github Dark
- Git
- Node.js
- Postman
- React Developer Tools
- Redux DevTools Mit brew aufgesetzt.

II. Ordnerstruktur  proshop-v2  frontend  backend

III.  CLIENT SITE -Frontend with React, Redux, Client Interface:
1. React Seite erstellen -> npx create-react-app frontend
2.  Bootstrap installeren -> npm i react-bootstrap bootstrap react-icons
3. Components Ordner mit Header & Footer - importieren
4. Bootstrap custom files & Logo in assets Ordner importers
5. Screens Ordner erstellen  mit HomeScreen
6. Implement react-router
7. Raiting Component erstellen
8. ProductScreen mit Route über :id

IV.  SERVER SITE - Backend with node.js express server
￼
1. Routes with actions: Get-, Post-, Put-, Delete-requestion the REST API
2. Authentication with http-only cookie on server site 
3. Store data in database MongoDB Atlas with mongoose Query
4. Server side Jason install in the root folder -> npm init with Entrypoint: =server.js
5. Package.json implement type module and test=start node backend/server.js
6. Install express in the root: npm I express
7. Server.js in the backend folder 
    1. import express from ‘express’
    2. const port = 3001 (5000 is taken)
    3. const app = expres()
    4. app.get( ‘/‘, (req, res) => { res.send(‘API is running…’) })
    5. app.listen(port, () => console.log(‘Server running on port ${port}’))
8. Nodemon & Concurrently $ npm i -D nodemon concurrently implement in package.json = "server": "nodemon backend/server.js" (changes get automatically, no server restart) "client": "npm start --prefix frontend" (goes to frontend folder and start server)  "dev": "concurrently \"npm run server\" \"npm run client\"" to start the server backend / frontend / and both togethter
9. Environment Variables $ npm i -D dotenv => .env in the root:  NODE_ENV=development PORT=3001 => server.js: import dotenv from "dotenv" dotenv.config() const port = process.env.PORT || 3002
Fetch Products => frontend/package.json: "proxy": "http://localhost:8000", => HomeScreen.jsx: import { useEffect, useState } from 'react' import Product from '../components/Product' import { Row, Col } from 'react-bootstrap' import axios from 'axios'  const HomeScreen = () => {   const [products, setProducts] = useState([])   useEffect(() => {     const fetchProducts = async () => {       const { data } = await axios.get('/api/products')       setProducts(data)     }     fetchProducts()   }, [])  => ProductScreen.jsx:  import React from 'react' import { useParams } from 'react-router-dom' import { useState, useEffect } from 'react' import Rating from '../components/Rating' import { Link } from 'react-router-dom' import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap' import axios from 'axios'  const ProductScreen = () => {     const [product, setProduct] = useState({})     const { id: productId } = useParams()      useEffect(() => {         const fetchProduct = async () => {             const { data } = await axios.get(`/api/products/${productId}`)             setProduct(data)         }         fetchProduct()     }, [productId]) 
10. MongoDB Atlas Setup Setup Cloud Database MDB Atlas  - create Projekt - Build Database - M0 - AWS - DE-Server - add username Connect to App: string for application = copy and fill in .env - fill in passwort and database name Browse Collections: add my own data - database name - collection name .env should be in .gitignore add new file: example.env without values to show wich variables needed for the app
11. MongoDB Compass Setup Compass is the GUI to MongoDB setup: Download, install, open - search connection string for Compass in MDB Atlas and copy it to URI in Compass, change Password and Database - connect 
12. mongoose - connect with mongoose in /backend/config/db.js: 
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

13.  Modeling data like for => backend/models/userModel.js: import mongoose from "mongoose"; const userSchema = mongoose.Schema(   // Schema is a class     {         name: { type: String, required: true },         email: { type: String, required: true, unique: true }, // unique: true means that email must be unique         password: { type: String, required: true },         isAdmin: { type: Boolean, required: true, default: false },     }     , {         timestamps: true     } ) const User = mongoose.model('User', userSchema ) export default User  
14. => productModel.js import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(   // Schema is a class    
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: { type: String, required: true },
        rating: { type: Number, default: 0, required: true },
        comment: { type: String, required: true },
    }
    , {
        timestamps: true
    }
)


const produtSchema = mongoose.Schema(   // Schema is a class
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        name: { type: String, required: true },
        image: { type: String, required: true },
        brand: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        reviews: [reviewSchema],
        rating: { type: Number, default: 0, required: true },
        numReviews: { type: Number, default: 0, required: true },
        price: { type: Number, default: 0, required: true },
        countInStock: { type: Number, default: 0, required: true },
    }
    , {
        timestamps: true
    }
)
const Product = mongoose.model('Product', produtSchema)
export default Product

15. => orderModel.js
import mongoose from "mongoose";

const orderSchema = mongoose.Schema(   // Schema is a class
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,   
            required: true,
            ref: 'User' // ref: 'User' means that user is an object id of the User model
        },
        orderItems: [
            {
                name: { type: String, required: true },
                qty: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: 'Product' // ref: 'Product' means that product is an object id of the Product model
                },
            }
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true
        },
        paymentResult: {
            id: { type: String }, // id is the id of the payment
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        itemsPrice: {
            type: Number,
            required: true,
            default: 0.0    // 0.0 means 0
        },
        taxPrice: {
            type: Number,
            required: true,
            default: 0.0    // 0.0 means 0
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0.0    // 0.0 means 0
        },
        totalPrice: {
            type: Number,
            required: true,
            default: 0.0    // 0.0 means 0
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false    // false means not paid
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false    // false means not delivered
        },
        deliveredAt: {
            type: Date,
        },
    }
    , {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema)

export default Order

16. => Prepare sample data: 

=> /backend/data/users.js  import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@email.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: false,
    },
];

export default users;

=> /backend/products.js

const products = [
  {
    name: 'Airpods Wireless Bluetooth Headphones',
    image: '/images/airpods.jpg',
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
    brand: 'Apple',
    category: 'Electronics',
    price: 89.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'iPhone 11 Pro 256GB Memory',
    image: '/images/phone.jpg',
    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
    brand: 'Apple',
    category: 'Electronics',
    price: 599.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Cannon EOS 80D DSLR Camera',
    image: '/images/camera.jpg',
    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
    brand: 'Cannon',
    category: 'Electronics',
    price: 929.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'Sony Playstation 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
    brand: 'Sony',
    category: 'Electronics',
    price: 399.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'Logitech G-Series Gaming Mouse',
    image: '/images/mouse.jpg',
    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
    brand: 'Logitech',
    category: 'Electronics',
    price: 49.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'Amazon Echo Dot 3rd Generation',
    image: '/images/alexa.jpg',
    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
]

export default products


17. => Seeding sample data:  import mongoose from "mongoose";
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
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);
        console.log("Data Imported!".green.inverse);
        process.exit();
    }   catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }   
};

const destroyData = async () => {

    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        console.log("Data Destroyed!".red.inverse);
        process.exit();
    }   catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }   
}

if (process.argv[2] === "-d") {
    destroyData();
}   else {
    importData();
}


18. Install Postman & getting started with

Fetch Products from database:

-> create Collections and Requests in Postmann

$ mkdir /backend/routes/ -> productRoutes.js

import express from "express"
const router = express.Router() 
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

router.get('/', asyncHandler ( async (req, res) => {
    const products = await Product.find({})
    res.json(products)
    }
))

router.get('/:id', asyncHandler (async (req, res) => {
 const product = await Product.findById(req.params.id)
    if (product) {
    res.json(product)
    }
    else {
        res.status(404).json({message: "Product not found"})
    }
    }
    
))


export default router

$ changes in server.js:

import express from "express"
import dotenv from "dotenv"
dotenv.config()
import connectDB from "./config/db.js"

import productRoutes from "./routes/productRoutes.js"

const port = process.env.PORT || 8000

connectDB() // connect to MongoDB

const app = express()

app.get('/', (req, res) => {
    res.send("API is running...")
    }
)

app.use("/api/products", productRoutes)

app.listen(port, () => {    
    console.log(`Server running on port ${port}`)
    }
)

create own asyncHandler:
$ mkdir /backend/middleware -> asyncHandler.js:

const asyncHandler = (fn) => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next)

export default asyncHandler
  
19. Custom Error Middleware
 Create custom Error Handler to be more elegant with error handling:  $ fetch /backend/middleware/ -> errorMiddleware.js

const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
    }

const errorHandler = (err, req, res, next) => {
   let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
   let message = err.message;

   if(err.name === 'CastError' && err.kind === 'ObjectId') {
         statusCode = 404;
            message = 'Ressource Not Found';
    }

    res.status(statusCode).json({
        message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
        });
    }


export { notFound, errorHandler }

$Changes in server.js:

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
    res.send("API is running...")
    }
)

app.use("/api/products", productRoutes)

app.use(notFound)
app.use(errorHandler)


app.listen(port, () => {    
    console.log(`Server running on port ${port}`)
    }
)


$ Changes in productRoutes.js:

import express from "express"
const router = express.Router() 
import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/productModel.js'

router.get('/', asyncHandler ( async (req, res) => {
    const products = await Product.find({})
    // throw new Error("Some error")
    res.json(products)
    }
))

router.get('/:id', asyncHandler (async (req, res) => {
 const product = await Product.findById(req.params.id)
    if (product) {
    res.json(product)
    }
    else {
        res.status(404)
        throw new Error("Ressource not found")

    }
    }
    
))


export default router

 
20. Product Controller 




 



