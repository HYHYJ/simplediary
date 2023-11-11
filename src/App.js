import { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";

function App() {
  const [data, setData] = useState([]);
  // 변수처럼 사용
  const dataId = useRef(0);

  //새로운 데이터를 추기하는 함수
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      //어떤 돔도 가르키지 않고 0이라는 값을 가지고있다.
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  const onRemove = (targetId) => {
    console.log(`${targetId} 가 삭제되었습니다.`);
    //filter로 제외해서 새로운 배열
    const newDiaryList = data.filter((it) => it.id !== targetId);
    //setData에 새로운 배열 추가
    setData(newDiaryList);
  };
  // item의 수정기능을 App에서 !수정되는 아이디와 수정되는 내용
  const onEdit = (targetId, newContent) => {
    setData(
      //  it아이디가 맞으면 content에 새로운 내용을 넣어준다(삼항연산자)
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it
      )
    );
  };

  return (
    <div className="App">
      <Lifecycle />
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />{" "}
      {/* 더미 리스트 프롭스로 전달 */}
    </div>
  );
}

export default App;
