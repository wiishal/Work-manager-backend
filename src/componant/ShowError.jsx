export default function ShowError({ error, closeErrorPopUp }) {
  return (
    <div className="expenses-ErrorBaseClass">
      <span>{error}</span>
      <button
        className="expenses-errorClose"
        onClick={() => closeErrorPopUp(null)}
        aria-label="Close error"
      >
        ×
      </button>
    </div>
  );
}
