const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema(
  {
    type: {
      type: String,
    },
    title: {
      type: String,
    },
    specie: Array,
    birdName: String, 
    birdAge: String,
    ratings: {
      type: Object,
      default: {
        totalRatings: 0,
        RatingIndividuals: 0,
      },
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
    },
    faqs: {
      type: [String] ,
      default: []
    },
    images: [
      {
        type: String,
      },
    ],
    date: {
      type: String,
    },
    quantity: Number 
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
foodSchema.statics.build = (attrs) => {
  return new Food(attrs);
};

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
