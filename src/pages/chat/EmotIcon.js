import { Tooltip } from "antd";
import { EMOTICON } from "./EmotiConstants";

const EmotIcon = ({ index, onClick }) => {
  return (
    <Tooltip
      title={EMOTICON[index].detail}
      className="p-1"
      onClick={() => {
        if (typeof onClick == "function")
          onClick({ title: EMOTICON[index].name });
      }}
    >
      <img
        className="h-12 w-12 cursor-pointer hover:animate-pulse"
        src={EMOTICON[index].img}
        alt={EMOTICON[index].detail}
      />
    </Tooltip>
  );
};

export default EmotIcon;
