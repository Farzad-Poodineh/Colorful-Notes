import React, { useState, useCallback } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaEdit, FaSave } from 'react-icons/fa';
import { IoMdColorPalette } from 'react-icons/io';
import ContentEditable from 'react-contenteditable';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DOMPurify from 'dompurify';
import { colorOptions, getRandomColor } from './Constants'; // ✅ Make sure this line is present

const MAX_LENGTH = 200;

const NoteItem = React.memo(
  ({ note, noteIndex, handleDeleteNote, handleUpdateNote }) => {
    const [content, setContent] = useState(note.content);
    const [errorMessage, setErrorMessage] = useState('');
    const [isEditing, setIsEditing] = useState(!note.content);
    const [selectedDate, setSelectedDate] = useState(new Date(note.date));
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [noteColor, setNoteColor] = useState(note.color || getRandomColor());
    const [isSaved, setIsSaved] = useState(!!note.content);

    const onContentChange = useCallback((evt) => {
      const newContent = DOMPurify.sanitize(evt.currentTarget.innerHTML);
      if (newContent.length > MAX_LENGTH) {
        setErrorMessage('Character limit reached!');
        return;
      }
      setErrorMessage('');
      setContent(newContent);
    }, []);

    const handleSave = useCallback(() => {
      handleUpdateNote(note.id, content, selectedDate, noteColor);
      setIsEditing(false);
      setIsSaved(true);
    }, [note.id, content, selectedDate, noteColor, handleUpdateNote]);

    const handleColorSelect = useCallback(
      (color) => {
        setNoteColor(color);
        setShowColorPicker(false);
        handleUpdateNote(note.id, content, selectedDate, color); // ✅ Save selected color
      },
      [note.id, content, selectedDate, handleUpdateNote]
    );

    const toggleEdit = useCallback(() => setIsEditing((prev) => !prev), []);
    const toggleColorPicker = useCallback(
      () => setShowColorPicker((prev) => !prev),
      []
    );

    return (
      <div
        className='relative p-4 w-60 h-64 rounded-md shadow-md flex flex-col transition-all duration-200'
        style={{
          backgroundColor: noteColor,
          backgroundImage:
            isEditing || !content
              ? 'linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)'
              : 'none',
          backgroundSize: '100% 27px',
        }}
      >
        <div className='absolute -top-2 -left-2 bg-red-500 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full'>
          {noteIndex}
        </div>

        <div className='absolute top-2 right-2 flex gap-2'>
          {isEditing ? (
            <FaSave
              className='text-xl cursor-pointer hover:text-blue-500 transition-colors'
              onClick={handleSave}
              aria-label='Save note'
            />
          ) : (
            <FaEdit
              className='text-xl cursor-pointer hover:text-blue-500 transition-colors'
              onClick={toggleEdit}
              aria-label='Edit note'
            />
          )}

          <div className='relative'>
            <IoMdColorPalette
              className='text-xl cursor-pointer hover:text-cyan-400 transition-colors'
              onClick={toggleColorPicker}
              aria-label='Change color'
            />
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
                    aria-label={`Color ${color}`}
                  />
                ))}
              </div>
            )}
          </div>

          <AiFillDelete
            className='text-xl cursor-pointer hover:text-red-500 transition-colors'
            onClick={() => handleDeleteNote(note.id)}
            aria-label='Delete note'
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
          <div className='text-red-500 text-sm font-bold mt-2'>
            {errorMessage}
          </div>
        )}

        <div className='absolute bottom-2 left-2 text-xs text-gray-600 font-semibold'>
          <DatePicker
            selected={selectedDate}
            onChange={setSelectedDate}
            dateFormat='EEE, MMM d, yyyy'
            customInput={
              <button className='text-gray-600 text-xs hover:text-gray-800'>
                {selectedDate.toDateString()}
              </button>
            }
          />
        </div>

        <div className='absolute bottom-2 right-2 text-xs text-gray-600 font-semibold'>
          {MAX_LENGTH - content.length} / 200
        </div>
      </div>
    );
  }
);

export default NoteItem;
