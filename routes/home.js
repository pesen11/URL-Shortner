const express = require("express");
const router = express.Router();

const shortnerController = require("../controllers/shortner");

router.get("/", shortnerController.getIndex);
router.post("/shorten", shortnerController.postURL);
// In this whatever comes after /: becomes params
router.get("/:idURL", shortnerController.originalRedirect);

module.exports = router;
