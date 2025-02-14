export const Input = ({ className, ...props }) => (
    <input
      className={`
        px-4 py-[15px] 
        text-base
        border border-gray-300 
        rounded-lg
        bg-white
        box-border
        transition-all duration-300 ease-in-out
        hover:bg-gray-100
        focus:outline-none focus:border-[#ff6842] focus:ring-2 focus:ring-[#4CAF50]/20
        ${className}
      `}
      {...props}
    />
  );
  
  export default Input;