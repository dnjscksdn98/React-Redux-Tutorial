// Container Component : 리덕스에 있는 상태를 조회하거나 액션을 디스패치 할 수 있는 컴포넌트
import React from "react";
import { useSelector, useDispatch } from "react-redux";

import Counter from "../components/Counter";
import { increase, decrease, setDiff } from "../modules/counter";

function CounterContainer() {
  // state : store.getStore() 사용 시 반환되는 객체를 가리킴 - 리덕스의 현재 상태
  // useSelector: 상태 조회
  const { number, diff } = useSelector(state => ({
    number: state.counter.number,
    diff: state.counter.diff
  }));

  // useDispatch: 디스패치 생성
  const dispatch = useDispatch();

  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
