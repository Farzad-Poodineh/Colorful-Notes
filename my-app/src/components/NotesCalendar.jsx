import React, { useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const NotesCalendar = React.memo(({ notes, onSelectDate, onClose }) => {
  const events = useMemo(
    () =>
      notes
        .filter((note) => !note.isNew && note.content)
        .map((note) => ({
          title:
            note.content.substring(0, 20) +
            (note.content.length > 20 ? '...' : ''),
          start: new Date(note.date),
          end: new Date(note.date),
          allDay: true,
          resource: note,
        })),
    [notes]
  );

  return (
    <div className='relative h-[600px] w-full p-4 bg-white rounded-lg shadow-md'>
      <button
        onClick={onClose}
        className='absolute top-2 right-2 z-10 p-2 text-gray-500 hover:text-gray-700'
        aria-label='Close calendar'
      >
        <FaTimes />
      </button>
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
});

export default NotesCalendar;
