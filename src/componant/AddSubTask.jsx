import { useState } from "react";
import axios from "axios";

function AddSubTask({ Task, editTaskDiv, fetchTasks }) {
  const [subtaskInput, setSubTaskInput] = useState();

  function subTaskInputHandler(e) {
    setSubTaskInput(e.target.value);
  }
  return (
    <div className="addsubTask">
      <h3>Sub Task</h3>
      <input
        type="text"
        value={subtaskInput}
        onChange={subTaskInputHandler}
        name=""
        id=""
      />
      <button
        className="styled-button"
        onClick={() => addSubTask(Task[editTaskDiv].taskId)}
      >
        Add
      </button>
      {Task[editTaskDiv].subtask.map((task, i) => (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            height: "fit-content",
            gap: "5px",
          }}
        >
          {task.status === false ? (
            <img
              onClick={() => checkSubTask(Task[editTaskDiv].taskId, i)}
              src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965626/check-box-empty_a4aomp.png"
              alt=""
              width={14}
              height={14}
            />
          ) : (
            <img
              onClick={() => checkSubTask(Task[editTaskDiv].taskId, i)}
              src="https://res.cloudinary.com/ddg85vpnk/image/upload/v1739965624/check-box-with-check-sign_iqn92n.png"
              alt=""
              width={14}
              height={14}
            />
          )}

          <p
            style={{
              marigin: "2px",
              color: "rgb(100, 100, 100)",
              fontSize: "0.8em",
              cursor: "pointer",
              fontWeight: "500",
            }}
            key={i}
          >
            {task.text}
          </p>
          <img
            onClick={() => {
              deleteSubTask(Task[editTaskDiv].taskId, i);
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
