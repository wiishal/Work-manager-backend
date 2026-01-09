import { useEffect, useState } from "react";
import { getSubTasks } from "../services/subtaskService";
import ShowError from "./ShowError";
import { addSubTask } from "../services/subtaskService";
function AddSubTask({ Task }) {
  const [subtaskInput, setSubTaskInput] = useState("");
  const [processing, setProcessing] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [error, setError] = useState(null);
  function subTaskInputHandler(e) {}
  const fetchSubtask = async () => {
    setProcessing(true);
    try {
      const res = await getSubTasks(Task.id);
      console.log(res);
      setSubTasks(res.subtasks);
    } catch (error) {
      console.log(error);
      alert("error");
    } finally {
      setProcessing(false);
    }
  };

  const addSubTaskFunc = async () => {
    if (subtaskInput == "") {
      setError("Empty input");
      return;
    }
    try {
      const res = await addSubTask(subtaskInput, Task.id);
      setSubTasks(res.data.subtask);
    } catch (error) {
      setError("something went Wrong!");
    } finally {
    }
  };
  useEffect(() => {
    fetchSubtask();
  }, []);
  return (
    <div className="addsubTask">
      <h3>Sub Task</h3>
      {error && <ShowError error={error} closeErrorPopUp={setError} />}

      <input
      className="baseInputClass"
        type="text"
        value={subtaskInput}
        onChange={(e) => setSubTaskInput(e.target.value)}
        name=""
        id=""
      />
      <button className="baseBtnClass" onClick={() => addSubTaskFunc()}>
        Add
      </button>
      {processing && <div className="spinner" />}

      {subTasks.length > 0 &&
        subTasks.map((task, i) => (
          <div className="subtaskRender">
            {!task.complete ? (
              <img
                onClick={() => checkSubTask(Task.taskId, i)}
                src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965626/check-box-empty_a4aomp.png"
                alt=""
                width={14}
                height={14}
              />
            ) : (
              <img
                onClick={() => checkSubTask(Task.taskId, i)}
                src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965624/check-box-with-check-sign_iqn92n.png"
                alt=""
                width={14}
                height={14}
              />
            )}

            <p key={i}>{task.detail}</p>
            <img
              onClick={() => {
                deleteSubTask(Task.taskId, i);
              }}
              src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965624/delete_xp9grm.png"
              alt=""
              width={10}
              height={10}
            />
          </div>
        ))}
    </div>
  );
}

export default AddSubTask;
