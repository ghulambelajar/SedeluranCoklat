const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama lengkap wajib diisi"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password_hash: {
      type: String,
      required: [true, "Kata sandi wajib diisi"],
    },
    phone_wa: {
      type: String,
      required: [true, "Nomor WhatsApp wajib diisi"],
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      default: "buyer",
    },
    is_verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically create created_at and updated_at columns
  },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
