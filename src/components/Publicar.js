import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

const Publicar = () => {
  return (
    <form className='Badge p-3 mb-4 d-flex flex-column'>
      <TextareaAutosize type='text' className='form-control resize-none' maxRows={6} placeholder='¿Qué quieres compartir?' />
      <button type='button' className='btn btn-primary mt-2'>
        Publicar
      </button>
    </form>
  );
};

export default Publicar;
