const router = require("express").Router();
const {
  list,
  create,
  read,
  update,
  delete: _delete,
  myBlogs,
} = require("../controllers/blog.controller");

const { isLogin } = require("../middlewares/permissions");

router.route("/myblogs/:id").get(isLogin, myBlogs);

router.route("/").get(list).post(isLogin, create);
router.route("/:id").get(isLogin, read).put(update).delete(isLogin, _delete);

module.exports = router;
