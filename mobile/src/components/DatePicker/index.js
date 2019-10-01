import React, { useState, useMemo, useEffect } from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import { format, addDays, startOfDay } from 'date-fns';
import locale from 'date-fns/locale/pt-BR';

import { Container, Title, Button, ButtonIcon } from './styles';

export default function DatePicker({
  value,
  onChangeDate,
  hasNext,
  hasPrevious,
  style,
}) {
  const [date, setDate] = useState(value);
  useEffect(() => {
    onChangeDate(date);
  }, [date]); //eslint-disable-line

  const dateFormatted = useMemo(
    () => format(startOfDay(value), "dd  'de' MMMM", { locale }),
    [value],
  );

  function handleNext() {
    setDate(addDays(date, 1));
  }

  function handlePrevious() {
    setDate(addDays(date, -1));
  }

  return (
    <Container style={style}>
      <Button disabled={!hasPrevious} onPress={handlePrevious}>
        <ButtonIcon disabled={!hasPrevious} name="keyboard-arrow-left" />
      </Button>

      <Title>{dateFormatted}</Title>

      <Button disabled={!hasNext} onPress={handleNext}>
        <ButtonIcon disabled={!hasNext} name="keyboard-arrow-right" />
      </Button>
    </Container>
  );
}

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  hasPrevious: PropTypes.bool,
  hasNext: PropTypes.bool,
  onChangeDate: PropTypes.func,
  style: ViewPropTypes.style,
};

DatePicker.defaultProps = {
  hasPrevious: true,
  hasNext: true,
  onChangeDate: () => {},
  style: {},
};
