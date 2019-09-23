import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useField } from '@rocketseat/unform';
import { MdCameraAlt } from 'react-icons/md';

import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput({ name }) {
  const {
    fieldName,
    error: fieldError,
    defaultValue,
    registerField,
  } = useField(name);

  const ref = useRef();

  const [error, setError] = useState(fieldError);
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  useEffect(() => {
    setError(fieldError);
  }, [fieldError]);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: fieldName,
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, fieldName]); // eslint-disable-line

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);

    try {
      const response = await api.post('/files', data);
      const { id, url } = response.data;

      setFile(id);
      setPreview(url);
    } catch (err) {
      setError('Não foi possível realizar o upload da imagem.');
    }
  }

  return (
    <Container>
      <label htmlFor={name}>
        {preview ? (
          <img src={preview} alt="Selecionar imagem" />
        ) : (
          <div>
            <MdCameraAlt size={54} />
            <strong>Selecionar imagem</strong>
          </div>
        )}

        <input
          id={name}
          type="file"
          ref={ref}
          onChange={handleChange}
          data-file={file}
        />
      </label>
      {error && <span>{error}</span>}
    </Container>
  );
}

BannerInput.propTypes = {
  name: PropTypes.string.isRequired,
};
