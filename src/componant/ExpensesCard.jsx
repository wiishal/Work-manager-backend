import { useState,useEffect } from "react";
import ShowError from "./ShowError";
import { addExpense } from "../services/expensesService";
function ExpensesCard({ item, fetchExpenses }) {
  const [spends, setSpends] = useState([]) ; //expenses is an []
  const [spendInput, setSpendInput] = useState("");
  const [totolExpense, setTotalExpense] = useState();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);

  /*[
      {
          "id": 2,
          "name": "trip",
          "userId": 1,
          "createdAt": "2026-01-05T17:25:26.097Z",
          "expenses": []
      }
  ] */

  async function addSpends() {
    const value = spendInput.trim("");
    if (value == "") {
      setError("Empty inputs");
      return;
    }

    try {
      setProcessing(true);
      setError(null);
      console.log("req for add expense", value);
      const res = await addExpense(value, item.id);
      console.log("response from addexpense :", res);
      fetchExpenses();
    } catch (error) {
      console.log("error while adding expenses", error);
    } finally {
      setProcessing(false);
      setSpendInput("");
    }
  }
  useEffect(() => {
  setSpends(item.expenses);
}, [item.expenses]);


  return (
    <div key={item.id} className="expenses-card">
      <div className="expensesCard-titleDiv">
        <p className="expensesCard-title">
          {item.createdAt.split("T")[0]}
        </p>
        <button className="expenses-Calculatebtn" onClick={() => {}}>
          Calculate
        </button>
      </div>

      <div className="expenses-cardContent">
        <div className="expenses-ItemTitleDiv">
          <h4>{item.name}</h4>
        </div>
        {spends && spends.length > 0 && spends.map((item) => <div>{item.details}</div>)}
      </div>
      {error && <ShowError error={error} closeErrorPopUp={setError} />}
      {processing && <div>processing...</div>}

      <div className="expenses-cardInputs">
        <input
          className="expense-Addinput"
          value={spendInput}
          onChange={(e) => setSpendInput(e.target.value)}
          type="text"
          name=""
          id=""
          placeholder="Add expenses"
        />
        <button className="baseBtnClass" onClick={() => addSpends()}>
          add
        </button>
      </div>
      <div className="expenses-totalExpenseDiv">{totolExpense}</div>
    </div>
  );
}

export default ExpensesCard;
