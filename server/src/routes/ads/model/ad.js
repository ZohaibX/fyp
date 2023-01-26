const mongoose = require('mongoose');

const adSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    user: {
      type: Object,
    },
    title: {
      type: String,
    },
    specieName: {
      type: String,
    },
    birdName: {
      type: String,
    },
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
    gender: String,
    age: String,
    contactNumber: {
      type: String,
    },
    sold: {
      type: Boolean, 
      default: false
    },
    reported: {
      type: Boolean, 
      default: false
    },
    date: String,
    favouriteFood: String, 
    images: [
      {
        type: String,
      },
    ],
    locationDetails: {
      type: String,
    },
    city: {
      type: String,
    },
    date: {
      type: Date,
    },
    type: {
      type: String,
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
adSchema.statics.build = (attrs) => {
  return new Ad(attrs);
};

const Ad = mongoose.model('Ad', adSchema);

module.exports = Ad;
