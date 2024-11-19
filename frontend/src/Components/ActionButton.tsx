type ActionButtonProps = {
  text: string;
  variant: "submit" | "cancel" | "showModal";
  onClick: () => void;
};

const ActionButton = ({ text, variant, onClick }: ActionButtonProps) => {
  const buttonBaseClass = "text-white py-2 px-4 rounded-lg mt-2";

  let buttonVariantClass;
  if (variant === "submit") {
    buttonVariantClass = "bg-violet-700";
  } else if (variant === "cancel") {
    buttonVariantClass = "bg-gray-800";
  } else if (variant === "showModal") {
    buttonVariantClass = "bg-teal-700 mb-8 text-xl";
  }

  return (
    <button
      onClick={onClick}
      className={`${buttonBaseClass} ${buttonVariantClass}`}
    >
      {text}
    </button>
  );
};

export default ActionButton;
