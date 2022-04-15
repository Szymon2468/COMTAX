import React, { useState } from 'react';
import styles from './HighliteDates.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { excludedDays } from '../../configs/excludedDays';

const HighliteDates = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date as Date)}
      excludeDates={[new Date()]}
      placeholderText='Select a date other than today or yesterday'
    />
  );
};

export default HighliteDates;
