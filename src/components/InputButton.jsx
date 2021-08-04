import React from "react";

const style = {
  backgroundColor: "#00CCCC",
  width: "400px",
  margin: "0 auto",
  marginTop: "20px",
  marginBottom: "20px",
  padding: "10px 7px",
  borderRadius: "10px"
};

const style2 = {
  textAlign: "center"
};

export const InputButton = (props) => {
  const { todoText, onChangeText, onClickAdd } = props;
  return (
    <div style={style}>
      <div style={style2}>
        <input
          placeholder="ToDoを入力する"
          value={todoText}
          onChange={onChangeText}
        />
        <button onClick={onClickAdd} type="submit">追加</button>
      </div>
    </div>
  );
};
