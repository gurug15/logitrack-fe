const Button = ({ 
  children, 
  variant = "primary", 
  size = "medium",
  className = "",
  onClick,
  ...props 
}) => {
  const baseClasses = "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg font-bold leading-normal tracking-[0.015em]";
  
  const variants = {
    primary: "bg-[#1b5ff3] text-white",
    secondary: "bg-[#f0f1f5] text-[#111318]"
  };
  
  const sizes = {
    small: "min-w-[84px] max-w-[480px] h-10 px-4 text-sm",
    medium: "min-w-[84px] max-w-[480px] h-10 px-4 text-sm @[480px]:h-12 @[480px]:px-5 @[480px]:text-base",
    large: "min-w-[84px] max-w-[480px] h-12 px-5 text-base"
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;
  
  return (
    <button className={classes} onClick={onClick} {...props}>
      <span className="truncate">{children}</span>
    </button>
  );
};

export default Button;