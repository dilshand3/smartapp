import React, { useState } from 'react';
import './ContentToggle.css';

interface toggle {
  setshowUrl: any
}

const ContentToggle: React.FC<toggle> = ({ setshowUrl }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const handleToggle = (): void => {
    setIsChecked(!isChecked);
    setshowUrl(isChecked)
  };

  return (
    <div className="toggle-container">
      <label className="toggle-label">
        <input
          type="checkbox"
          className="toggle-input"
          checked={isChecked}
          onChange={handleToggle}
        />
        <span className="toggle-slider">
          <span className="toggle-icon-off material-icons">
            description
          </span>
          <span className="toggle-icon-on material-icons">
            link
          </span>
        </span>
      </label>
    </div>
  );
};

export default ContentToggle;