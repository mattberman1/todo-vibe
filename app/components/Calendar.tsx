'use client';

import { useState } from 'react';

interface CalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  todos: Array<{
    id: number;
    text: string;
    completed: boolean;
    dueDate?: Date;
  }>;
}

export default function Calendar({ selectedDate, onDateSelect, todos }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const getTodosForDate = (date: Date) => {
    return todos.filter(todo => {
      if (!todo.dueDate) return false;
      return (
        todo.dueDate.getDate() === date.getDate() &&
        todo.dueDate.getMonth() === date.getMonth() &&
        todo.dueDate.getFullYear() === date.getFullYear()
      );
    });
  };

  const renderCalendarDays = () => {
    const days = [];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Add day names
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={`day-${i}`} className="text-center text-sm font-medium text-gray-500 py-2">
          {dayNames[i]}
        </div>
      );
    }

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-12" />);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const todosForDay = getTodosForDate(date);
      const isSelected = selectedDate.toDateString() === date.toDateString();
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          onClick={() => onDateSelect(date)}
          className={`relative h-12 flex items-center justify-center cursor-pointer rounded-full
            ${isSelected ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}
            ${isToday && !isSelected ? 'border-2 border-blue-500' : ''}
            transition-all duration-200`}
        >
          <span className="text-sm">{day}</span>
          {todosForDay.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 rounded-full bg-blue-500" />
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-medium text-gray-800">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h2>
        <button
          onClick={nextMonth}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
    </div>
  );
} 