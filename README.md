# 리덕스에서 사용되는 키워드

**- 액션(Action)**

어떤 업데이트를 할때 어떻게 할것인지 정의하는 객체

<pre>
<code>
{
    type: "ADD_TODO",
    data: {
        id: 1,
        text: "리덕스 배우기"
    }
}
</code>
</pre>

**- 액션 생성함수(Action Creator)**

리덕스를 사용할때 액션 생성함수는 필수적이진 않지만, 나중에 액션을 생성할때 유용하다  
 액션이 발생될때마다 그때그때 객체를 만들어줘도 된다

<pre>
<code>
export function addTodo(data) {
    return {
        type: "ADD_TODO",
        data
    };
}

// 화살표 함수로도 만들 수 있다
export const changeInput = text => ({
    type: "CHANGE_INPUT",
    text
});
</code>
</pre>

**- 리듀서(Reducer)**

변화를 일으키는 함수  
 불변성을 꼭 지켜줘야한다  
 useReducer 를 사용할때에는 일반적으로 default 에 에러를 발생시키지만, Redux 에서는 기존의 state 를 반환시킨다

<pre>
<code>
function counter(state, action) {
    switch(action.type) {
        case "INCREASE":
            return state + 1;
        case "DECREASE":
            return state - 1;
        default:
            return state;
    }
}
</code>
</pre>

**- 스토어(Store)**

한 앱당 하나의 스토어를 가진다  
 스토어 안에는 현재 앱의 상태, 리듀서, 그리고 내장함수를 포함한다

**- 디스패치(dispatch)**

스토어의 내장함수 중에 하나
액션을 발생 또는 액션을 스토어한테 전달한다는 의미

<pre>
<code>
dispatch({
    type: "INCREASE"
})
</code>
</pre>

**- 구독(subscribe)**

스토어의 내장함수 중에 하나  
 함수를 호출할때 파라미터로 특정 함수를 전달해주면, 액션이 디스패치 될때마다 전달된 함수가 호출된다  
 스토어의 상태가 업데이트 될때마다 특정 함수를 호출하는 작업

# 리덕스의 3가지 규칙

**1. 하나의 앱에서는 하나의 스토어가 있어야 한다.**

**2. 상태는 읽기전용이다. 즉, 불변성을 지켜줘야한다.**

객체 - spread 연산자로 먼저 객체 복사  
 배열 - concat, filter, map, slice 같은 불변성을 지키는 함수를 사용

**3. 변화를 일으키는 함수 리듀서는 순수한 함수여야한다.**

리듀서 함수는 이전 상태와, 액션 객체를 파라미터로 받는다.  
 이전의 상태는 절대로 변경하지 않고, 변화를 일으킨 새로운 상태 객체를 만들어서 반환한다.  
 똑같은 파라미터로 호출된 리듀서 함수는 언제나 똑같은 결과값을 반환해야 한다.

동일한 인풋 -> 동일한 아웃풋

# 프로젝트에 리덕스 적용하기

라이브러리 설치

<pre>
<code>
yarn add redux react-redux
</code>
</pre>

index.js

<pre>
<code>
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./modules";  // 먼저 루트 리듀서를 만든다.

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
</code>
</pre>

# 리덕스 모듈

**- 액션 타입, 액션 생성 함수, 리듀서를 따로따로 분리하거나 하나의 파일에 작성한 자바스크립트 파일**

**- Ducks 패턴**

하나의 파일에 몰아서 작성하는 방식.  
다른 모듈과 구별이 되게 액션 타입 앞에다가 접두사를 붙인다.
액션 생성 함수는 export, 리듀서 함수는 export default 를 붙인다.

# 리덕스 컴포넌트

**- 프레젠테이셔널 컴포넌트**

UI 선언 & 필요한 값이나 함수는 props 로 가져와서 사용하는 컴포넌트

**- 컨테이너 컴포넌트**

리덕스에 있는 상태를 조회하거나 액션을 디스패치 할 수 있는 컴포넌트

**- 작동 방식**

<img src="/src/img/components.jpg" title="컴포넌트 작동 방식" alt="components"></img><br/>

**- 참조 문서**

참조 링크 : [Google][googlelink]

[googlelink]: https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0

# 리덕스 개발자 도구

**- 설치 방법**

<pre>
<code>
yarn add redux-devtools-extension
</code>
</pre>

<pre>
<code>
import { composeWithDevTools } from "redux-devtools-extension";   

const store = createStore(rootReducer, composeWithDevTools());
</code>
</pre>

# useSelector 최적화

**- 아래의 코드에서는 매번 새로운 _객체_ 를 생성하므로 최적화가 이루어지지 않고 있다**

<pre>
<code>
const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
}));
</code>
</pre>

**- 해결 방법**

1. useSelector를 사용할때 하나의 상태만을 조회

2. equalityFn 함수를 파라미터에 추가

<pre>
<code>
const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff
    }),
    (left, right) => {
      return left.number === right.number && left.diff === right.diff;
    }
);
</code>
</pre>

3. shallowEqual 함수를 파라미터에 추가
