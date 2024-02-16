import { useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [doneTodos, setDoneTodos] = useState([]);
  const [applySwitch, setApplySwitch] = useState(false);
  const [switchTo, setwitchTo] = useState("Finished");
  const [newTodo, setNewTodo] = useState("");
  const [modeState, setModeState] = useState("☀️");
  const [bgColor, setBgColor] = useState({
    innerContainer: "black",
    upperPart: "black",
    upperPart_Box: "1px 1px 15px white",
    inputColor: "white",
    addColor: "black",
    downPartColor: "white",
    downPart_Box: "1px 1px 10px white",
    doneBtnColor: "white",
  });
  let tableData = "";

  const removeItem = (id, location = todos) => {
    setTodos(location.filter((todo, todoID) => todoID !== id));
  };

  const switchToDone = () => {
    if (!applySwitch) {
      setApplySwitch(true);
      setwitchTo("List");
    } else {
      setApplySwitch(false);
      setwitchTo("Finished");
    }
  };

  console.log(modeState);

  if (!applySwitch) {
    tableData = todos.map((todo, id) => (
      <tr key={id} className="todo-item">
        <td className="value">{todo}</td>
        <td className="check">
          <button
            onClick={() => {
              setDoneTodos([todo, ...doneTodos]);
              removeItem(id);
            }}
            className="done-btn"
          >
            Done
          </button>
        </td>
        <td className="close">
          <FontAwesomeIcon
            onClick={() => {
              removeItem(id);
            }}
            icon={faTrash}
            color="red"
            style={{ cursor: "pointer" }}
          />
        </td>
      </tr>
    ));
  } else {
    tableData = doneTodos.map((todo, id) => (
      <tr key={id} className="todo-item">
        <td className="value">{todo}</td>
        <td className="check"></td>
        <td className="close"></td>
      </tr>
    ));
  }

  console.log(bgColor.innerContainer);

  return (
    <div className="outer-container">
      <button
        className="model-btn"
        onClick={() => {
          if (modeState === "🌑") {
            setModeState("☀️");
            setBgColor({
              innerContainer: "black",
              upperPart: "black",
              upperPart_Box: "1px 1px 15px white",
              inputColor: "white",
              addColor: "black",
              downPartColor: "white",
              downPart_Box: "1px 1px 10px white",
              doneBtnColor: "white",
            });
          } else {
            setModeState("🌑");
            setBgColor({
              innerContainer: "white",
              upperPart: "white",
              upperPart_Box: "1px 1px 15px black",
              inputColor: "black",
              addColor: "white",
              downPartColor: "black",
              downPart_Box: "1px 1px 10px black",
              doneBtnColor: "black",
            });
          }
        }}
      >
        {modeState}
      </button>
      <div
        style={{ backgroundColor: bgColor.innerContainer }}
        className="inner-container"
      >
        <div className="input-container">
          <div className="title">
            <p>TODO List</p>
          </div>
          <div
            style={{
              backgroundColor: bgColor.upperPart,
              boxShadow: bgColor.upperPart_Box,
            }}
            className="upper-part"
          >
            <input
              style={{ color: bgColor.inputColor }}
              placeholder="What would you like to do?"
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <button
              className="add"
              onClick={() => {
                setTodos([newTodo, ...todos]);
                setNewTodo("");
              }}
            >
              Add
            </button>
          </div>
        </div>
        <div className="todos-container">
          <div
            style={{
              color: bgColor.downPartColor,
              boxShadow: bgColor.downPart_Box,
            }}
            className="down-part"
          >
            <div className="sub-title">
              <h4>Todo List</h4>
              <h6
                onClick={() => {
                  switchToDone();
                }}
              >
                {switchTo}
              </h6>
            </div>
            <table>
              <thead>
                {applySwitch ? (
                  <tr className="thead">
                    <th>List</th>
                    <th></th>
                    <th></th>
                  </tr>
                ) : (
                  <tr className="thead">
                    <th>List</th>
                    <th>Status</th>
                    <th>Close</th>
                  </tr>
                )}
              </thead>
              <tbody>{tableData}</tbody>
            </table>
          </div>
          <div className="end"></div>
        </div>
      </div>
    </div>
  );
}
