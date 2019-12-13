import { SvgIcon } from '@material-ui/core';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import * as React from 'react';

export const IndeterminateCheckBoxIcon = (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <g>
      <g>
        <g>
          <rect x="3.1" y="20.1" width="17.8" height="0.8" />
        </g>
      </g>
    </g>
    <g>
      <g>
        <path d="M16.6,18.3h-11v-11h11V18.3z M6.6,17.3h9v-9h-9V17.3z" />
      </g>
    </g>
    <g>
      <g>
        <polygon points="18.3,16.1 17.3,16.1 17.3,6.6 7.8,6.6 7.8,5.6 18.3,5.6 		" />
      </g>
    </g>
    <g>
      <path d="M21.5,21.5H2.5V2.5h19.1V21.5z M3.2,20.8h17.6V3.2H3.2V20.8z" />
    </g>
  </SvgIcon>
);
