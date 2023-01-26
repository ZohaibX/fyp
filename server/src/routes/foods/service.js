const GetAllItems = require('./getAllItems');
const PostItem = require('./post-item');
const GetItem = require('./getSingleItem');

const DeleteItem = require('./delete-item');
const UpdateItem = require('./update-item');
const LikeItem = require('./like-item');
const GetUserItems = require('./get-user-items');
const PostOrders = require('./orders/post-order');
const GetOrders = require('./orders/get-orders');
const GetOrder = require('./orders/get-order');
const GetUserOrders = require('./orders/get-user-orders');
const DeleteOrder = require('./orders/delete-order');
const OrderCompleted = require('./orders/order-completed');

module.exports = (app) => {
  app.use(GetAllItems);
  app.use(PostItem);
  app.use(GetItem);
  app.use(DeleteItem);
  app.use(UpdateItem);
  app.use(LikeItem);
  app.use(GetUserItems);

  app.use(PostOrders);
  app.use(GetOrders);
  app.use(GetOrder);
  app.use(GetUserOrders);
  app.use(DeleteOrder);
  app.use(OrderCompleted);
};
