import React from 'react';

const LanguageToggle = props => {
  const currPath = window.location.pathname;
  const currLang = currPath.includes('/es/') ? 'Spanish' : 'English';

  return null; // delete this line to activate toggle button

  return (
    <button
      className='language-toggle button is-text'
      disabled={props.disabled ? props.disabled : false}
      onClick={() => {
        let newPath = '';

        if (currLang === 'Spanish') {
          newPath = currPath.substr(3);
        } else {
          newPath = '/es' + currPath;
        }

        window.location.href = newPath;
      }}
    >
      {currLang === 'Spanish' ? 'in English' : 'en Español'}
    </button>
  );
};

export default LanguageToggle;
