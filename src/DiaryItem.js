function DiaryItem({ author, content, created_date, emotion, id }) {
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
    </div>
  );
}

export default DiaryItem;
