import pl from 'date-fns/locale/pl';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IHighliteDate {
  startDate: Date;
  setStartDate: Function;
}

const HighliteDates = ({ startDate, setStartDate }: IHighliteDate) => {
  return (
    <DatePicker
      selected={startDate}
      dateFormat='dd.MM.yyyy'
      onChange={(date) => setStartDate(date as Date)}
      excludeDates={[]}
      // minDate={new Date()}
      locale={pl}
      placeholderText='Select a date other than today or yesterday'
    />
  );
};

export default HighliteDates;
