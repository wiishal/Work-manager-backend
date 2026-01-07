import "../style/expenses.css";
import ExpensesCard from "../componant/ExpensesCard";
import { useCallback, useEffect, useState } from "react";
import { fetchExpensesCards } from "../services/expensesService";
import ExpensesPopup from "../componant/ExpensesPopUp";

function Expenses() {
  const [cards, setCards] = useState([]);
  const [isAddCard, setIsAddCard] = useState(false);
  const [loading,setLoading] = useState(false)
  const fetchExpenses = useCallback(async () => {
    try {
      const res = await fetchExpensesCards();
      setCards(res);
      setLoading(false)
    } catch (error) {
      alert("error!");
    }
  }, []);
  useEffect(() => {
    setLoading(true)
    fetchExpenses();
  }, []);
  return (
    <div className="expenses-main">
      <div className="expenses-UpperSection">
        <h1 className="expenses-mainTitle">Expenses</h1>
        <button
          className="expenses-mainAddbtn"
          onClick={() => setIsAddCard(true)}
        >
          Add
        </button>
      </div>
      {isAddCard && (
        <ExpensesPopup
          setIsAddCard={setIsAddCard}
          fetchExpenses={fetchExpenses}
        />
      )}
      <div className="expenses-LowerSection">
        {loading && <div className="loading-div">loading....</div>}
        <div className="expenses-cardDiv">
          {cards &&
            cards.length > 0 &&
            cards.map((item) => <ExpensesCard item={item} fetchExpenses={fetchExpenses}/>)}
        </div>
      </div>
    </div>
  );
}

export default Expenses;
