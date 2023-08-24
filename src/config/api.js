import axios from "axios";

export const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
})

export const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common['Authorization'];
    }
  };

export const registerUser = (userData) => API.post("/registration", userData);
export const loginUser = (userData) => API.post("/login", userData);
export const profile = (profileData) => API.get("/profile", profileData)
export const profileEdit = (profileData) => API.put("/profile/update", profileData)
export const ProfileEditImage = (profileData) => API.put("/profile/image", profileData)
export const Balance = (profileData) => API.get("/balance", profileData)
export const Services = (profileData) => API.get("/services", profileData)
export const Banner = (profileData) => API.get("/banner", profileData)
export const Topup = (profileData) => API.post("/topup", profileData)
export const Transaction = (profileData) => API.post("/transaction", profileData)
export const ListTransaction = (profileData) => API.get("/transaction/history", profileData)