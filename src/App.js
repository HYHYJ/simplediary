import { useState, useRef, useEffect } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

//https://jsonplaceholder.typicode.com/comments

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

  return (
    <div className="App">
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />{" "}
      {/* 더미 리스트 프롭스로 전달 */}
    </div>
  );
}

export default App;
