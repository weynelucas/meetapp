import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import ptBR from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';

import { isSameDay } from 'date-fns';
import { startOfMinute, startOfDay, endOfDay } from 'date-fns/esm';

import { DatePicker } from './styles';

export default function DatePickerInput({ name, placeholder, dateFormat }) {
  const ref = useRef();
  const { fieldName, error, defaultValue, registerField } = useField(name);

  const [selected, setSelected] = useState(
    defaultValue && new Date(defaultValue),
  );

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.selected',
        clearValue: pickerRef => pickerRef.clear(),
      });
    }
  }, [ref, fieldName]); // eslint-disable-line

  const startDate = new Date();

  const maxTime = endOfDay(startDate);

  const minTime = useMemo(() => {
    if (!selected || isSameDay(selected, startDate)) {
      return startOfMinute(startDate);
    }

    return startOfDay(startDate);
  }, [selected]); // eslint-disable-line

  return (
    <>
      <DatePicker
        name={name}
        selected={selected}
        onChange={date => setSelected(date)}
        minDate={startDate}
        minTime={minTime}
        maxTime={maxTime}
        timeIntervals={60}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        showTimeSelect
        locale={ptBR}
        autoComplete="off"
        ref={ref}
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePickerInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  dateFormat: PropTypes.string,
};

DatePickerInput.defaultProps = {
  placeholder: '',
  dateFormat: 'dd/MM/yyyy HH:mm',
};
