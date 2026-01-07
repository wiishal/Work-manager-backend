import { useState } from "react";
function AddSpendCard({ fetchSpends }) {
  function AddCard() {}

  function handleIsAddSpendCard() {
    AddCard();
    console.log("addspend()");
  }
  return (
    <>
      {" "}
      <div>
        <button onClick={handleIsAddSpendCard} className="styled-button">
          Add
        </button>
      </div>
    </>
  );
}

export default AddSpendCard;
