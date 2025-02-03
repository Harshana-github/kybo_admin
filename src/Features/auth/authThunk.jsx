import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/login`,
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      localStorage.removeItem("Kybo");
    } catch (error) {
      throw error;
    }
  }
);