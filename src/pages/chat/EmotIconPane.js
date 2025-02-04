import EmotIcon from "./EmotIcon";

const EmotIconPane = ({ onEmotIconClick }) => {
  const icons = [];
  for (let i = 0; i <= 29; i++) icons.push(i);
  return (
    <div className="grid grid-cols-10">
      {icons.map((icon) => (
        <EmotIcon className key={icon} index={icon} onClick={onEmotIconClick} />
      ))}
    </div>
  );
};

export default EmotIconPane;
