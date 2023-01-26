const { Password } = require('../password-hashing/hashing');
const mongoose = require('mongoose');

const OrdersPaidSchema = new mongoose.Schema(
  {
    order: [Object], 
    OrderedDate: {
      type: String ,
      required: true
    } , 
    userId: String,
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
OrdersPaidSchema.statics.build = (attrs) => {
  return new OrdersPaid(attrs);
};

const OrdersPaid = mongoose.model('OrdersPaid', OrdersPaidSchema);

module.exports.OrdersPaid = OrdersPaid;
