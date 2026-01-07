const url = import.meta.env.VITE_API_URL;
import axios from "axios";

export async function getUserTaskStr() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axios.get(`${url}/userStr/userTaskStr`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
    const res = await axios.post(
      `${url}/userStr/addTag`,
      { tag },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
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
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axios.get(`${url}/userStr/tag/${tag}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axios.get(`${url}/userStr/list/${list}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
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
