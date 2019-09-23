import React, { useState, useEffect, useRef, useMemo } from 'react';
import PropTypes from 'prop-types';
import ptBR from 'date-fns/locale/pt-BR';
import { useField } from '@rocketseat/unform';

import { isSameDay } from 'date-fns';
import { startOfMinute } from 'date-fns/esm';
import { DatePicker } from './styles';

export default function DatePickerInput({ name, placeholder, dateFormat }) {
  const ref = useRef();
  const { fieldName, error, defaultValue, registerField } = useField(name);

  const [selected, setSelected] = useState(new Date(defaultValue));

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'props.selected',
        clearValue: pickerRef => pickerRef.clear(),
      });
    }
  }, [ref]); // eslint-disable-line

  const startDate = new Date();

  const minTime = useMemo(() => {
    if (isSameDay(selected, startDate)) {
      startOfMinute(selected);
    }
  }, [selected]); // eslint-disable-line

  return (
    <>
      <DatePicker
        name={name}
        selected={selected}
        minDate={startDate}
        minTime={minTime}
        onChange={date => setSelected(date)}
        placeholderText={placeholder}
        dateFormat={dateFormat}
        locale={ptBR}
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
  dateFormat: 'dd/MM/YYYY HH:mm',
};
