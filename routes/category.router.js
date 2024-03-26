const router = require("express").Router();
const {
  list,
  create,
  read,
  update,
  delete: _delete,
} = require("../controllers/category.controller");

router.route("/").get(list).post(create);
router.route("/:id").get(read).put(update).delete(_delete);

module.exports = router;
