type ActionButtonProps = {
  text: string;
  variant: "submit" | "cancel" | "showModal" | "update";
  onClick: () => void;
};

const ActionButton = ({ text, variant, onClick }: ActionButtonProps) => {
  const buttonBaseClass = "text-white py-2 px-4 rounded-lg mt-2";

  let buttonVariantClass;
  if (variant === "submit") {
    buttonVariantClass = "bg-violet";
  } else if (variant === "showModal") {
    buttonVariantClass = "bg-light-green text-black font-semibold mb-8 text-xl";
  } else if (variant === "cancel" || variant === "update") {
    buttonVariantClass = "bg-gray-800";
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
