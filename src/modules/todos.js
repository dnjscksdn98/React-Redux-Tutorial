// 액션 타입 선언
const ADD_TODO = "todos/ADD_TODO";
const TOGGLE_TODO = "todos/TOGGLE_TODO";

// 액션 생성 함수
let nextId = 1;
export const addTodo = text => ({
  type: ADD_TODO,
  todo: {
    id: nextid++,
    text
  }
});

export const toggleTodo = id => ({
  type: TOGGLE_TODO,
  id
});

// 초기 상태
const initialState = [];

// 리듀서
export default function todos(state = initialState, action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat(action.todo);

    case TOGGLE_TODO:
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );

    default:
      return state;
  }
}
