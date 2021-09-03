import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation, updateTodo as updateTodoMutation } from "./graphql/mutations";

import "./styles.css";
import { InputButton } from "./components/InputButton";
import { IncompleteToods } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";


const initialInTodos = { name: "", complete: false }

function App() {
  const [todoText, setTodoText] = useState(initialInTodos);
  const [incompleteTodos, setIncompleteTodos] = useState<any[]>([]);

  const onChangeText: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => setTodoText({ ...todoText, "name": event.target.value });

  // console.log(incompleteTodos);

  useEffect(() => {
    featchTodos();
  }, []);

  const featchTodos = async () => {
    const apiData: any = await API.graphql({ query: listTodos });
    setIncompleteTodos(apiData.data.listTodos.items);

    // console.log(apiData.data.listTodos.items);

  }



  //リストの追加

  const onClickAdd = async () => {
    if (!todoText.name) return;
    await API.graphql({ query: createTodoMutation, variables: { input: todoText } });
    await featchTodos();
    // console.log(incompleteTodos);
    setTodoText(initialInTodos);
  };

  //リストの削除

  const onClickDelete = async ({ id }: any) => {
    const newTodos = incompleteTodos.filter(todo => todo.id !== id);
    // console.log(id);
    setIncompleteTodos(newTodos);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } } });
  };

  //リストを完了したToDoリストに移動

  const onClickComplete = async ({ id }: any) => {
    await API.graphql({ query: updateTodoMutation, variables: { input: { id, complete: true } } });
    await featchTodos();


  };

  //リストを未完了したToDoリストに移動

  const coClickReturn = async ({ id }: any) => {
    await API.graphql({ query: updateTodoMutation, variables: { input: { id, complete: false } } });
    await featchTodos();

  };

  return (
    <>
      <form onSubmit={e => {
        e.preventDefault()
      }}>
        <InputButton
          todoText={todoText}
          onChangeText={onChangeText}
          onClickAdd={onClickAdd}
        />
      </form>
      <IncompleteToods
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      {/* <p style={{ color: "red", textAlign: "center", marginRight: "200px" }}>
        (完了リストの登録は5個までです。)
      </p> */}
      <CompleteTodos todos={incompleteTodos} coClickReturn={coClickReturn} />
      {/* <AmplifySignOut /> */}
    </>
  );
};
export default withAuthenticator(App);
