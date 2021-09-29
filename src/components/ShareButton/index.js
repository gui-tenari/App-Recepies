import React, { useState } from 'react';

import shareIcon from '../../images/shareIcon.svg';

const COPIED_LINK_ALERT_TIME = 3000;

const ShareButton = () => {
  const [copiedLink, setCopiedLink] = useState(false);

  function handleShareClick() {
    const link = global.location.href.replace('/in-progress', '');

    navigator.clipboard.writeText(link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), COPIED_LINK_ALERT_TIME);
  }

  return (
    <>
      <button type="button" data-testid="share-btn" onClick={ handleShareClick }>
        <img src={ shareIcon } alt="share" />
      </button>
      {copiedLink && <p>Link copiado!</p>}
    </>
  );
};

export default ShareButton;
