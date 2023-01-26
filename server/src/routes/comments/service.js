const GetAllComments = require('./get-all-comments');
const CreateComment = require('./create-comments');
const GetComment = require('./get-comment');
const VoteReply = require('./vote-reply');
const DeleteComment = require('./delete-comment');
const UserComments = require('./user-comments');

module.exports = (app) => {
  app.use(GetAllComments);
  app.use(GetComment);
  app.use(CreateComment);
  app.use(VoteReply);
  app.use(DeleteComment);
  app.use(UserComments);
};
