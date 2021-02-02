import React from 'react';

const SvgAnt = props => (
  <svg width={props.width || 64} height={props.height || 64} {...props}>
    <path
      fill="#FFF"
      fillRule="evenodd"
      d="M7.965 17.598a21.528 21.528 0 0 1-1.466-3.554 18.546 18.546 0 0 1-.46-1.746c1.812-1.488 3.95-2.762 6.248-3.828.861-.4 1.697-.748 2.486-1.045.49-.184.9-.326 1.222-.43.332.108.73.246 1.22.43.79.298 1.625.645 2.486 1.045 2.3 1.067 4.438 2.34 6.25 3.827a21.79 21.79 0 0 1-1.853 5.145 18.46 18.46 0 0 1-1.86 2.936c-3.111-.222-2.922-2.1-2.922-2.1 0-.075 0-.15.014-.224 0 0 .15-1.477 1.452-1.477a.91.91 0 0 1 .485.108c.681.366.238 1.05.238 1.05.853-.135 1.91-1.084 1.74-2.744-.171-1.66-2.163-2.514-2.163-2.514.062-.38 0-.508 0-.508-4.228-2.541-7.521-1.992-7.521-1.992l.818.813c-.082-.007-.17-.007-.252-.007-3.43.122-6.172 2.981-6.172 6.498 0 .11.004.215.01.317zM16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm11-20.098l-.226-.16c-1.842-1.55-4.02-2.88-6.372-3.996A34.162 34.162 0 0 0 16.318 6.1l-.108-.035L15.993 6l-.318.1c-1.083.347-2.518.9-4.087 1.646-2.355 1.119-4.536 2.45-6.38 4.002l-.088.075-.12.1.052.288c-.01-.04.045.24.095.464a22.706 22.706 0 0 0 1.89 5.203c.901 1.757 2 3.293 3.268 4.574a14.314 14.314 0 0 0 5.366 3.433l.118.04.21.075.214-.082.112-.04c2.008-.718 3.81-1.87 5.367-3.432 1.262-1.268 2.362-2.808 3.268-4.574a22.672 22.672 0 0 0 1.569-3.95c.218-.745.395-1.523.421-1.74l.05-.28zm-7.602.724l-.014.014c-1.193-.251-1.623-.86-1.623-.86 1.126-.008 2.142.257 2.885.704 0 0-.402-.129-.811-.183-.205.21-.382.298-.437.325z"
    />
  </svg>
);

export default SvgAnt;
