import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeShowSideState } from "../../redux/sideSlice";
import ArticleCategory from "./ArticleCategory";
import ArticleList from "./ArticleList";

function Article() {
  const { user } = useSelector((store) => store.user);

  const dispatch = useDispatch();

  //hidden the sidebar
  useEffect(() => {
    dispatch(changeShowSideState(false));
  }, []);

  return (
    <>
      <div className="lists grid grid-cols-5  w-full h-full">
        <div className="category col-span-1 h-full relative ">
          <ArticleCategory />
        </div>
        <div className="col-span-4 bg-slate-200 rounded-lg w-full ">
          <ArticleList />
        </div>
      </div>
    </>
  );
}

export default Article;
