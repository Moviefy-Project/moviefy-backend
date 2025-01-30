const AuthService = require("../services/AuthService");
const fs = require("fs");
const passport = require("passport");

class AuthController {
  static async register(req, res) {
    try {
      const userData = req.body;
      if (req.file) {
        userData.profile_picture = req.file.path;
      }

      const result = await AuthService.register(userData);

      res.status(201).json(result); // HTTP 201 Created
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
      res.status(400).json({ error: error.message }); // HTTP 400 Bad Request
    }
  }

  static async login(req, res) {
    try {
      console.log("Login request email_address:", req.body.email_address);
      console.log("Login request password:", req.body.password);

      const { token, user } = await AuthService.login(req.body);

      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000, // 1 hour
      });

      console.log("Cookie set");

      res.status(200).json({ message: "Login successful", user }); // HTTP 200 OK
    } catch (error) {
      console.log("Login error:", error.message);
      res.status(401).json({ error: error.message }); // HTTP 401 Unauthorized
    }
  }

  static async logout(req, res) {
    res.clearCookie("authToken");
    res.status(200).json({ message: "Logout successful" });
  }

  static async googleCallBack(req, res, next) {
    passport.authenticate(
      "google",
      { failureRedirect: "/" },
      (err, userData) => {
        if (err) {
          console.log("Google authentication failed:", err);
          return res
            .status(500)
            .json({ error: "Google authentication failed" });
        }

        return res.status(200).json({
          success: true,
          token: userData.token,
          user: userData.user,
        });
      }
    )(req, res, next);
  }
}

module.exports = AuthController;
