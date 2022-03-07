import StyledDropdown from 'components/StyledDropdown/StyledDropdown';
import React from 'react';

const sampleList = [
  { label: 'Sample tab 1', value: 'https://nervosdao.community/' },
  { label: 'Sample tab 2', value: 'https://www.nervos.org/' },
];

const Bridge = () => {
  return <StyledDropdown labelTxt="Label Name" list={sampleList} inputLabel="Input Label" />;
};

export default Bridge;
