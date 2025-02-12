import useEmblaCarousel from 'embla-carousel-react';

const EmblaCarousel = ({data}) => {
  const [emblaRef] = useEmblaCarousel({
    align: 'center',
    containScroll: 'keepSnaps',
    dragFree: false
  });

  const elementFilters = [
    { id: '목', label: '木', color: 'bg-green-100 text-green-800 border-green-300' },
    { id: '화', label: '火', color: 'bg-red-100 text-red-800 border-red-300' },
    { id: '토', label: '土', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { id: '금', label: '金', color: 'bg-gray-50 text-gray-800 border-gray-300' },
    { id: '수', label: '水', color: 'bg-gray-800 text-white border-gray-900' }
  ];

  return (
    <div className="max-w-4xl mx-auto overflow-hidden p-4 bg-white bg-opacity-50 rounded-lg" ref={emblaRef}>
      <div className="flex">
        {data.map((spot, index) => (
          <div 
            key={index} 
            className="relative flex-[0_0_90%] ml-4 first:ml-0"
          >
            <img
              src={spot.image}
              alt={`Slide ${index + 1}`}
              className="w-full h-64 rounded-lg object-cover"
              style={{ objectPosition: 'center' }}
            />
            <div className="absolute flex bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 rounded-b-lg text-white">
              <button className={
                `${elementFilters.find(filter => filter.id === spot.element)?.color}
                px-2 py-1 rounded-full flex justify-center items-center border
                transition-all duration-200 
                font-dokrip text-base mr-2
              `}>
                {elementFilters.find(filter => filter.id === spot.element)?.label}
                </button>
              <p className="text-2xl font-bold">{spot.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmblaCarousel;