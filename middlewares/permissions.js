module.exports = {
  isLogin: (req, res, next) => {
    // console.log("Permissions ==>", req.user);
    if (!req.user.token) {
      res.send({ error: true, message: "User Not Logged In" });
    }
    next();
  },
};
