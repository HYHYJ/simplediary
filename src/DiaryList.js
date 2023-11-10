import DiaryItem from "./DiaryItem";

const DiaryList = ({ onDelete, diaryList }) => {
  console.log(diaryList);
  return (
    <div className="DiaryList">
      <h2>일기 리스트</h2>
      <h4>{diaryList.length}개의 일기가 있습니다.</h4>
      <div>
        {/* props 순환 */}
        {diaryList.map((it) => (
          <DiaryItem
            key={it.id}
            {...it}
            onDelete={onDelete}
          /> /* 모든 it의 데이터가 prop으로 들어간다. */
        ))}
      </div>
    </div>
  );
};

/* 알고보기 값들이 undefinde으로 온다면? 에러남!! 기본값= 빈값 설정 : 에러 안나게 하려고*/
DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
