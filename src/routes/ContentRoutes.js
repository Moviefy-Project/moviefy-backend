const express = require('express');
const router = express.Router();
const ContentController = require("../controllers/ContentController.js");
const upload = require('../middlewares/upload.js');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post("/add-content", authenticateToken, upload.single("content_thumbnail"), ContentController.addContent);
router.get("/trending-content", authenticateToken, ContentController.getTrendingContent);
router.get("/all-content", authenticateToken, ContentController.getAllContent);
router.post("/bookmark-content", authenticateToken, ContentController.bookmarkContent);
router.get("/bookmarked-content", authenticateToken, ContentController.getBookmarkedContent);

module.exports = router;