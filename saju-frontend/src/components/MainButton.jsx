export const MainButton = ({ className, children, half, ...props }) => (
    <button
      className={`
        px-3
        text-base font-medium text-white
        bg-[#666666]
        border-none
        rounded-lg
        cursor-pointer
        shadow-sm
        transition-all duration-200 ease-in-out
        hover:bg-[#525252] hover:shadow-md
        active:transform active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
  
  export default MainButton;