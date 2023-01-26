const { Password } = require('../password-hashing/hashing');
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        itemId: mongoose.Schema.Types.ObjectId,
        type: String,
        title: String,
        specie: [String],
        birdAge: String,
        ratings: Object,
        description: String,
        price: Number,
        images: [String],
        quantity: Number,
        stock: Number,
        userId: String,
        paid: String,
        date: String
    },
    // changing the returns
    {
        toJSON: {
            transform(fullDocument, returns) {
                returns.id = returns._id; // normally , all dbs have id property instead of _id , so we will also use id in mongoose
                delete returns._id;

                delete returns.__v; // we don't want to show mongoose's this property bcoz other dbs don't have this
            }
        }
    }
);

//? this is to apply ts type checking on the attributes -- we provide while creating -- ex at (1)
orderSchema.statics.build = (attrs) => {
    return new Orders(attrs);
};

const Orders = mongoose.model('Orders', orderSchema);

module.exports.Orders = Orders;
