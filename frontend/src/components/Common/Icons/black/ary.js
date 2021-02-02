import React from 'react';

const SvgAry = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.917-10.89l-7.589 2.733a.806.806 0 0 1-.595 0L8.12 21.11a.912.912 0 0 1-.595-.86v1.1a.9.9 0 0 0 .595.86l7.588 2.733c.199.076.41.076.596 0l7.588-2.732a.912.912 0 0 0 .595-.86v-1.1a.848.848 0 0 1-.57.86zm0-1.948l-7.589 2.733a.806.806 0 0 1-.595 0L8.12 19.162a.929.929 0 0 1-.595-.872v1.113a.9.9 0 0 0 .595.86l7.588 2.732c.199.076.41.076.596 0l7.588-2.732a.912.912 0 0 0 .595-.86v-1.1a.868.868 0 0 1-.57.86zm0-1.96l-7.589 2.732a.806.806 0 0 1-.595 0L8.12 17.202a.912.912 0 0 1-.595-.86v1.1a.9.9 0 0 0 .595.86l7.6 2.745c.2.076.41.076.596 0l7.588-2.732a.912.912 0 0 0 .596-.86v-1.1a.88.88 0 0 1-.583.847zM7.5 10.662v4.832a.9.9 0 0 0 .595.86l7.589 2.732a.805.805 0 0 0 .595 0l7.613-2.732a.912.912 0 0 0 .595-.86v-4.832a.9.9 0 0 0-.595-.86l-7.6-2.745a.806.806 0 0 0-.596 0l-7.6 2.745a.9.9 0 0 0-.596.86z" />
  </svg>
);

export default SvgAry;