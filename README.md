# 리덕스에서 사용되는 키워드

- 액션(Action)

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

- 액션 생성함수(Action Creator)

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

- 리듀서(Reducer)

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

- 스토어(Store)

  한 앱당 하나의 스토어를 가진다  
  스토어 안에는 현재 앱의 상태, 리듀서, 그리고 내장함수를 포함한다

- 디스패치(dispatch)

  스토어의 내장함수 중에 하나
  액션을 발생 또는 액션을 스토어한테 전달한다는 의미

<pre>
<code>
dispatch({
    type: "INCREASE"
})
</code>
</pre>

- 구독(subscribe)

  스토어의 내장함수 중에 하나  
  함수를 호출할때 파라미터로 특정 함수를 전달해주면, 액션이 디스패치 될때마다 전달된 함수가 호출된다  
  스토어의 상태가 업데이트 될때마다 특정 함수를 호출하는 작업
