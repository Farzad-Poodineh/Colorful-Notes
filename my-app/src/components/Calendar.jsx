import React from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Calendar = ({ notes, onSelectDate }) => {
  const events = notes.map((note) => ({
    title:
      note.content.substring(0, 20) + (note.content.length > 20 ? '...' : ''),
    start: new Date(note.date),
    end: new Date(note.date),
    allDay: true,
    resource: note,
  }));

  return (
    <div className='h-[600px] w-full p-4 bg-gray-300 rounded-lg shadow-md'>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor='start'
        endAccessor='end'
        views={['month']}
        defaultView='month'
        onSelectEvent={(event) => onSelectDate(event.start)}
        onSelectSlot={(slotInfo) => onSelectDate(slotInfo.start)}
        selectable
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.resource.color,
            borderRadius: '4px',
            color: '#333',
            border: 'none',
          },
        })}
      />
    </div>
  );
};

export default Calendar;
