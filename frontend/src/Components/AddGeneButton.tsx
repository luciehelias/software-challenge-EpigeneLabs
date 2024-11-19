import { FaCirclePlus } from "react-icons/fa6";

type AddGeneButtonProps = {
  onClick: () => void;
  text: string;
};

const AddGeneButton = ({ onClick, text }: AddGeneButtonProps) => (
  <button onClick={onClick} className="text-m flex items-center gap-2 my-4">
    <FaCirclePlus className="text-xl" />
    {text}
  </button>
);

export default AddGeneButton;
