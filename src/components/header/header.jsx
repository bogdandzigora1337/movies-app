import React from "react";
import { Input } from "antd";
import debounce from "lodash/debounce";

import "./header.css";

const Header = ({ setInputText }) => {
  const handleInputChange = (evt) => {
    const newSearchTerm = evt.target.value;
    setInputText(newSearchTerm);
  };

  const debounceHandleInputChange = debounce(handleInputChange, 500);

  return (
    <div className="header">
      <Input
        className="header-input"
        placeholder="Type to search..."
        onChange={debounceHandleInputChange}
      />
    </div>
  );
};

export default Header;
