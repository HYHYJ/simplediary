import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

const dummyList = [
  {
    id: 1,
    author: "안녕",
    content: "너무 좋다",
    emotion: 3,
    created_date: new Date().getTime(), //현재시간을 기준으로
  },
  {
    id: 2,
    author: "하이",
    content: "너무 좋다2",
    emotion: 1,
    created_date: new Date().getTime(), //현재시간을 기준으로
  },
  {
    id: 3,
    author: "봉쥬르",
    content: "너무 좋다3",
    emotion: 2,
    created_date: new Date().getTime(), //현재시간을 기준으로
  },
  {
    id: 4,
    author: "곤니찌와",
    content: "너무 좋다4",
    emotion: 5,
    created_date: new Date().getTime(), //현재시간을 기준으로
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} /> {/* 더미 리스트 프롭스로 전달 */}
    </div>
  );
}

export default App;
