import React, { memo, VFC } from "react";

const style = {
  backgroundColor: "#66FF99",
  width: "500px",
  minHeight: "200px",
  padding: "8px",
  margin: "5px auto",
  borderRadius: "8px"
};

type Props = {
  completeTodos: any;
  // coClickReturn: (index: number) => void;
}

export const CompleteTodos: VFC<Props> = memo((props) => {
  const { completeTodos, } = props;

  return (
    <div style={style}>
      <p className="title">完了したToDoリスト一覧</p>
      <ul>
        {console.log(completeTodos)
        }
        {completeTodos.map((todo: any) => {
          return (
            <div key={todo.id || todo.name} className="list-todo">
              <li>{todo.name}</li>
              {/* <button onClick={() => coClickReturn(index)}>戻す</button> */}
            </div>
          );
        })}
      </ul>
    </div>
  );
});
