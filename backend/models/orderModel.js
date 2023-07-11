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
