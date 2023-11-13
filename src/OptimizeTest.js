import React, { useState, useEffect } from "react";

const CounterA = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`counterA : ${count}`);
  });
  return <div>{count}</div>;
});
const CounterB = ({ obj }) => {
  useEffect(() => {
    console.log(`counterB : ${obj.count}`);
  });
  return <div>{obj.count}</div>;
};
// ⭐객체값을 비교하는 함수
const areEqual = (prevProps, nextProps) => {
  // if (prevProps.obj.count === nextProps.obj.count) {
  //   //true를 전달하면 React.Memo가 동작하지 않는다.
  //   return true;
  // }
  // return false;
  //⭐간단하게 작성
  return prevProps.obj.count === nextProps.obj.count;
};
// ⭐이렇게 적으면 areEqual함수에 따라서 CounterB 객체는 새로운 값이 기존값과 같으면 리랜더링 되지 않는다.
const MemoizedCounterB = React.memo(CounterB, areEqual);

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [obj, setObj] = useState({
    count: 1,
  });
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Counter A</h2>
        <CounterA count={count} />
        {/* 똑같은 값을 가지게된다. */}
        <button onClick={() => setCount(count)}>A button</button>
      </div>
      <div>
        <h2>Counter B</h2>
        <MemoizedCounterB obj={obj} />

        <button
          onClick={() =>
            setObj({
              count: obj.count,
            })
          }
        >
          B button
        </button>
      </div>
    </div>
  );
};

export default OptimizeTest;
