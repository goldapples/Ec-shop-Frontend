import { memo } from "react";
import Action from "./Action";

const ChildPanel = ({ item }) => {
  return (
    <>
      <div className={"pt-2 pl-20"}>{item}</div>
    </>
  );
};
const ViewArticleItem = ({ selectedArticle, childrens, user, getArticles }) => {
  return (
    <>
      <div className="flex flex-col w-full mt-2">
        <Action
          selectedArticle={selectedArticle}
          user={user}
          getArticles={getArticles}
        />

        <div className="flex flex-col">
          {childrens.map((item, index) => {
            return <ChildPanel key={index} item={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default memo(ViewArticleItem);
