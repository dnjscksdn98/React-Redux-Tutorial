import { createStore } from "redux";

// 초기값 설정
const initialState = {
  counter: 0,
  text: "",
  list: []
};

// 액션 타입 정의
const INCREASE = "INCREASE";
const DECREASE = "DECREASE";
const CHANGE_TEXT = "CHANGE_TEXT";
const ADD_TO_LIST = "ADD_TO_LIST";

// 액션 생성 함수
const increase = () => ({
  type: INCREASE
});

const decrease = () => ({
  type: DECREASE
});

const changeText = text => ({
  type: CHANGE_TEXT,
  text
});

const addToList = item => ({
  type: ADD_TO_LIST,
  item
});

// 리듀서
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1
      };

    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      };

    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text
      };

    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item)
      };

    default:
      return state;
  }
}

// 스토어 생성
const store = createStore(reducer);

// 구독
const listener = () => {
  const state = store.getState();
  console.log(state);
};

// 액션이 디스패치 될때마다 listener 호출
const unsubscribe = store.subscribe(listener);
// unsubscribe() : 구독 해제 함수

// 디스패치
store.dispatch(increase());
store.dispatch(decrease());
store.dispatch(changeText("안녕하세요"));
store.dispatch(addToList({ id: 1, text: "와우" }));
