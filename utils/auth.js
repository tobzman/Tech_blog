// Middleware for checking authentication
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect to login page or perform other actions
  if (!req.session.user_id) {
    res.redirect("/login"); // You can customize the redirection
  } else {
    next();
  }
};

module.exports = withAuth;
