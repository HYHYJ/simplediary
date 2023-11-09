import { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

// const dummyList = [
//   {
//     id: 1,
//     author: "안녕",
//     content: "너무 좋다",
//     emotion: 3,
//     created_date: new Date().getTime(), //현재시간을 기준으로
//   },
//   {
//     id: 2,
//     author: "하이",
//     content: "너무 좋다2",
//     emotion: 1,
//     created_date: new Date().getTime(), //현재시간을 기준으로
//   },
//   {
//     id: 3,
//     author: "봉쥬르",
//     content: "너무 좋다3",
//     emotion: 2,
//     created_date: new Date().getTime(), //현재시간을 기준으로
//   },

// ];

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
  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} /> {/* 더미 리스트 프롭스로 전달 */}
    </div>
  );
}

export default App;
