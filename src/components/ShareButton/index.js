import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';

import shareIcon from '../../images/icons/shareIcon.svg';

import './style.css';

const COPIED_LINK_ALERT_TIME = 2000;

const ShareButton = ({ type, id, testId }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  function handleShareClick() {
    const link = `${global.location.origin}/${type}/${id}`;

    copy(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), COPIED_LINK_ALERT_TIME);
  }

  return (
    <>
      <button type="button" onClick={ handleShareClick } className="share-icon">
        <img src={ shareIcon } alt="share" data-testid={ testId } />
      </button>
      {copiedLink && <p className="copy-modal">Link copiado!</p>}
    </>
  );
};

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ShareButton;
