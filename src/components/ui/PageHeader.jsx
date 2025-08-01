import Button from "./Button";

export const PageHeader = ({ title, buttonText, onButtonClick }) => {
  return (
    <div className="flex flex-wrap justify-between gap-3 p-4">
      <p className="text-[#121417] tracking-light text-[32px] font-bold leading-tight min-w-72">
        {title}
      </p>
      {buttonText && (
        <Button
          variant="secondary"
          size="small"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};