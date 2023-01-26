const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    itemId: {
      type: String,
    },
    itemTitle: String,
    itemBirdName: {
      type: String,
    },
    itemBreedName: {
      type: String,
    },
    itemPrice: {
      type: Number,
    },
    userEmail: String,
    username: String,
    userId: String,

    city: String,
    address: String,
    phoneNumber: String,
    completed: {
      type: String,
      default: false,
    },
  },
  // changing the returns
  {
    toJSON: {
      transform(fullDocument, returns) {
        returns.id = returns._id; // normally , all dbs have id property instead of _id , so we will also use id in mongoose
        delete returns._id;

        delete returns.__v; // we don't want to show mongoose's this property bcoz other dbs don't have this
      },
    },
  }
);

//? this is to apply ts type checking on the attributes -- we provide while creating -- ex at (1)
orderSchema.statics.build = (attrs) => {
  return new Order(attrs);
};

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
