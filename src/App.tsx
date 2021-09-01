import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation, updateTodo as updateTodoMutation} from "./graphql/mutations";

import "./styles.css";
import { InputButton } from "./components/InputButton";
import { IncompleteToods } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";


const initialInTodos = { name: "", complete: false }

function App() {
  const [todoText, setTodoText] = useState(initialInTodos);
  const [incompleteTodos, setIncompleteTodos] = useState<any[]>([]);
  const [completeTodos, setCompleteTodos] = useState<any[]>([]);

  const onChangeText: React.ChangeEventHandler<HTMLInputElement> | undefined = (event) => setTodoText({...todoText, "name": event.target.value});

  useEffect(() => {
    featchTodos();
  }, [])

  const featchTodos = async () => {
    const apiData: any = await API.graphql({ query: listTodos });
    setIncompleteTodos(apiData.data.listTodos.items);
  }


  
  const onClickAdd = async () => {
    // if (todoText === "") return;
    if (!todoText.name) return;
    await API.graphql({ query: createTodoMutation, variables: { input: todoText } });
    setIncompleteTodos([...incompleteTodos, todoText]);
    setTodoText(initialInTodos);
  };

  const onClickDelete = async({ id }: any) => {
    const newTodos = incompleteTodos.filter(todo => todo.id !== id);
    console.log(incompleteTodos);
    console.log(newTodos);
    
    setIncompleteTodos(newTodos);
    await API.graphql({ query: deleteTodoMutation, variables: { input: {id} }});
  };

  const onClickComplete = async({ id }: any) => {
    const newIncompleteTodos = incompleteTodos.filter(todo => todo.id !== id);
    const newCompleteTodos = completeTodos.filter(todo => todo.id !== id);
    await API.graphql({ query: updateTodoMutation, variables: { input: {id} }});
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos([...completeTodos, newCompleteTodos]);
    setTodoText({name: "", complete: true});

    

    // if (newCompleteTodos.length >= 6) {
    //   newCompleteTodos.shift();
    // }
  };

  // const coClickReturn = (index: number) => {
  //   const newCompleteTodosre = [...completeTodos];
  //   newCompleteTodosre.splice(index, 1);

  //   const newIncompleteTodosre = [...incompleteTodos, completeTodos[index]];
  //   setCompleteTodos(newCompleteTodosre);
  //   setIncompleteTodos(newIncompleteTodosre);
  // };

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
      <CompleteTodos  completeTodos={completeTodos} /*  coClickReturn={coClickReturn} */ /> 
       {/* <AmplifySignOut /> */}
    </>
  );
};
export default withAuthenticator(App);
