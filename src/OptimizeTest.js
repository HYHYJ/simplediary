import React, { useState, useEffect } from "react";

const Textview = React.memo(({ text }) => {
  useEffect(() => {
    console.log(`updata :: text : ${text}`);
  });
  return <div>{text}</div>;
});

const CountView = React.memo(({ count }) => {
  useEffect(() => {
    console.log(`updata :: count : ${count}`);
  });
  return <div>{count}</div>;
});

const OptimizeTest = () => {
  const [count, setCount] = useState(1);
  const [text, setText] = useState("");
  return (
    <div style={{ padding: 50 }}>
      <div>
        <h2>Count</h2>
        <CountView count={count} />
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <h2>Text</h2>
        <Textview text={text} />
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default OptimizeTest;
