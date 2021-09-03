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
  todos: any;
  coClickReturn: (todo: any) => void;
}

export const CompleteTodos: VFC<Props> = memo((props) => {
  const { todos, coClickReturn } = props;

  // console.log(todos)
  return (
    <div style={style}>
      <p className="title">完了したToDoリスト一覧</p>
      <ul>
        {todos.map((todo: any) => (
          <>
            {todo.complete ? (
              <div key={todo.id || todo.name} className="list-todo">
                <li>{todo.name}</li>
                <button onClick={() => coClickReturn(todo)}>戻す</button>
              </div>
            ) : (null)}
          </>
        ))}
      </ul>
    </div>
  );
});
