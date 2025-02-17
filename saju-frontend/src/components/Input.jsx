export const Input = ({ className, ...props }) => (
  <input
    className={`
        text-sm
        px-4 py-2
        rounded-lg
        bg-white
        box-border
        transition-all duration-300 ease-in-out
        ${className}
      `}
    {...props}
  />
);

export default Input;
