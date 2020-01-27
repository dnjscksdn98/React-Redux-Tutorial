import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";

import Todos from "../components/Todos";
import { addTodo, toggleTodo } from "../modules/todos";

function TodosContainer() {
  const todos = useSelector(state => state.todos); // 상태 조회
  const dispatch = useDispatch(); // 디스패치 생성

  // useCallback 으로 최적화 - 규칙상 deps에 dispatch 넣어준다
  const onCreate = useCallback(text => dispatch(addTodo(text)), [dispatch]);
  const onToggle = useCallback(id => dispatch(toggleTodo(id)), [dispatch]);

  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default TodosContainer;
