const express = require('express');
const router = express.Router();
require('dotenv').config();
const currentUser = require('../../middlewares/current-user');
const { User } = require('./model/model');
const {
    BadRequestException,
    NotAuthorizedError
} = require('@zbtickets/common');
const { Password } = require('./password-hashing/hashing');
const jwt = require('jsonwebtoken');
const { findByIdAndRemove } = require('../ads/model/ad');
const Item = require('../foods/model');
const { Orders } = require('./model/order');

router.delete('/api/users/delete-orders', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const user = await User.findById(userId);
    if (!user) throw new BadRequestException('USER NOT FOUND!');

    user.orders = [];
    user.orderedItems = [];
    await user.save();

    res.send('DONE');
});
// FIRST NAME
router.put('/api/users/add-order/:itemId', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    if (!req.params.itemId)
        throw new BadRequestException('Item Details not provided');

    const user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError();

    const item = await Item.findById(req.params.itemId);
    if (!item) throw new BadRequestException('Something went wrong!');

    const index = user.orderedItems.indexOf(item.id);
    if (index >= 0)
        throw new BadRequestException('ITEM IS ALREADY IN THE CART');

    user.orderedItems = [...user.orderedItems, item.id];

    const order = Orders.build({
        itemId: item.id || item._id,
        type: item.type,
        title: item.title,
        specie: item.specie,
        birdAge: item.birdAge,
        ratings: item.ratings,
        description: item.description,
        price: item.price,
        images: item.images,
        quantity: 1,
        stock: item.quantity,
        userId: user.id,
        paid: false,
        date: new Date().toString()
    });
    await order.save();

    user.orders = [...user.orders, order];

    await user.save();
    res.send(user);
});

router.get('/api/users/order-price', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError();

    let price = 0;
    for (let i = 0; i < user.orders.length; i++) {
        price = price + user.orders[i].price;
    }

    res.send({ price });
});

router.delete('/api/user/deleteOrder/:id', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError();

    const order = await Orders.findById(req.params.id);
    if (!order) throw new BadRequestException('ORDER NOT FOUND');

    // user.orderedItems = [];
    const index = user.orderedItems.indexOf(order.itemId);
    if (index < 0) throw new BadRequestException('Something Went Wrong!!!!');
    user.orderedItems.splice(index, 1);
    console.log(1);

    // // user.orders = [];
    let index1 = -1;
    for (let i = 0; i < user.orders.length; i++) {
        if (
            JSON.stringify(user.orders[i]._id) === JSON.stringify(req.params.id)
        )
            index1 = i;
    }

    if (index1 < 0) throw new BadRequestException('Something Went Wrong!!!!!');

    user.orders.splice(index1, 1);

    await user.save();
    await Orders.findByIdAndDelete(order.id);

    res.send('DONE');
});

router.get('/api/users/get-all-orders', currentUser, async (req, res) => {
    const orders = await Orders.find();
    res.send(orders);
});
router.get('/api/users/get-order/:id', currentUser, async (req, res) => {
    const order = await Orders.findById(req.params.id);
    res.send(order);
});

router.get('/api/users/delete-all-orders', currentUser, async (req, res) => {
    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }
    const user = await User.findById(userId);

    user.orders = [];
    user.orderedItems = [];
    user.ordersPaid = [];

    await user.save();
    await Orders.deleteMany();
    res.send('YES');
});

router.put('/api/user/changeQuantity/:id', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
    }

    const { quantity } = req.body;
    if (!quantity) throw new BadRequestException('Quantity Not Provided!');

    let user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError();

    let order = await Orders.findById(req.params.id);
    if (!order) throw new BadRequestException('ORDER NOT FOUND');

    const item = await Item.findById(order.itemId);
    if (!item) throw new BadRequestException('ITEM NOT FOUND');

    order.quantity = quantity;
    order.price = item.price * quantity;

    let userOrders = [...user.orders];

    let index = -1;
    for (let i = 0; i < userOrders.length; i++) {
        if (
            JSON.stringify(userOrders[i]._id) === JSON.stringify(req.params.id)
        ) {
            index = i;
        }
    }

    if (index < 0) throw new BadRequestException('Something Went Wrong');

    user.orders[index] = order;
    await order.save();
    await user.save();

    res.send('ORDER IS UPDATED');
});

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuid } = require('uuid');
const { sendMail } = require('../../services/mailing/server');
const { OrdersPaid } = require('./model/orders-payed');
const { OrdersCompleted } = require('./model/completed_orders');
const Food = require('../foods/model');

