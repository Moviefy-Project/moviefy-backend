const ContentService = require("../services/ContentService");
const fs = require("fs");

class ContentController {
  static async addContent(req, res) {
    try {
      const contentData = req.body;
      if (req.file) {
        contentData.content_thumbnail = req.file.path;
      }

      const result = await ContentService.addContent(contentData);

      res.status(201).json(result);
    } catch (error) {
      if (req.file) {
        fs.unlink(req.file.path, (err) => {
          if (err) {
            console.error("Error while deleting file:", err);
          } else {
            console.log("File deleted successfully:", req.file.path);
          }
        });
      }
      res.status(400).json({ error: error.message });
    }
  }

  static async getTrendingContent(req, res) {
    const trendingContent = await ContentService.getTrendingContent();

    res.status(200).json(trendingContent);
  }

  static async getAllContent(req, res) {
    const allContent = await ContentService.getAllContent();

    res.status(200).json(allContent);
  }

  static async bookmarkContent(req, res) {
    const user_id = req.user.id;
    const { content_id } = req.body;

    try {
      await ContentService.bookmarkContent(user_id, content_id);

      res.status(200).json({ message: "Content bookmarked successfully" });
    } catch (error) {
      console.error("Error while bookmarking content:", error);
      res.status(400).json({ error: error.message });
    }
  }

  static async getBookmarkedContent(req, res) {
    try {
      const user_id = req.user.id;
      const result = await ContentService.getBookmarkedContent(user_id);
      return res.status(200).json(result);
    } catch (error) {
      console.error("Error while getting bookmarked content:", error);
      return res
        .status(400)
        .json({
          success: false,
          message: "An error occurred while getting bookmarked content.",
        });
    }
  }
}

module.exports = ContentController;
