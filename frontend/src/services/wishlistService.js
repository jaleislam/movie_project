import api from "./api";

export const getWishlist = async () => {
  const response = await api.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (movieId) => {
  const response = await api.post(`/wishlist/${movieId}`);
  return response.data;
};

export const removeFromWishlist = async (movieId) => {
  const response = await api.delete(`/wishlist/${movieId}`);
  return response.data;
};