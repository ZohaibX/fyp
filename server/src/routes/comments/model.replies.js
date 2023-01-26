const mongoose = require('mongoose');

const replySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    userTitle: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    description: {
      type: String,
    },
    votes: {
      type: Number,
      default: 0,
    },
    votesReferences: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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
replySchema.statics.build = (attrs) => {
  return new Reply(attrs);
};

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;