router.post('/api/user/payment/', currentUser, async (req, res) => {
    if (!req.currentUser && !req.user)
        throw new NotAuthorizedError('U r not authorized');

    let userId;
    if (req.user) {
        userId = req.user.id;
        userEmail = req.user.email;
    } else if (req.currentUser) {
        userId = req.currentUser.id;
        userEmail = req.currentUser.email;
    }
    const idempotencyKey = uuid(); // to be unique

    const { token, orders } = req.body;

    let user = await User.findById(userId);
    if (!user) throw new NotAuthorizedError();

    // STRIPE WORK

    let customer;

    try {
        customer = await stripe.customers.create({
            email: userEmail,
            source: token.id
        });
    } catch (error) {
        throw new BadRequestException(
            'Error coming from creating customer: ' + error
        );
    }

    let price = 0;
    for (let i = 0; i < user.orders.length; i++) {
        price = price + user.orders[i].price;
    }

    if (price < 1 || price > 1000000)
        alert('Something went wrong with charges amount.');
    let chargesResult;
    try {
        chargesResult = await stripe.charges.create(
            {
                amount: price * 100, // bcoz we are gonna send the price in cents
                currency: 'PKR', // i can read the docs for other currencies
                customer: customer.id
            },
            { idempotencyKey } //? name of the key must be idempotencyKey
        );
    } catch (error) {
        throw new BadRequestException(
            'Error coming from creating charges: ' + error
        );
    }

    // STRIPE RESULTS

    let ordersX = [...user.orders];

    const newUser = await User.findByIdAndUpdate(
        userId,
        {
            orders: [],
            ordersPaid: ordersX,
            orderedItems: []
        },
        { new: true }
    );

    for (let i = 0; i < newUser.ordersPaid.length; i++) {
        const order = await Orders.findById(newUser.ordersPaid[i]._id);
        if (!order) throw new BadRequestException('Order Not Found!!');

        order.paid = true;
        await order.save();
    }

    for (let i = 0; i < orders.length; i++) {
        console.log(orders[i]._id, orders[i].quantity);
        let item = await Item.findById(orders[i].itemId);
        console.log(item);
        item.quantity = item.quantity - orders[i].quantity;
        await item.save();
    }

    for (let i = 0; i < orders.length; i++) {
        orders[i].paid = 'true';
    }

    console.log('h1');
    const orderPaid = OrdersPaid.build({
        order: orders,
        OrderedDate: new Date().toString(),
        userId
    });
    await orderPaid.save();
    console.log('h2');

    let caption = 'Order in Processing!';
    let text = `Your Order has been started to be Processed - We contact you soon through your given Mobile Number and Email ID as Well -- Payment Receipt ${chargesResult.receipt_url} -- Regards TradeTheBird`;
    // MAILING
    try {
        sendMail([user.email], caption, text);
    } catch (error) {
        throw new BadRequestError('error coming from sendgrid server');
    }

    res.status(200).json(chargesResult);
});

router.get('/api/user/get-paid-orders', async (req, res) => {
    const orders = await OrdersPaid.find();

    res.send(orders);
});

router.get('/api/user/get-order-details/:id', async (req, res) => {
    const order = await OrdersPaid.findById(req.params.id);

    res.send(order);
});

var mongoose = require('mongoose');

router.post('/api/user/order-completed/:orderId', async (req, res) => {
    const order = await OrdersPaid.findById(req.params.orderId);
    if (!order) throw new BadRequestException('Something went wrong!');

    const user = await User.findById(order.userId);
    if (!user) throw new NotAuthorizedError();

    // res.send(order.order)
    let totalPrice = 0;
    for (let i = 0; i < order.order.length; i++) {
        totalPrice = totalPrice + order.order[i].price;
    }

    const orderCompleted = OrdersCompleted.build({
        order: order.order,
        userId: order.userId,
        OrderedDate: order.OrderedDate,
        DeliveredDate: new Date().toString(),
        totalPrice
    });
    await orderCompleted.save();

    // var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
    await OrdersPaid.findByIdAndDelete(req.params.orderId);
    user.ordersPaid = [];
    await user.save();

    res.send(orderCompleted);
});

router.get('/api/user/get-completed-orders', async (req, res) => {
    const orders = await OrdersCompleted.find();

    res.send(orders);
});

router.delete(
    '/api/user/delete-older-orders',
    currentUser,
    async (req, res) => {
        if (!req.currentUser && !req.user)
            throw new NotAuthorizedError('U r not authorized');

        let userId;
        if (req.user) {
            userId = req.user.id;
            userEmail = req.user.email;
        } else if (req.currentUser) {
            userId = req.currentUser.id;
            userEmail = req.currentUser.email;
        }

        let user = await User.findById(userId);
        if (!user) throw new NotAuthorizedError();

        // DELETE OLDER ORDERS

        // const orders = await OrdersCompleted.find();

        res.send(orders);
    }
);
module.exports = router;
