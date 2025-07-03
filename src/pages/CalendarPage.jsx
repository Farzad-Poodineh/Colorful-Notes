import React, { useMemo } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useNavigate } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const CalendarPage = ({ notes }) => {
  const navigate = useNavigate();

  const events = useMemo(
    () =>
      notes.map((note) => ({
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

  const handleSelectDate = (date) => {
    navigate('/', { state: { selectedDate: date } });
  };

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-6xl mx-auto relative h-[600px] w-full p-4 bg-white rounded-lg shadow-md'>
        <button
          onClick={() => navigate('/')}
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
          onSelectEvent={(event) => handleSelectDate(event.start)}
          onSelectSlot={(slotInfo) => handleSelectDate(slotInfo.start)}
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
    </div>
  );
};

export default CalendarPage;
