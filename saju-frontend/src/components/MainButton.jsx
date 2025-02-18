export const MainButton = ({
  className,
  children,
  bgColor = "666666",
  hoverColor = "525252",
  ...props
}) => (
  <button
    className={`
        flex items-center justify-center
        text-white
        shadow
        bg-[#ff7070]
        rounded-lg
        cursor-pointer
        transition-all duration-200 ease-in-out
        active:transform active:scale-[0.98]
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    {...props}
  >
    <span className="text-center py-auto">{children}</span>
  </button>
);

export default MainButton;
