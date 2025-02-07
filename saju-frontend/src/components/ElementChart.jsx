import { useState, useEffect } from 'react';

function ElementChart({ elementCounts }) {
  const total = 8;
  
  const data = Object.entries(elementCounts).map(([name, count]) => ({
    name,
    count,
    percentage: ((count / total) * 100)
  }));

  const elementColors = {
    목: "#4ade80",
    화: "#ef4444",
    토: "#fbbf24",
    금: "#94a3b8",
    수: "#1e293b"
  };

  const getStatus = (percentage) => {
    if (percentage < 10) return "부족";
    if (percentage <= 20) return "적정";
    if (percentage <= 30) return "발달";
    return "과다";
  };

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="mt-6 bg-white rounded-xl p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
      ☯️ 오행 분석
      </h3>
      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span className="w-8 text-gray-600 font-medium">{item.name}</span>
            <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: animate ? `${(item.count / total) * 100}%` : '0%',
                  backgroundColor: elementColors[item.name]
                }}
              />
            </div>
            <span className="w-8 text-sm text-gray-500">
              {getStatus(item.percentage)}
            </span>
            <span className="w-12 text-right text-sm text-gray-600">
              {item.percentage}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementChart; 