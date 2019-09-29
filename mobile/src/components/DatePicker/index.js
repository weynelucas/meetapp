import React, { useState, useMemo, useEffect } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { format, startOfDay, addDays } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import { isBefore } from 'date-fns/esm';
import { Container, Title, Button, ButtonIcon } from './styles';

export default function DatePicker({ style, onChangeDate }) {
  const today = new Date();

  const [date, setDate] = useState(today);

  useEffect(() => {
    onChangeDate(date);
  }, [date]); //eslint-disable-line

  const dateFormatted = useMemo(
    () => format(date, "dd  'de' MMMM", { locale }),
    [date],
  );

  const hasPrevious = useMemo(() => {
    const startPrevious = startOfDay(addDays(date, -1));
    const startToday = startOfDay(today);

    return isBefore(startPrevious, startToday);
  }, [date]); //eslint-disable-line

  function handleNext() {
    setDate(addDays(date, 1));
  }

  function handlePrevious() {
    setDate(addDays(date, -1));
  }

  return (
    <Container style={style}>
      <Button disabled={hasPrevious} onPress={handlePrevious}>
        <ButtonIcon disabled={hasPrevious} name="keyboard-arrow-left" />
      </Button>

      <Title>{dateFormatted}</Title>

      <Button onPress={handleNext}>
        <ButtonIcon name="keyboard-arrow-right" />
      </Button>
    </Container>
  );
}

DatePicker.propTypes = {
  onChangeDate: PropTypes.func,
  style: ViewPropTypes.style,
};

DatePicker.defaultProps = {
  onChangeDate: () => {},
  style: {},
};
