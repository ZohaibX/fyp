const Register = require('./register');
const SignIn = require('./sign-in');
const CurrentUser = require('./current-user');
const CurrentUserData = require('./current-user-data');
const ChangePassword = require('./change-password');
const Passport = require('./passport');
const SignOut = require('./sign-out');
const { ImageUploads } = require('./image-upload/service');

const GetAllUserAccounts = require('./admin-routes/get-all-user-accounts');
const GetUserDetails = require('./admin-routes/get-user-details');
const WarnAlert = require('./admin-routes/warn-alert');
const BanUser = require('./admin-routes/ban-user');
const UnbanUser = require('./admin-routes/unban-user');
const DeleteUser = require('./admin-routes/delete-user');
const DeleteAllUsers = require('./admin-routes/delete-all-users');
const RemUser = require('./delete-user');
const Edit = require('./edit-user-details');

const OrderItem = require('./orders');

module.exports = (app) => {
  app.use(Register);
  app.use(SignIn);
  app.use(SignOut);
  app.use(CurrentUser);
  app.use(CurrentUserData);
  app.use(ChangePassword);
  app.use(Passport);
  app.use(Edit);

  app.use(OrderItem);

  // Admin Routes
  app.use(GetAllUserAccounts);
  app.use(GetUserDetails);
  app.use(WarnAlert);
  app.use(BanUser);
  app.use(UnbanUser);
  app.use(DeleteUser);
  app.use(DeleteAllUsers);
  app.use(RemUser);

  ImageUploads(app);
};
