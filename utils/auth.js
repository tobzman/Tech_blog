const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect to login page or perform other actions
  if (!req.session.loggedIn) {
    res.redirect("/login"); // You can customize the redirection
  } else {
    next();
  }
};

module.exports = withAuth;
