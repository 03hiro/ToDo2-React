import React, { useState } from "react";
import "./styles.css";
import { InputButton } from "./components/InputButton";
import { IncompleteToods } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
    if (newCompleteTodos.length >= 6) {
      newCompleteTodos.shift();
    }
  };

  const coClickReturn = (index) => {
    const newCompleteTodosre = [...completeTodos];
    newCompleteTodosre.splice(index, 1);

    const newIncompleteTodosre = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodosre);
    setIncompleteTodos(newIncompleteTodosre);
  };

  return (
    <form onSubmit={e => {
      e.preventDefault()
      onClickAdd()
    }}>
      <InputButton
        todoText={todoText}
        onChangeText={onChangeText}
        onClickAdd={onClickAdd}
      />

      <IncompleteToods
        todos={incompleteTodos}
        completeTodo={onClickComplete}
        deleteTodo={onClickDelete}
      />
      <p style={{ color: "red", textAlign: "center", marginRight: "200px" }}>
        (完了リストの登録は5個までです。)
      </p>
      <CompleteTodos comTodo={completeTodos} onClR={coClickReturn} />
    </form>
  );
};
