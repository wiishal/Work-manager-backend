import axiosInstance from "../lib/axiosInstance";
const url = import.meta.env.VITE_API_URL;

async function checkSubTask(id, i) {
  try {
    const res = axios.post("http://localhost:3000/api/toggleSubtask", {
      id: id,
      index: i,
    });
  } catch (error) {
    return false;
  }
}
function deleteSubTask(subTask, subTaskindex) {
  axios
    .post("http://localhost:3000/api/deleteSubTask", {
      id: subTask,
      index: subTaskindex,
    })
    .then((res) => {
      console.log(res.data);
    });
}

export async function getSubTasks(taskId) {
  const res = await axiosInstance.post(`${url}/subtask`, { taskId });

  return res.data;

  // res.data.subtasks
}
export async function addSubTask(detail, taskId) {
  const res = await axiosInstance.post(`${url}/subtask/addSubTask`, {
    subTask: { detail, taskId },
  });

  return res.data;
}
