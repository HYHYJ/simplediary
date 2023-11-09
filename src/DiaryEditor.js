import { useState } from "react";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    content: "",
  });
  // const [author, setAuthor] = useState("");
  // const [content, setContent] = useState("");
  const handleChangeState = (e) => {
    console.log(e.target.value);
    console.log(e.target.name);
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          name="author"
          value={state.author} /* state의 이름 */
          /* 콜백함수 */
          onChange={(e) => {
            /* e = 우리가 움직였을때 input 값이 바뀌었을때 수행한다. */
            setState({
              /* 객채를 바꿀려면 새로운 객체를 전달해줘야한다. */
              ...state,
              author: e.target.value,
            });
          }}
        />
      </div>
      <div>
        <textarea
          value={state.content}
          onChange={(e) => {
            setState({
              ...state,
              content: e.target.value,
            });
          }}
        />
      </div>
    </div>
  );
};
export default DiaryEditor;
