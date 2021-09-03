import React, { memo, VFC } from "react";

const style = {
  backgroundColor: "#66FFFF	",
  width: "500px",
  minHeight: "200px",
  padding: "8px",
  margin: "5px auto",
  borderRadius: "8px"
};

type Props = {
  todos: any;
  onClickComplete: (todo: any) => void;
  onClickDelete: (todo: any) => void;
}

export const IncompleteToods: VFC<Props> = memo((props) => {
  const { todos, onClickDelete, onClickComplete } = props;
  // console.log(todos)

  return (
    <div style={style}>
      <p className="title">未完了のToDoリスト一覧</p>
      <ul>
        {todos.map((todo: any) => (
          <>
            {!todo.complete ? (
              <div key={todo.id || todo.name} className="list-todo">
                <li>{todo.name}</li>
                <button onClick={() => onClickComplete(todo)}>完了</button>
                <button onClick={() => onClickDelete(todo)}>削除</button>
              </div>
            ) : (null)}
          </>
        ))}
      </ul>
    </div>
  );
});
