import React, { useState, useEffect, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit, FaSave } from 'react-icons/fa';
import { IoMdColorPalette } from 'react-icons/io';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DOMPurify from 'dompurify';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';

// Shared constants and utilities
const colorOptions = [
  '#ECB4B4', // soft pink
  '#F6D3BF', // peach
  '#F4EFC6', // soft yellow
  '#CAE4C8', // mint green
  '#C6BCE9', // lavender
  '#C7E2E9', // light blue
  '#BECBF7', // periwinkle
  '#F0F0D0', // cream
  '#FFD1DC', // baby pink
  '#B5EAD7', // aqua mint
  '#E2F0CB', // pistachio
  '#C7CEEA', // powder blue
  '#FFDAC1', // apricot
  '#F8B195', // coral blush
];

const MAX_LENGTH = 200;

const getRandomColor = () =>
  colorOptions[Math.floor(Math.random() * colorOptions.length)];

// ✅ Child component: Single note
const NoteItem = ({ note, noteIndex, handleDeleteNote, handleUpdateNote }) => {
  const [content, setContent] = useState(note.content);
  const [errorMessage, setErrorMessage] = useState('');
  const [isVisible, setIsVisible] = useState(true);
  const [isEditing, setIsEditing] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    note.date ? new Date(note.date) : new Date()
  );
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [noteColor, setNoteColor] = useState(note.color || getRandomColor());

  const onContentChange = (evt) => {
    const newContent = DOMPurify.sanitize(evt.currentTarget.innerHTML);
    if (newContent.length > MAX_LENGTH) {
      setErrorMessage("You've reached the character limit!");
      return;
    } else {
      setErrorMessage('');
      setContent(newContent);
    }
  };

  const handleSave = () => {
    handleUpdateNote(note.id, content, selectedDate, noteColor);
    setIsEditing(false);
  };

  const handleColorSelect = (color) => {
    setNoteColor(color);
    setShowColorPicker(false);
  };

  return isVisible ? (
    <div
      className='relative p-4 w-60 sm:w-60 h-64 sm:h-64 rounded-md shadow-md flex flex-col'
      style={{
        backgroundColor: noteColor,
        backgroundImage:
          isEditing || content.length === 0
            ? 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)'
            : 'none',
        backgroundSize: '100% 27px',
      }}
    >
      <div className='absolute -top-2 -left-2 bg-red-500 text-white text-xs sm:text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full'>
        {noteIndex}
      </div>

      <div className='absolute top-2 right-2 flex gap-2'>
        {isEditing ? (
          <FaSave
            aria-label='Save note'
            className='text-lg sm:text-xl cursor-pointer hover:text-blue-500'
            onClick={handleSave}
          />
        ) : (
          <FaEdit
            aria-label='Edit note'
            className='text-lg sm:text-xl cursor-pointer hover:text-blue-500'
            onClick={() => setIsEditing(true)}
          />
        )}

        {/* Color Picker Button */}
        <div className='relative flex'>
          <IoMdColorPalette
            aria-label='Change color'
            className='w-6 h-6 text-lg sm:text-lg cursor-pointer hover:text-cyan-400'
            onClick={() => setShowColorPicker(!showColorPicker)}
          />

          {/* Color Picker Dropdown */}
          {showColorPicker && (
            <div className='absolute right-0 mt-2 flex flex-wrap gap-1 p-2 bg-white rounded-md shadow-lg border border-gray-200 z-10 w-24'>
              {colorOptions.map((color) => (
                <button
                  key={color}
                  className={`w-5 h-5 rounded-full border ${
                    noteColor === color
                      ? 'border-blue-500 border-2'
                      : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorSelect(color)}
                  title={color}
                />
              ))}
            </div>
          )}
        </div>

        <AiFillDelete
          aria-label='Delete note'
          className='text-lg sm:text-xl cursor-pointer hover:text-red-500'
          onClick={() => handleDeleteNote(note.id)}
        />
      </div>

      <ContentEditable
        className={`text-lg outline-none overflow-hidden mt-4 h-auto w-54 break-words whitespace-pre-wrap ${
          content.length >= MAX_LENGTH ? 'text-gray-400' : ''
        }`}
        onChange={onContentChange}
        onBlur={onContentChange}
        html={content}
        disabled={!isEditing}
      />

      {errorMessage && (
        <div className='text-red-500 text-sm sm:text-md font-bold mt-2'>
          {errorMessage}
        </div>
      )}

      <div className='absolute bottom-2 left-2 text-xs text-gray-600 font-semibold'>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat='EEE, MMM d, yyyy'
          customInput={
            <button className='text-gray-600 text-xs'>
              {selectedDate.toDateString()}
            </button>
          }
        />
      </div>

      <div className='absolute bottom-2 right-2 text-xs text-gray-600 font-semibold'>
        {MAX_LENGTH - content.length} / 200
      </div>
    </div>
  ) : null;
};

// ✅ Parent component: Manages all notes
function NoteField() {
  const [notes, setNotes] = useState([]);

  const handleAddNote = useCallback(() => {
    const newNote = {
      id: uuidv4(),
      content: '',
      date: new Date().toISOString(),
      color: getRandomColor(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  }, []);

  const handleDeleteNote = (id) => {
    console.log(`Deleting note with id: ${id}`);
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleUpdateNote = (id, newContent, newDate, newColor) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id
          ? {
              ...note,
              content: newContent,
              date: newDate.toISOString(),
              color: newColor,
            }
          : note
      )
    );
  };

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div
      className='min-h-screen flex flex-col items-center p-4'
      style={{ backgroundColor: '#F5F5F5' }}
    >
      <Button onAddNote={handleAddNote} />
      <div className='flex flex-wrap gap-4 justify-center w-full mt-4'>
        {notes.map((note, index) => (
          <NoteItem
            key={note.id}
            note={note}
            noteIndex={index + 1}
            handleDeleteNote={handleDeleteNote}
            handleUpdateNote={handleUpdateNote}
          />
        ))}
      </div>
    </div>
  );
}

export default NoteField;
