import React, { useEffect, useState } from "react";

function Lifecycle() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  //useEffect 값만 감지해서 그값이 변화하는 순간에만 callback함수를 수행
  //진짜 마운트될때만 수행
  useEffect(() => {
    console.log("mount!");
  }, []); //[]는 컴포넌트가 마운트될때만 리렌더된다. count가 증가되도 콘솔이 안뜸

  //컴포넌트가 업데이트 될때면 맨마지막에 [] 넣지 않는다.
  useEffect(() => {
    console.log("update!");
  });
  //count가 변경되는 시점에 업데이트된다.
  useEffect(() => {
    console.log(`count is update: ${count}`);
    if (count > 5) {
      alert("count가 5를 넘었습니다 따라서 1로 초기합니다.");
      setCount(1);
    }
  }, [count]);
  //text가 변경되는 시점에 업데이트된다.
  useEffect(() => {
    console.log(`text is update: ${text}`);
  }, [text]);
  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}

        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
}
export default Lifecycle;
