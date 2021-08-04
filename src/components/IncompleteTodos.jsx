import React from "react";

const style = {
  backgroundColor: "#66FFFF	",
  width: "500px",
  minHeight: "200px",
  padding: "8px",
  margin: "5px auto",
  borderRadius: "8px"
};

export const IncompleteToods = (props) => {
  const { todos, onClC, onClD } = props;
  return (
    <div style={style}>
      <p className="title">未完了のToDoリスト一覧</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <div key={todo} className="list-todo">
              <li>{todo}</li>
              <button onClick={() => onClC(index)}>完了</button>
              <button onClick={() => onClD(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
