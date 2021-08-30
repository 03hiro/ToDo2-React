import React, { useState } from "react";
import "./styles.css";
import { InputButton } from "./components/InputButton";
import { IncompleteToods } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState<string[]>([]);
  const [completeTodos, setCompleteTodos] = useState<string[]>([]);

  const onChangeText: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => setTodoText(event.target.value);
  
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index: any) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index: any) => {
    const newIncompleteTodos = [...incompleteTodos];
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
    if (newCompleteTodos.length >= 6) {
      newCompleteTodos.shift();
    }
  };

  const coClickReturn = (index: any) => {
    const newCompleteTodosre = [...completeTodos];
    newCompleteTodosre.splice(index, 1);

    const newIncompleteTodosre = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodosre);
    setIncompleteTodos(newIncompleteTodosre);
  };

  return (
    <>
      <InputButton
        todoText={todoText}
        onChangeText={onChangeText}
        onClickAdd={onClickAdd}
      />

      <IncompleteToods
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <p style={{ color: "red", textAlign: "center", marginRight: "200px" }}>
        (完了リストの登録は5個までです。)
      </p>
      <CompleteTodos completeTodos={completeTodos} coClickReturn={coClickReturn} />
    </>
  );
};
