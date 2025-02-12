import { useEffect, useState } from "react";
import dayjs from "dayjs";

const generateDate = (date) => {
  const startOfMonth = date.startOf('month');
  const endOfMonth = date.endOf('month');
  
  const startDate = startOfMonth.startOf('week');
  const endDate = endOfMonth.endOf('week');
  
  let currentDate = startDate;
  const arrayOfDate = [];

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, 'day')) {
    arrayOfDate.push({
      date: currentDate,
      currentMonth: currentDate.month() === date.month(),
      isInRange: currentDate.month() === date.month() 
    });
    currentDate = currentDate.add(1, 'day');
  }

  return arrayOfDate;
};

export const Calendar = ({ goodDates = [], badDates = [], className }) => {
  const today = dayjs();
  const [date, setDate] = useState(today);
  const days = ["일", "월", "화", "수", "목", "금", "토"];
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const arrayOfDate = generateDate(date);
    setRecords(arrayOfDate);
  }, [date]);

  const isGoodDate = (date) => {
    return goodDates.some(d => dayjs(d).isSame(date, 'day'));
  };

  const isBadDate = (date) => {
    return badDates.some(d => dayjs(d).isSame(date, 'day'));
  };

  return (
    <div className={`w-full bg-white rounded-lg p-4 shadow ${className}`}>
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-4">
        <button 
          onClick={() => setDate(date.subtract(1, 'month'))}
          disabled={date.month() === today.subtract(1, 'month').month()}
          className={`p-2 rounded-full ${
            date.month() === today.subtract(1, 'month').month()
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          &lt;
        </button>
        <h1 className="text-lg font-semibold">
          {date.format('YYYY년 M월')}
        </h1>
        <button 
          onClick={() => setDate(date.add(1, 'month'))}
          disabled={date.month() === today.add(1, 'month').month()}
          className={`p-2 rounded-full ${
            date.month() === today.add(1, 'month').month()
              ? 'text-gray-300 cursor-not-allowed'
              : 'hover:bg-gray-100'
          }`}
        >
          &gt;
        </button>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {days.map((day, index) => (
          <div 
            key={index} 
            className={`text-center text-sm
              ${index === 0 ? 'text-red-500' : ''}
              ${index === 6 ? 'text-blue-500' : 'text-gray-600'}`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {records.map(({ date: currentDate, currentMonth, isInRange }, index) => (
          <div key={index} className="relative flex items-center justify-center">
            {isGoodDate(currentDate) && (
              <div className="absolute flex w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center z-10 justify-center items-center pointer-events-none">
                <svg className="text-red-400 w-3/4 h-3/4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M244 84L255.1 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 0 232.4 0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84C243.1 84 244 84.01 244 84L244 84zM255.1 163.9L210.1 117.1C188.4 96.28 157.6 86.4 127.3 91.44C81.55 99.07 48 138.7 48 185.1V190.9C48 219.1 59.71 246.1 80.34 265.3L256 429.3L431.7 265.3C452.3 246.1 464 219.1 464 190.9V185.1C464 138.7 430.4 99.07 384.7 91.44C354.4 86.4 323.6 96.28 301.9 117.1L255.1 163.9z"/>
                </svg>
              </div>
            )}
            {isBadDate(currentDate) && (
              <div className="absolute flex w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center z-10 justify-center items-center pointer-events-none">
              <svg
                className="w-full h-full stroke-current text-yellow-400 fill-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                strokeWidth="30"
              >
                <polygon points="256,60 84,364 428,364" />
              </svg>
            </div>
            )}
            
            <div 
              className={`
                h-10 w-10 flex items-center justify-center text-sm
                cursor-pointer transition-all duration-200
                hover:bg-gray-100 rounded-full
                ${!currentMonth ? 'text-gray-300' : ''}
                ${!isInRange ? 'opacity-50' : 'opacity-100'}
                ${currentDate.day() === 0 ? 'text-red-500' : ''}
                ${currentDate.day() === 6 ? 'text-blue-500' : 'text-gray-700'}
                ${currentDate.isSame(today, 'day') ? 'bg-red-500 text-white hover:bg-red-300' : ''}
              `}
            >
              {currentDate.date()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};