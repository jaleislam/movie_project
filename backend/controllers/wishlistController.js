import User from "../models/User.js";

// @route   GET /api/wishlist
// @desc    Istifadecinin wishlist-ini getirir
export const getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "Istifadeci tapilmadi" });
    }
    res.status(200).json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server xetasi", error: error.message });
  }
};

// @route   POST /api/wishlist/:movieId
// @desc    Filmi wishlist-e elave edir
export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { movieId } = req.params;

    if (user.wishlist.includes(movieId)) {
      return res.status(400).json({ message: "Film artiq wishlist-dedir" });
    }

    user.wishlist.push(movieId);
    await user.save();

    res.status(200).json({ message: "Wishlist-e elave olundu", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server xetasi", error: error.message });
  }
};

// @route   DELETE /api/wishlist/:movieId
// @desc    Filmi wishlist-den silir
export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const { movieId } = req.params;

    user.wishlist = user.wishlist.filter((id) => id.toString() !== movieId);
    await user.save();

    res.status(200).json({ message: "Wishlist-den silindi", wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server xetasi", error: error.message });
  }
};