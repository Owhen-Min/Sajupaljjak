export const MainButton = ({ className, children, half, ...props }) => (
    <button
      className={`
        ${half ? 'w-1/2' : 'w-full'} px-4 py-3
        mt-5
        text-base font-medium text-white
        bg-[#ff6842]
        border-none
        rounded-lg
        cursor-pointer
        shadow-sm
        transition-all duration-200 ease-in-out
        hover:bg-[#e55835] hover:shadow-md
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