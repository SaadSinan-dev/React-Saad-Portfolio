/**
 * The complete icon set for the site — hand-rolled so no icon library ships in
 * the bundle. All glyphs are stroked on the same 24px grid at the same weight
 * (1.6) so they sit together consistently at any size; brand marks are the only
 * filled paths.
 */

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

const Svg = ({ children, className = 'h-4 w-4', ...rest }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" {...rest}>
    {children}
  </svg>
);

export const ArrowRight = (props) => (
  <Svg {...props}>
    <path d="M4 12h15M13 6l6 6-6 6" {...stroke} />
  </Svg>
);

export const ArrowDown = (props) => (
  <Svg {...props}>
    <path d="M12 4v15M6 13l6 6 6-6" {...stroke} />
  </Svg>
);

export const ArrowUpRight = (props) => (
  <Svg {...props}>
    <path d="M7 17 17 7M8 7h9v9" {...stroke} />
  </Svg>
);

export const Close = (props) => (
  <Svg {...props}>
    <path d="M6 6l12 12M18 6L6 18" {...stroke} />
  </Svg>
);

export const ChevronLeft = (props) => (
  <Svg {...props}>
    <path d="M14 6l-6 6 6 6" {...stroke} />
  </Svg>
);

export const ChevronRight = (props) => (
  <Svg {...props}>
    <path d="M10 6l6 6-6 6" {...stroke} />
  </Svg>
);

export const ChevronDown = (props) => (
  <Svg {...props}>
    <path d="M6 9l6 6 6-6" {...stroke} />
  </Svg>
);

export const Menu = (props) => (
  <Svg {...props}>
    <path d="M4 8h16M4 16h16" {...stroke} />
  </Svg>
);

export const Mail = (props) => (
  <Svg {...props}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" {...stroke} />
    <path d="m3.5 7 7.4 5.2a2 2 0 0 0 2.2 0L20.5 7" {...stroke} />
  </Svg>
);

export const Document = (props) => (
  <Svg {...props}>
    <path d="M6 3h7l5 5v13H6z" {...stroke} />
    <path d="M13 3v5h5M9 13h6M9 17h4" {...stroke} />
  </Svg>
);

export const Sun = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="12" r="4" {...stroke} />
    <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" {...stroke} />
  </Svg>
);

export const Moon = (props) => (
  <Svg {...props}>
    <path d="M20 14.2A8.2 8.2 0 0 1 9.8 4a8.2 8.2 0 1 0 10.2 10.2z" {...stroke} />
  </Svg>
);

export const Home = (props) => (
  <Svg {...props}>
    <path d="M4 10.5 12 4l8 6.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" {...stroke} />
  </Svg>
);

export const Person = (props) => (
  <Svg {...props}>
    <circle cx="12" cy="8.5" r="3.5" {...stroke} />
    <path d="M5 20a7 7 0 0 1 14 0" {...stroke} />
  </Svg>
);

export const Layers = (props) => (
  <Svg {...props}>
    <path d="m12 3 8 4.5-8 4.5-8-4.5z" {...stroke} />
    <path d="m4 12 8 4.5 8-4.5M4 16.5 12 21l8-4.5" {...stroke} />
  </Svg>
);

export const Grid = (props) => (
  <Svg {...props}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" {...stroke} />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" {...stroke} />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" {...stroke} />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" {...stroke} />
  </Svg>
);

export const Eye = (props) => (
  <Svg {...props}>
    <path d="M2.5 12S6 6 12 6s9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6z" {...stroke} />
    <circle cx="12" cy="12" r="2.5" {...stroke} />
  </Svg>
);

// ─── Brand marks ──────────────────────────────────────────────────────────────

export const GitHub = (props) => (
  <Svg {...props}>
    <path
      fill="currentColor"
      d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.38-1.34-1.75-1.34-1.75-1.08-.75.09-.73.09-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.7.8.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z"
    />
  </Svg>
);

export const LinkedIn = (props) => (
  <Svg {...props}>
    <path
      fill="currentColor"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zm1.78 13.02H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"
    />
  </Svg>
);

export const WhatsApp = (props) => (
  <Svg {...props}>
    <path
      fill="currentColor"
      d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.53.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.42.25-.69.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35z"
    />
    <path
      fill="currentColor"
      d="M12 0C5.37 0 0 5.37 0 12c0 2.1.55 4.08 1.5 5.8L0 24l6.35-1.65A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12S18.63 0 12 0zm.03 21.9a9.87 9.87 0 0 1-4.76-1.23l-.36-.21-3.74.98 1-3.65-.24-.37A9.86 9.86 0 0 1 2.1 12.05C2.1 6.55 6.55 2.1 12.05 2.1c2.63 0 5.09 1.02 6.95 2.88a9.77 9.77 0 0 1 2.88 6.95c0 5.5-4.45 9.95-9.85 9.95z"
    />
  </Svg>
);

/** The Flutter chevron — used once, at small size, as a signature mark. */
export const FlutterMark = (props) => (
  <Svg {...props}>
    <path fill="currentColor" d="M14.31 0 2.3 12l3.7 3.7L21.69 0zm.16 11.26-3.81 3.82 3.81 3.82 3.83-3.82z" />
  </Svg>
);
