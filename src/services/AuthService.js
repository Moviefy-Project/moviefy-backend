const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  static async register(userData) {
    const { email_address, password, profile_picture } = userData;

    const existingUser = await Users.findOne({
      where: {
        email_address,
      },
    });

    if (existingUser) {
      throw new Error("Email already taken");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
      email_address,
      password: hashedPassword,
      profile_picture,
    });

    console.log("User created successfully:", newUser.email_address);

    return newUser;
  }

  static async login(userData) {
    const { email_address, password } = userData;

    const user = await Users.findOne({
      where: {
        email_address,
      },
    });

    if (!user) throw new Error("User not found");

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new Error("Invalid password");

    const token = jwt.sign(
      { id: user.id, email_address: user.email_address },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`Token oluşturuldu: ${token}`);

    return { token, user };
  }
}

module.exports = AuthService;
