import heartIcon from "../assets/heart_icon.svg";

export default function Heart({ score, size = "normal", ...props }) {
  const sizeStyles = {
    small: 'w-12 h-12 text-base',
    normal: 'w-16 h-16 text-xl',
    large: 'w-24 h-24 text-2xl'
  };

  return (
    <div className={`relative ${sizeStyles[size]} flex items-center justify-center`}>
      <img
        src={heartIcon}
        alt="Heart Icon"
        className="absolute w-full h-full object-cover"
        {...props}
      />

      <p className="font-bold text-white z-10">{score}</p>
    </div>
  );
}
