export const TailwindInput = ({ className, ...props }) => (
  <input
    className={`
      w-full px-4 py-[15px] 
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

export const TailwindButton = ({ className, children, ...props }) => (
  <button
    className={`
      w-full px-4 py-3
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