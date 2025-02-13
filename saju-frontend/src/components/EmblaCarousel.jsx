import useEmblaCarousel from 'embla-carousel-react';
import { useEffect, useState } from 'react';

const EmblaCarousel = ({data}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    containScroll: 'keepSnaps',
    dragFree: false
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedSpot, setSelectedSpot] = useState(null);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(1)
    }
  }, [data, emblaApi]);

  const elementFilters = [
    { id: '목', label: '木', color: 'bg-green-100 text-green-800 border-green-300' },
    { id: '화', label: '火', color: 'bg-red-100 text-red-800 border-red-300' },
    { id: '토', label: '土', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { id: '금', label: '金', color: 'bg-gray-50 text-gray-800 border-gray-300' },
    { id: '수', label: '水', color: 'bg-gray-800 text-white border-gray-900' }
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto overflow-hidden p-4 bg-white bg-opacity-50 rounded-lg" ref={emblaRef}>
        <div className="carousel-container flex bg-white">
          {data.map((spot, index) => (
            <div 
              key={index} 
              className="relative flex-[0_0_90%] ml-4 first:ml-0"
              onClick={() => {
                setSelectedSpot(spot);
                setShowModal(true);
              }}
            >
              <img
                src={spot.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-64 rounded-lg object-cover"
                style={{ objectPosition: 'center' }}
              />

              <div className="absolute flex justify-start items-center bottom-0 left-0 right-0 pl-2 py-3 bg-black bg-opacity-50 rounded-b-lg text-white">
                <span className={
                  `${elementFilters.find(filter => filter.id === spot.element)?.color}
                  px-2 py-1 rounded-full flex justify-center items-center border
                  transition-all duration-200 hanja text-center ml-1 mr-3 w-6 h-6
                `}>
                  {elementFilters.find(filter => filter.id === spot.element)?.label}
                </span>
                <p className="text-xl font-semibold truncate text-center align-text-middle">{spot.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end justify-center"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white max-h-[80vh] max-w-[400px] min-w-[400px] rounded-t-2xl p-6 transform transition-transform duration-300 ease-out animate-slide-up overflow-y-auto scrollbar-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-center items-center w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 gap-4" />
            <div className="overflow-y-auto scrollbar-hidden">
              <img src={selectedSpot?.image} alt={selectedSpot?.title} className="w-full h-64 rounded-lg object-cover mb-4" />
              <h3 className="text-2xl font-bold mb-4">{selectedSpot?.title}</h3>
              <p className="text-gray-700 whitespace-pre-line leading-8">
                {selectedSpot?.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EmblaCarousel;