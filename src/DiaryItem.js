import React, { useContext, useRef, useState } from "react";
//📌 context 함수 이름 import
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ author, content, created_date, emotion, id }) => {
  //📌 useContext로 사용, 비구조 할당으로 불러오기
  const { onRemove, onEdit } = useContext(DiaryDispatchContext);
  // 수정하고 있는지 수정이 끝났는지.
  const [isEdit, setIsEdit] = useState(false);
  //수정 상태 토글기능
  const toggleIsEdit = () => setIsEdit(!isEdit);

  //수정버튼 눌렀을때 textarea 함수설정
  const [localContent, setLocalContent] = useState(content);

  const localContentInput = useRef();
  //삭제 버튼 함수 분리
  const handleRemove = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onRemove(id);
    }
  };
  //수정 취소할때 췩소해도 바꾼 겂이 그대로 남아있어 그 값을 초기화한다.
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContent(content);
  };
  //수정하기 버튼 함수!
  const handleEdit = () => {
    if (localContent.length < 5) {
      localContentInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번 째 일기를 수정하시겠습니까?`)) {
      onEdit(id, localContent);
      //수정폼 닫아주기
      toggleIsEdit();
    }
  };

  return (
    <div className="DiaryItem">
      <div className="info">
        <span>
          작성자 : {author} | 감정점수: {emotion}
        </span>
        <br />
        {/* new Date 괄호안에 값을 넣어주고 .toLocaleString() 붙이면 인간이 알아보는 시간이 나온다*/}
        <span className="date">{new Date(created_date).toLocaleString()}</span>
      </div>
      <div className="content">
        {isEdit ? (
          <textarea
            //* 인풋 포커스 쓸려면 꼭 ref값알려주기
            ref={localContentInput}
            //값은 상태 기본값
            value={localContent}
            //함수로는 지금 타켓의 값으로 기본값을 바꿔준다.
            onChange={(e) => setLocalContent(e.target.value)}
          ></textarea>
        ) : (
          <>{content}</>
        )}
      </div>
      {isEdit ? (
        <>
          <button onClick={handleQuitEdit}>수정 취소</button>
          <button onClick={handleEdit}>수정 완료</button>
        </>
      ) : (
        <>
          <button onClick={handleRemove}>삭제하기</button>
          <button onClick={toggleIsEdit}>수정하기</button>
        </>
      )}
    </div>
  );
};
export default React.memo(DiaryItem);
