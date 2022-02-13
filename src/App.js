import "./App.css";
import React, { useState } from "react";
import FormComponent from "./FormComponent.js";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import initialData from "./initialData";

export default function App() {
  const [userInput, setUserInput] = useState("");
  const [toDoList, setToDoList] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState("");
  const [editInputValue, setEditInputValue] = useState("");

  // function to handle the onsubmit(add a task)
  function handleFormSubmit(event) {
    event.preventDefault();
    const newTask = {
      taskContent: userInput,
      id: Math.floor(Math.random() * 10000),
      completed: false,
    };
    setToDoList((previous) => [...previous, newTask]);
    setUserInput("");
  }

  // TO SET THE VALUE ENTERED BY USER
  function getUserInput(event) {
    setUserInput(event.target.value);
  }

  // CHECKBOX HANDLER
  function markDone(listItemId) {
    let newTodoList = toDoList.map((toDoItem) => {
      if (toDoItem.id == listItemId) {
        toDoItem.completed = !toDoItem.completed;
      }
      return toDoItem;
    });
    setToDoList(newTodoList);
  }

  // DELETE FUNCTION HANDLER
  function handleDeleteItem(listItemId) {
    const newTodoList = toDoList.filter((item) => item.id !== listItemId);
    setToDoList(newTodoList);
  }

  function handleEditItem(listItem) {
    setEditId(listItem.id);
    setEditInputValue(listItem.taskContent);
    setIsEditing(true);
  }
  //   Get edit input value when editing
  function getEditInputValue(event) {
    setEditInputValue(event.target.value);
    console.log(event.target.value);
  }

  // replacing the value in the list

  function performEditOperation(listItem, index) {
    if (editInputValue.trim()) {
      let editedToDo = { ...listItem };
      editedToDo.taskContent = editInputValue.trim();
      console.log(editedToDo.taskContent);
      let newToDoList = [...toDoList];
      newToDoList[index] = editedToDo;
      setToDoList(newToDoList);
    } else {
      setEditInputValue(listItem.taskContent);
    }
  }

  //RETURN STATEMENT OF APP.JS
  return (
    <div className="App">
      <FormComponent
        userInput={userInput}
        handleFormSubmit={handleFormSubmit}
        getUserInput={getUserInput}
      />

      <h2 className="todo-header">
        Tasks<span> - {toDoList.length}</span>
      </h2>
      <ul className="ul-list">
        {toDoList.map((listItem, index) => (
          <li key={listItem.id} className="list-item">
            <div className="todo-item">
              <input
                className="check-input"
                type="checkbox"
                name="todo-list"
                value={listItem.completed ? true : false}
                onClick={() => markDone(listItem.id)}
              />

              {isEditing && editId === listItem.id ? (
                <>
                  <input
                    type="text"
                    className="edit-input"
                    autoFocus
                    value={editInputValue}
                    onChange={getEditInputValue}
                    onKeyDown={(e) => {
                      if (e.keyCode === 13) {
                        setIsEditing(false);
                        performEditOperation(listItem, index);
                      }
                    }}
                    name="edit-input"
                    autoComplete="off"
                  />
                  <FontAwesomeIcon
                    className="accept-icon"
                    icon={faCheck}
                    onClick={() => {
                      setIsEditing(false);
                      performEditOperation(listItem, index);
                    }}
                  ></FontAwesomeIcon>
                </>
              ) : (
                <>
                  <span
                    className={classnames(
                      listItem.completed && "toDoItemCompleted",
                      !listItem.completed && "toDoContent"
                    )}
                  >
                    {listItem.taskContent}
                  </span>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="edit-icon"
                    onClick={() => handleEditItem(listItem)}
                  ></FontAwesomeIcon>
                </>
              )}
              <FontAwesomeIcon
                className="delete-icon"
                icon={faTrash}
                onClick={() => handleDeleteItem(listItem.id)}
              ></FontAwesomeIcon>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
