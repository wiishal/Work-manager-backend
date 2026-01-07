import { useState,useEffect } from "react";
import ShowError from "./ShowError";
import { addExpense } from "../services/expensesService";
function ExpensesCard({ item, fetchExpenses }) {
  const [spends, setSpends] = useState([]) ;
  const [spendInput, setSpendInput] = useState("");
  const [totolExpense, setTotalExpense] = useState();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);


  async function addSpends() {
    const value = spendInput.trim("");
    if (value == "") {
      setError("Empty inputs");
      return;
    }

    try {
      setProcessing(true);
      setError(null);
      const res = await addExpense(value, item.id);
      fetchExpenses();
    } catch (error) {
      setError("error while adding entry");
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
      {processing && <div className="spinner"/>}

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
