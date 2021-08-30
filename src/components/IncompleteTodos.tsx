import React, { VFC } from "react";

const style = {
  backgroundColor: "#66FFFF	",
  width: "500px",
  minHeight: "200px",
  padding: "8px",
  margin: "5px auto",
  borderRadius: "8px"
};

type Props = {
  todos: string[];
  onClickComplete: (index: any) => void;
  onClickDelete: (index: any) => void;
}

export const IncompleteToods: VFC<Props> = (props) => {
  const { todos, onClickComplete, onClickDelete } = props;
  return (
    <div style={style}>
      <p className="title">未完了のToDoリスト一覧</p>
      <ul>
        {todos.map((todo, index) => {
          return (
            <div key={todo} className="list-todo">
              <li>{todo}</li>
              <button onClick={() => onClickComplete(index)}>完了</button>
              <button onClick={() => onClickDelete(index)}>削除</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
