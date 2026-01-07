import { useState, useEffect } from "react";
import SelectTags from "../tags/SelectTags";
import { addTask } from "../../services/taskService";
import List from "../list/List";
import { useFormatDate } from "../../hooks/useFormateDate";

export default function AddTask({ setRender }) {
  const { date } = useFormatDate();
  const [error, setError] = useState(null);
  const [tagStack, setTagStack] = useState([]);
  const [listSelect, setListSelect] = useState([]);
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    taskDescription: "",
    date: "",
    list: [],
    tags: [],
  });

  useEffect(() => {
    if (date) {
      setTaskDetails((prev) => ({
        ...prev,
        date: date,
      }));
    }
  }, [date]);

  function inputHandler(e, field) {
    setTaskDetails((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function checkInputs(data) {
    return Object.values(data).some((detail) => detail === "");
  }
  function clearInputs() {
    setTaskDetails((prev) => ({
      ...prev,
      title: "",
      taskDescription: "",
      tags: [],
      list: [],
    }));
  }
  async function addtask() {
    const data = { title: taskDetails.title, date: taskDetails.date };

    if (checkInputs(data)) {
      setError("check inputs");
      return;
    }

    const res = await addTask({
      ...data,
      taskDescription: taskDetails.taskDescription,
      tags: tagStack,
      list: listSelect,
    });

    if (res) {
      alert("task added successfully");
      setError(null);
      setRender((prev) => !prev);
      clearInputs()
    }
  }

  return (
    <div className="addtask-main">
      {error && <div>{error}</div>}
      <div className="addtask-title">
        <label>Title</label>
        <input
          onChange={(e) => inputHandler(e, "title")}
          value={taskDetails.title}
          className="addtask-titleInput"
        />
      </div>

      <div className="addtask-des">
        <label>Description</label>
        <textarea
          onChange={(e) => inputHandler(e, "taskDescription")}
          value={taskDetails.taskDescription}
          className="addtask-desInput"
        />
      </div>

      <div className="addtask-date">
        <label>Date</label>
        <input
          type="date"
          onChange={(e) => inputHandler(e, "date")}
          value={taskDetails.date}
          className="addtask-dateInput"
        />
      </div>

      <List listSelect={listSelect} setListSelect={setListSelect} />
      <SelectTags tagStack={tagStack} setTagStack={setTagStack} />

      <button className="styled-button addtask-addBtn" onClick={addtask}>
        Add
      </button>
    </div>
  );
}
