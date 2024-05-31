import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div
      className={`
      ${bg}
      ${color}
      flex
      items-center
      px-1
      gap-1
      rounded`}
    >
      {text}
      <Icon size={15}/>
    </div>
  );
};

export default Status;
