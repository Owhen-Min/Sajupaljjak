import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import './calendar.css';

export const CustomCalendar = ({ disableFuture = false }) => (
  <div className="w-full">
    <Calendar 
      className="w-full bg-white border-none font-inherit"
      calendarType="gregory" 
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
      maxDate={disableFuture ? new Date() : undefined}
      formatDay={(locale, date) => date.getDate()}
      tileClassName={({ date, view }) => 
        `hover:bg-gray-50 rounded-lg text-sm
        ${date.getDay() === 0 ? 'text-red-500' : ''}
        ${date.getDay() === 6 ? 'text-red-500' : ''}`
      }
    />
  </div>
);

export default CustomCalendar;