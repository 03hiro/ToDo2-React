import React, { VFC } from "react";

const style = {
  backgroundColor: "#66FF99",
  width: "500px",
  minHeight: "200px",
  padding: "8px",
  margin: "5px auto",
  borderRadius: "8px"
};

type Props = {
  completeTodos: string[];
  coClickReturn: (index: any) => void;
}

export const CompleteTodos: VFC<Props> = (props) => {
  const { completeTodos, coClickReturn } = props;

  return (
    <div style={style}>
      <p className="title">完了したToDoリスト一覧</p>
      <ul>
        {completeTodos.map((todo, index) => {
          return (
            <div key={todo} className="list-todo">
              <li>{todo}</li>
              <button onClick={() => coClickReturn(index)}>戻す</button>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
