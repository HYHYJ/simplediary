import { useState, useRef, useEffect, useMemo } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {
  const [data, setData] = useState([]);
  // 변수처럼 사용
  const dataId = useRef(0);

  //데이터 가져오는 함수
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        //Math.floor 정수로 바꿔줌, 0~4여서 +1 해줌
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        // id 만들기. useRef 의 .current
        id: dataId.current++,
      };
    });
    setData(initData);
  };

  //라이프 사이클, 컴포넌트가 생성되면
  useEffect(() => {
    // 데이터를 가져온다.
    getData();
  }, []);

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

  //일기 감정 분석 함수
  //⭐useMemo
  // 이건 함수가 아니라 값이다.
  const getDiaryAnalysis = useMemo(() => {
    console.log("일기 분석 시작");

    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    //값을 객체로 리턴
    return { goodCount, badCount, goodRatio };
    //⭐data 길이가 변하면 업데이트 됨.
  }, [data.length]);

  //함수를 연산자로 변수로 나누기
  // ⭐useMemo는 함수로 말고 값으로 사용해야한다.getDiaryAnalysis() (x) =>getDiaryAnalysis
  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기 : {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      <div>기분 좋은 일기 비율: {goodRatio}</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />{" "}
      {/* 더미 리스트 프롭스로 전달 */}
    </div>
  );
}

export default App;
