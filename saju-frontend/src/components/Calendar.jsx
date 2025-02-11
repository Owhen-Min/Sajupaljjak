import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import '../styles/Calendar.css';

export const CustomCalendar = ({ disableFuture = false, onChange, value, ...props }) => (
  <div className="w-full">
    <Calendar 
      className="w-full font-inherit shadow"
      calendarType="iso8601" 
      prev2Label={null}
      next2Label={null}
      showNeighboringMonth={false}
      minDate={new Date('1950-01-01')}
      maxDate={disableFuture ? new Date() : new Date('2025-12-31')}
      formatDay={(locale, date) => date.getDate()}
      onChange={(date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        onChange(`${year}-${month}-${day}`);
      }}
      value={value}
      tileClassName={({ date, view }) => 
        `hover:bg-gray-50 text-sm
        ${date.getDay() === 0 ? 'text-red-500' : ''}
        ${date.getDay() === 6 ? 'text-red-500' : ''}`
      }
      {...props}
    />
  </div>
);

export default CustomCalendar;