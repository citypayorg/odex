import React from 'react';

const SvgLink = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <path
      d="M15 18.618a1.5 1.5 0 1 1 2 0V21a1 1 0 0 1-2 0zM10 14a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8a1 1 0 0 0-1-1v-2a6 6 0 1 0-12 0v2zm6 0h3.5v-1.9c0-1.988-1.567-3.6-3.5-3.6s-3.5 1.612-3.5 3.6V14H22zm0 18C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16z"
      fill="#fff"
      fillRule="evenodd"
    />
  </svg>
);

export default SvgLink;