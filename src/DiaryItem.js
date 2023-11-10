function DiaryItem({ onDelete, author, content, created_date, emotion, id }) {
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
      <div className="content">{content}</div>
      <button
        onClick={() => {
          console.log(id);
          /* 대화창처럼 선택버튼이 나옴 */
          if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id);
          }
        }}
      >
        삭제하기
      </button>
    </div>
  );
}

export default DiaryItem;
