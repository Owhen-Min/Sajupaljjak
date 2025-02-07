function CommunityFilterBubble({ selectedElement, onElementSelect }) {
  // 오행 필터 옵션
  const elementFilters = [
    { id: 'all', label: '전체', color: 'bg-white text-gray-800 border-gray-300' },
    { id: '목', label: '목', color: 'bg-green-100 text-green-800 border-green-300' },
    { id: '화', label: '화', color: 'bg-red-100 text-red-800 border-red-300' },
    { id: '토', label: '토', color: 'bg-yellow-100 text-yellow-800 border-yellow-300' },
    { id: '금', label: '금', color: 'bg-gray-50 text-gray-800 border-gray-300' },
    { id: '수', label: '수', color: 'bg-gray-800 text-white border-gray-900' }
  ];

  return (
    <div className="flex gap-3 pt-5 pb-0 justify-center">
      {elementFilters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onElementSelect(filter.id)}
          className={`
            px-4 py-2 rounded-full border
            ${filter.color}
            ${selectedElement === filter.id ? 'ring-2 ring-offset-2' : ''}
            transition-all duration-200 hover:opacity-80
            font-dokrip text-sm
          `}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}

export default CommunityFilterBubble;
