async function checkSubTask(id, i) {
  try {
    const res = axios.post("http://localhost:3000/api/toggleSubtask", {
      id: id,
      index: i,
    });
  } catch (error) {
    return false
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

function addSubTask(id) {
  if (subtaskInput == "") return;
  console.log(id);

  const newSubtask = {
    text: subtaskInput,
    status: false,
  };
  axios
    .post("http://localhost:3001/api/addSubTask", {
      id: id,
      subtask: newSubtask,
    })
    .then((res) => {
      console.log(res.data);
      fetchTasks();
    });

  setSubTaskInput("");
}
