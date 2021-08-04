import React from "react";

const style = {
  backgroundColor: "#66FF99",
  width: "500px",
  minHeight: "200px",
  padding: "8px",
  margin: "5px auto",
  borderRadius: "8px"
};

export const CompleteTodos = (props) => {
  const { comTodo, onClR } = props;

  return (
    <div style={style}>
      <p className="title">完了したToDoリスト一覧</p>
      <ul>
        {comTodo.map((todo, index) => {
          return (
            <div key={todo} className="list-todo">
              <li>{todo}</li>
              <button onClick={() => onClR(index)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
