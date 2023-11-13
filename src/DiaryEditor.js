import React, { useContext } from "react";
import { useEffect, useRef, useState } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
  /* 인풋에 접근할 수 있는 기능 */
  //📌 비구조화 할당으로 받아오기!
  const { onCreate } = useContext(DiaryDispatchContext);
  const authorInput = useRef();
  const contentInput = useRef();

  const [state, setState] = useState({
    author: "",
    content: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      //useState 변수랑 이름 똑같이해야 변수 변경
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (state.author.length < 1) {
      /* alert쓰지말자 */

      //잘못 입력하면 input에 focus
      authorInput.current.focus();
      return;
    }
    if (state.content.length < 5) {
      //잘못 입력하면 content에 focus
      contentInput.current.focus();
      return;
    }
    onCreate(state.author, state.content, state.emotion);
    alert("저장 성공");
    // 저장에 성공하면 기본값이 초기화된다.
    setState({
      author: "",
      content: "",
      emotion: 1,
    });
  };
  return (
    <div className="DiaryEditor">
      <h2>오늘의 일기</h2>
      <div>
        <input
          ref={authorInput} /* 인풋태그에 접근가능 */
          name="author"
          value={state.author} /* state의 이름 */
          /* 콜백함수 */
          onChange={handleChangeState}
        />
      </div>
      <div>
        <textarea
          ref={contentInput}
          name="content"
          value={state.content}
          onChange={handleChangeState}
        />
      </div>
      <div>
        <span>오늘의 감정 점수:</span>
        <select
          name="emotion"
          value={state.emotion}
          onChange={handleChangeState}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={handleSubmit}>일기 저장</button>
      </div>
    </div>
  );
};
//⭐ 맨마지막에 묶어주기
export default React.memo(DiaryEditor);
