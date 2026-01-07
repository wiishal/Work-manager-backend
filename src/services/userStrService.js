const url = import.meta.env.VITE_API_URL;
import axiosInstance from "../lib/axiosInstance";
export async function getUserTaskStr() {
  try {
    const res = await axiosInstance.get(`${url}/userStr/userTaskStr`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while getting userstr");
    return false;
  }
}

export async function addtag(tag) {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axiosInstance.post(`${url}/userStr/addTag`, { tag });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.error("Error adding tag:", error.response?.data || error.message);
    return false;
  }
}

export async function getTagTask(tag) {
  try {
    const res = await axiosInstance.get(`${url}/userStr/tag/${tag}`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.error(
      "Error getting tagged tasks:",
      error.response?.data || error.message
    );
    return false;
  }
}

export async function getListTask(list) {
  try {
    const res = await axiosInstance.get(`${url}/userStr/list/${list}`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.error(
      "Error getting tagged tasks:",
      error.response?.data || error.message
    );
    return false;
  }
}
