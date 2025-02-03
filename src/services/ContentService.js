const Content = require("../models/Contents");
const Bookmark = require("../models/Bookmarks");
const User = require("../models/Users");
const Category = require("../models/Categories");
const Rating = require("../models/Ratings");
const { Op } = require("sequelize");

class ContentService {
  static async addContent(contentData) {
    const {
      content_title,
      content_year,
      content_thumbnail,
      category_id,
      rating_id,
      is_trending,
    } = contentData;

    const newContent = await Content.create({
      content_title,
      content_year,
      content_thumbnail,
      category_id,
      rating_id,
      is_trending,
    });

    console.log("Content created successfully:", newContent.content_title);

    return newContent;
  }

  static async getTrendingContent() {
    try {
      const trendingContent = await Content.findAll({
        where: { is_trending: true },
        attributes: [
          "id",
          "content_title",
          "content_year",
          "content_thumbnail",
        ],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
          {
            model: Rating,
            as: "rating",
            attributes: ["rating_name"],
          },
        ],
      });

      return { success: true, contents: trendingContent };
    } catch (error) {
      console.error("Error while fetching trending content:", error);
      return {
        success: false,
        message: "An error occurred while fetching trending content.",
      };
    }
  }

  static async getAllContent() {
    try {
      const allContent = await Content.findAll({
        attributes: [
          "id",
          "content_title",
          "content_year",
          "content_thumbnail",
        ],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
          {
            model: Rating,
            as: "rating",
            attributes: ["rating_name"],
          },
        ],
      });

      return { success: true, contents: allContent };
    } catch (error) {
      console.error("Error while fetching content:", error);
      return {
        success: false,
        message: "An error occurred while fetching content.",
      };
    }
  }

  static async bookmarkContent(user_id, content_id) {
    try {
      const existingBookmark = await Bookmark.findOne({
        where: {
          user_id: user_id,
          content_id: content_id,
        },
      });

      if (existingBookmark) {
        throw new Error("Content already bookmarked");
      }

      await Bookmark.create({
        user_id: user_id,
        content_id: content_id,
      });

      return { success: true, message: "Content bookmarked successfully" };
    } catch (error) {
      console.error("Error while bookmarking content:", error);
      return {
        success: false,
        message: "An error occurred while bookmarking a content.",
      };
    }
  }

  static async getBookmarkedContent(user_id) {
    try {
      const user = await User.findByPk(user_id, {
        include: {
          model: Content,
          as: "BookmarkedContents",
          attributes: [
            "id",
            "content_title",
            "content_year",
            "content_thumbnail",
          ],
          include: [
            {
              model: Category,
              as: "category",
              attributes: ["category_name"],
            },
            {
              model: Rating,
              as: "rating",
              attributes: ["rating_name"],
            },
          ],
          through: {
            attributes: [],
          },
        },
      });

      if (!user) {
        return { success: false, message: "User not found" };
      }

      return { success: true, bookmarks: user.BookmarkedContents };
    } catch (error) {
      console.error("Error while getting bookmarked content:", error);
      return {
        success: false,
        message: "An error occurred while getting bookmarked content.",
      };
    }
  }

  static async getAllMovies() {
    try {
      const allMovies = await Content.findAll({
        attributes: [
          "id",
          "content_title",
          "content_year",
          "content_thumbnail",
        ],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
          {
            model: Rating,
            as: "rating",
            attributes: ["rating_name"],
          },
        ],
        where: {
          category_id: 2,
        },
      });

      return { success: true, movies: allMovies };
    } catch (error) {
      console.error("Error while fetching movies:", error);
      return {
        success: false,
        message: "An error occurred while fetching movies.",
      };
    }
  }

  static async getAllTVSeries() {
    try {
      const allTVSeries = await Content.findAll({
        attributes: [
          "id",
          "content_title",
          "content_year",
          "content_thumbnail",
        ],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
          {
            model: Rating,
            as: "rating",
            attributes: ["rating_name"],
          },
        ],
        where: {
          category_id: 1,
        },
      });

      return { success: true, tvSeries: allTVSeries };
    } catch (error) {
      console.error("Error while fetching TV Series:", error);
      return {
        success: false,
        message: "An error occurred while fetching TV Series.",
      };
    }
  }

  static async searchContent(searchQuery) {
    try {
      if (!searchQuery) {
        return { success: false, message: "Search query is required" };
      }

      const results = await Content.findAll({
        where: {
          content_title: { [Op.iLike]: `${searchQuery}%` },
        },
        attributes: [
          "id",
          "content_title",
          "content_year",
          "content_thumbnail",
        ],
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["category_name"],
          },
          {
            model: Rating,
            as: "rating",
            attributes: ["rating_name"],
          },
        ],
      });

      if (!results || results.length === 0) {
        return { success: false, message: "No content found" };
      }

      return { success: true, contents: results };
    } catch (error) {
      console.error("🔴 Error while searching content:", error);
      return {
        success: false,
        message: "An error occurred while searching content.",
      };
    }
  }
}

module.exports = ContentService;
