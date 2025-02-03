import BackButton from './BackButton';

export const TopBar2 = ({
    url = '',
    mainText
}) => {
  return (
    <div className="top-bar2 w-full flex items-center justify-center h-12 absolute top-4 left-0">
      <BackButton url={url} />
      <div className="main-text w-full text-center text-base font-semibold">{mainText}</div>
    </div>
  );
};

export default TopBar2;