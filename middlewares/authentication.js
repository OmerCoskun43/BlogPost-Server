module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization || null; // Token ...tokenKey...
  // console.log("Authentication", auth);

  // if (!auth) {
  //   res.errorStatusCode = 401;
  //   throw new Error("There is not Token.You should Provide valid Token");
  // }

  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

  if (tokenKey && tokenKey[0] == "Token") {
    if (tokenKey[1]) {
      req.user = { token: tokenKey[1] };
      // console.log("req.user", req.user);
    }
  }

  next();
};
