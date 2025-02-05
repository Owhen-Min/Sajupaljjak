import BackButton from './BackButton';

export const TopBar2 = ({
    url = '',
    mainText
}) => {
  return (
    <div className="bg-white border-b z-10 border-gray-200 top-bar2 w-full flex items-center justify-center h-12 sticky py-3 left-0 mb-5">
      <BackButton url={url} />
      <div className="main-text w-full text-center text-base font-semibold">{mainText}</div>
    </div>
  );
};

export default TopBar2;