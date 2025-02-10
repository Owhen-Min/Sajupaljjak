import heartIcon from "../assets/heart_icon.svg";

export default function Heart({ score }) {
  return (
    <div className="relative w-16 h-16 flex items-center justify-center">
      <img
        src={heartIcon}
        alt="Heart Icon"
        className="absolute w-full h-full object-cover"
      />

      <p className="text-2xl font-bold text-white z-10">{score}</p>
    </div>
  );
}
