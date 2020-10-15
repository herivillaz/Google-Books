const router = require("express").Router();
const googleController = require("../../controllers/googleController");


router
  .route("/:title")
  .get(googleController.findbytitle)

  module.exports = router;