import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';
import StickyNotesBackground from './StickyNotesBackground';
import NoteItem from './NoteItem';
import NotesCalendar from './NotesCalendar';
import { getRandomColor, colorOptions } from './Constants';

function NoteField() {
  const [notes, setNotes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNotes = () => {
      try {
        const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
        setNotes(storedNotes);
      } catch (error) {
        console.error('Failed to load notes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadNotes();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes, isLoading]);

  const filteredNotes = useMemo(() => {
    if (!selectedDate) return notes;
    return notes.filter((note) => {
      const noteDate = new Date(note.date);
      return (
        noteDate.getDate() === selectedDate.getDate() &&
        noteDate.getMonth() === selectedDate.getMonth() &&
        noteDate.getFullYear() === selectedDate.getFullYear()
      );
    });
  }, [notes, selectedDate]);

  const handleAddNote = useCallback(() => {
    const newNote = {
      id: uuidv4(),
      content: '',
      date: new Date().toISOString(),
      color: getRandomColor(),
      isNew: true,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
  }, []);

  const handleDeleteNote = useCallback((id) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  }, []);

  const handleUpdateNote = useCallback((id, newContent, newDate, newColor) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              content: newContent,
              date: newDate.toISOString(),
              color: newColor,
              isNew: false,
            }
          : note
      )
    );
  }, []);

  const handleDateSelect = useCallback((date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  }, []);

  const clearDateFilter = useCallback(() => {
    setSelectedDate(null);
  }, []);

  const toggleCalendar = useCallback(() => {
    setShowCalendar((prev) => !prev);
  }, []);

  if (isLoading) {
    return (
      <StickyNotesBackground>
        <div className='min-h-screen flex items-center justify-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
        </div>
      </StickyNotesBackground>
    );
  }

  return (
    <StickyNotesBackground>
      <div className='min-h-screen flex flex-col items-center p-4'>
        <div className='w-full max-w-6xl'>
          {/* ✅ Responsive Button Controls */}
          <div className='flex flex-wrap gap-3 justify-center sm:justify-between items-center mb-6'>
            <button
              onClick={handleAddNote}
              className='w-full sm:w-auto text-center rounded-md bg-pink-600 px-5 py-2.5 text-white text-base font-semibold [transition-timing-function:cubic-bezier(0.175,0.885,0.32,1.275)] active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:bg-red-300 hover:text-black transition duration-300 ease-in-out'
            >
              <span className='text-lg mr-1'>+</span> Add New Note
            </button>

            <div className='flex flex-col sm:flex-row gap-3 w-full sm:w-auto'>
              {selectedDate && (
                <button
                  onClick={clearDateFilter}
                  className='w-full sm:w-auto px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors text-center'
                >
                  Clear Date Filter
                </button>
              )}

              <button
                onClick={toggleCalendar}
                className='w-full sm:w-auto flex justify-center items-center gap-2 rounded-md bg-pink-600 px-5 py-2.5 text-white font-semibold duration-300 active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:bg-red-300 hover:text-black transition'
              >
                <FaCalendarAlt />
                {showCalendar ? 'Hide Calendar' : 'Show Calendar'}
              </button>
            </div>
          </div>

          {showCalendar && (
            <div className='mb-8'>
              <NotesCalendar
                notes={notes}
                onSelectDate={handleDateSelect}
                onClose={() => setShowCalendar(false)}
              />
            </div>
          )}

          {selectedDate && (
            <div className='mb-6 text-lg font-semibold text-center bg-white p-3 rounded-lg shadow-sm'>
              Showing notes for: {selectedDate.toDateString()}
              <button
                onClick={clearDateFilter}
                className='ml-3 text-sm text-gray-500 hover:text-gray-700 transition-colors'
                aria-label='Clear date filter'
              >
                (Clear)
              </button>
            </div>
          )}

          <div className='flex flex-wrap gap-4 justify-center w-full'>
            {filteredNotes.length > 0 ? (
              filteredNotes.map((note, index) => (
                <NoteItem
                  key={note.id}
                  note={note}
                  noteIndex={index + 1}
                  handleDeleteNote={handleDeleteNote}
                  handleUpdateNote={handleUpdateNote}
                />
              ))
            ) : (
              <div className='w-full text-center py-12 bg-white rounded-lg shadow-sm'>
                <p className='text-gray-500 text-lg'>
                  {selectedDate
                    ? `No notes found for ${selectedDate.toDateString()}`
                    : 'No notes yet. Click "Add New Note" to create your first one!'}
                </p>
                {!selectedDate && (
                  <button
                    onClick={handleAddNote}
                    className='mt-4 overflow-hidden rounded-md bg-neutral-950 px-5 py-2.5 text-white font-semibold active:translate-y-1 active:scale-x-110 active:scale-y-90 hover:bg-gray-600 transition duration-300 ease-in-out'
                  >
                    Create First Note
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </StickyNotesBackground>
  );
}

export default NoteField;
