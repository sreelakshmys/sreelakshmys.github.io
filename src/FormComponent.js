import React from "react";

export default function FormComponent({
  userInput,
  handleFormSubmit,
  getUserInput,
}) {
  return (
    <div className="container">
      <h1 className="pageTitle">TODO LIST</h1>
      <form className="toDoForm">
        <input
          className="todoInputField"
          type="text"
          placeholder="Enter the task here"
          required={true}
          value={userInput}
          onChange={getUserInput}
        />
        <button onClick={handleFormSubmit} className="btn-add">
          +
        </button>
      </form>
    </div>
  );
}
