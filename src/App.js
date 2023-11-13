import { useRef, useEffect, useMemo, useCallback, useReducer } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import OptimizeTest from "./OptimizeTest";
//1️⃣ 외부에 reducer함수를 넣는다.
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.targetId);
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.targetId ? { ...it, content: action.newContent } : it
      );
    }
    default:
      return state;
  }
};

function App() {
  //1️⃣ useState 주석처리한다.
  // const [data, setData] = useState([]);
  //1️⃣ useReducer
  const [data, dispatch] = useReducer(reducer, []);
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
    //1️⃣ dispatch로 바꾸기
    dispatch({ type: "INIT", data: initData });
    //1️⃣ 지우기
    // setData(initData);
  };

  //라이프 사이클, 컴포넌트가 생성되면
  useEffect(() => {
    // 데이터를 가져온다.
    getData();
  }, []);

  //새로운 데이터를 추기하는 함수
  // ⭐useMemo는 값을 반환하는것이여서 안됨.
  const onCreate = useCallback((author, content, emotion) => {
    //1️⃣dispatch 사용
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });
    //1️⃣ 주석
    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   //어떤 돔도 가르키지 않고 0이라는 값을 가지고있다.
    //   id: dataId.current,
    // };
    dataId.current += 1;
    //❤️함수형 업데이트: 상태변환 함수에 함수를 넣어준다.
    // 항상 최신의 값
    //1️⃣ 주석
    // setData((data) => [newItem, ...data]);
  }, []);

  //⭐ useCallback으로 최적화
  const onRemove = useCallback((targetId) => {
    dispatch({ type: "REMOVE", targetId });
  }, []);

  const onEdit = useCallback((targetId, newContent) => {
    dispatch({ type: "EDIT", targetId, newContent });
    //함수형으로 바꿔주기
    // setData((data) =>
    //   //  it아이디가 맞으면 content에 새로운 내용을 넣어준다(삼항연산자)
    //   data.map((it) =>
    //     it.id === targetId ? { ...it, content: newContent } : it
    //   )
    // );
  }, []);

  //일기 감정 분석 함수
  //⭐useMemo
  // 이건 함수가 아니라 값이다.
  const getDiaryAnalysis = useMemo(() => {
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
