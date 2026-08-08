import bcrypt from "bcrypt";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// @route   POST /api/auth/register
// @desc    Yeni istifadəçi qeydiyyatı
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email artıq qeydiyyatdan keçib" });
    }

    // Şifrəni hash edirik
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      // role göndərilmir — hər kəs default "user" olaraq yaranır
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Qeydiyyat uğurla tamamlandı",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// @route   POST /api/auth/login
// @desc    İstifadəçi girişi
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email və ya şifrə yanlışdır" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Email və ya şifrə yanlışdır" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Giriş uğurludur",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};

// @route   GET /api/auth/profile
// @desc    Cari daxil olmuş istifadəçinin məlumatını qaytarır
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "İstifadəçi tapılmadı" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server xətası", error: error.message });
  }
};