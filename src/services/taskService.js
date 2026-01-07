const url = import.meta.env.VITE_API_URL;
import axios from "axios";
import axiosInstance from "../lib/axiosInstance";

export async function getAllTasks() {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }
  try {
    const res = await axiosInstance.get(`${url}/task/allTasks`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while getting tasks", error);
    return false;
  }
}

export async function getTask(id) {
  try {
    const res = await axiosInstance.get(`${url}/task/getTask/${id}`);
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while getting task", error);
    return false;
  }
}

export async function addTask(task) {
  try {
    const res = await axiosInstance.post(`${url}/task/addTask`, {
      task,
    });
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while adding task", error);
    return false;
  }
}
export async function updateTask(updatedTask) {
  try {
    const res = await axiosInstance.put(`${url}/task/updateTask`, {
      updatedTask,
    });
    if (res.status !== 200) {
      return false;
    }
    return res;
  } catch (error) {
    console.log("error while updating task", error);
    return false;
  }
}
export async function toggleStatus(id) {
  try {
    const res = await axiosInstance.put(`${url}/task/toggleStatus`, {
      id,
    });
    if (res.status !== 200) {
      return false;
    }
    return res;
  } catch (error) {
    console.log("error while updating task", error);
    return false;
  }
}

export async function deleteTask(id) {
  try {
    const res = await axiosInstance.delete(
      `${url}/task/deleteTask/${id}`
    );
    if (res.status !== 200) {
      return false;
    }
    return res.data;
  } catch (error) {
    console.log("error while deleting task", error);
    return false; 
  }
}
