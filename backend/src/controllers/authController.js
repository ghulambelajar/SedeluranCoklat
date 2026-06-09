const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, email, phone_wa, password } = req.body;

    if (!name || !email || !phone_wa || !password) {
      return res.status(400).json({ message: "Semua kolom wajib diisi" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Kata sandi minimal 8 karakter" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email sudah terdaftar, silakan gunakan email lain" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      phone_wa,
      password_hash: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "Registrasi berhasil!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Error saat register:", error);
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};
