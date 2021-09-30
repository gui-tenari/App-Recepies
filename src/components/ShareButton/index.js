import React, { useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';

const COPIED_LINK_ALERT_TIME = 3000;

const ShareButton = ({ type, id, testId }) => {
  const [copiedLink, setCopiedLink] = useState(false);

  function handleShareClick() {
    const link = `${global.location.origin}/${type}/${id}`;

    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), COPIED_LINK_ALERT_TIME);
  }

  return (
    <>
      <button type="button" data-testid={ testId } onClick={ handleShareClick }>
        <img src={ shareIcon } alt="share" />
      </button>
      {copiedLink && <p>Link copiado!</p>}
    </>
  );
};

ShareButton.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
};

export default ShareButton;
