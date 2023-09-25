const checkIdleSession = (req, res, next) => {
  if (req.session.idle) {
    return res.status(400).json({ message: "relogin" });
  } else {
    next();
  }
};

module.exports = checkIdleSession;
