import React, { useState } from 'react';
import '../../../css/calendar/Calendar.css';
import { Button } from 'react-bootstrap';

const Calendar = ({ year, month, onDateSelect }) => {
  const daysInMonth = new Date(year, month, 0).getDate();
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const renderDays = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        <Button
          variant='secondary'
          key={i}
          onClick={() => handleDateClick(i)}
          className={selectedDate === i ? 'selected' : ''}
        >
          {i}
        </Button>
      );
    }
    return days;
  };

  return (
    <div className="calendar">
      <div className="days-container">
        {renderDays()}
      </div>
    </div>
  );
};

export default Calendar;
