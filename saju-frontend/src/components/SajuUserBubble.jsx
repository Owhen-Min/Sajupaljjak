function SajuUserBubble({ skyElement, size = 'normal' }) {
  // 천간오행 스타일 매핑
  const elementStyles = {
    '갑목': { bg: 'bg-green-200', text: 'text-green-800', border: 'border-green-300', hanja: '甲' },
    '을목': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', hanja: '乙' },
    '병화': { bg: 'bg-red-200', text: 'text-red-800', border: 'border-red-300', hanja: '丙' },
    '정화': { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300', hanja: '丁' },
    '무토': { bg: 'bg-yellow-200', text: 'text-yellow-800', border: 'border-yellow-300', hanja: '戊' },
    '기토': { bg: 'bg-yellow-100', text: 'text-yellow-800', border: 'border-yellow-300', hanja: '己' },
    '경금': { bg: 'bg-gray-200', text: 'text-gray-800', border: 'border-gray-300', hanja: '庚' },
    '신금': { bg: 'bg-gray-50', text: 'text-gray-800', border: 'border-gray-300', hanja: '辛' },
    '임수': { bg: 'bg-gray-700', text: 'text-white', border: 'border-black', hanja: '壬' },
    '계수': { bg: 'bg-gray-800', text: 'text-white', border: 'border-black', hanja: '癸' }
  };


  const style = elementStyles[skyElement] || elementStyles['갑목'];
  
  const sizeStyles = {
    small: 'text-xs px-1.5 py-0',
    normal: 'px-2 py-0',
    large: 'text-lg px-3 py-0'
  };

  return (
    <div className={`
      inline-flex items-center gap-2 
      rounded-full border ${style.bg} ${style.text} ${style.border}
      font-dokrip ${sizeStyles[size]}
      `}
      >
      <span>{skyElement}</span>
    </div>

  );
}

export default SajuUserBubble;
