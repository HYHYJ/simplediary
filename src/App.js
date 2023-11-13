import React, {
  useRef,
  useEffect,
  useMemo,
  useCallback,
  useReducer,
} from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

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
//📌 Context 생성
// 내보내줘야 다른 곳에서 가져올 수 있다.
export const DiaryStateContext = React.createContext();
//📌 여러개 만들어줘도 된다.
export const DiaryDispatchContext = React.createContext();

export const App = () => {
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

  //📌 onCreate, onRemove, onEdit
  //* useMemo 쓰는 이유 : 앱컴포넌트가 재생성이 될때 Dispatches도 재생성 되지 않게!
  //* 최적화가 안풀리게
  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
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
    //📌Constext.Provider, value로 값을 써준다.
    <DiaryStateContext.Provider value={data}>
      {/* 📌 */}
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor onCreate={onCreate} />
          <div>전체 일기 : {data.length}</div>
          <div>기분 좋은 일기 개수: {goodCount}</div>
          <div>기분 나쁜 일기 개수: {badCount}</div>
          <div>기분 좋은 일기 비율: {goodRatio}</div>
          {/* 📌diaryList={data} 삭제*/}
          <DiaryList onEdit={onEdit} onRemove={onRemove} />{" "}
          {/* 더미 리스트 프롭스로 전달 */}
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
};

export default App;
