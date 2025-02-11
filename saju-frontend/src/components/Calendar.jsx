import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export const CustomCalendar = ({ 
  disableFuture = false, 
  onChange, 
  value, 
  showNeighboringMonth = false,
  ...props 
}) => {
  const handleDateClick = (arg) => {
    const date = new Date(arg.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
  };

  return (
    <div className="w-full">
      <Calendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev',
          center: 'title',
          right: 'next'
        }}
        selectable={true}
        dateClick={handleDateClick}
        validRange={{
          start: '1950-01-01',
          end: disableFuture ? new Date() : '2025-12-31'
        }}
        showNonCurrentDates={showNeighboringMonth}
        firstDay={1}
        height="auto"
        dayCellClassNames={(arg) => {
          const classes = ['text-sm'];
          if ([0, 6].includes(arg.date.getDay())) {
            classes.push('text-red-500');
          }
          return classes;
        }}
        {...props}
      />
    </div>
  );
};

export const TwoWeeksCalendar = ({ 
  onChange, 
  value, 
  showNeighboringMonth = false,
  ...props 
}) => {
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(twoWeeksLater.getDate() + 14);

  const handleDateClick = (arg) => {
    const date = new Date(arg.date);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    onChange(`${year}-${month}-${day}`);
  };

  return (
    <div className="w-full">
      <Calendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={false}
        selectable={true}
        dateClick={handleDateClick}
        validRange={{
          start: today,
          end: twoWeeksLater
        }}
        showNonCurrentDates={showNeighboringMonth}
        firstDay={1}
        height="auto"
        dayCellClassNames={(arg) => {
          const classes = ['text-sm'];
          if ([0, 6].includes(arg.date.getDay())) {
            classes.push('text-red-500');
          }
          return classes;
        }}
        {...props}
      />
    </div>
  );
};

export default { CustomCalendar, TwoWeeksCalendar };