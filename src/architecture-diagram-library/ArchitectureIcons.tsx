import React from 'react';
import {architectureDiagramTheme} from './theme';

type IconRenderProps = {
  stroke: string;
  accent: string;
  muted: string;
  strokeWidth: number;
};

type IconDefinition = {
  title: string;
  category: 'people' | 'system' | 'data' | 'security' | 'workflow' | 'observability' | 'delivery' | 'meta';
  render: (props: IconRenderProps) => React.ReactNode;
};

const lineProps = ({stroke, strokeWidth}: IconRenderProps) => ({
  fill: 'none',
  stroke,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const accentLineProps = ({accent, strokeWidth}: IconRenderProps) => ({
  fill: 'none',
  stroke: accent,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const mutedLineProps = ({muted, strokeWidth}: IconRenderProps) => ({
  fill: 'none',
  stroke: muted,
  strokeWidth,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const solidAccentProps = ({accent}: IconRenderProps) => ({
  fill: accent,
  stroke: 'none',
});

export const architectureIconDefinitions = {
  users: {
    title: 'Users',
    category: 'people',
    render: (p) => (
      <>
        <circle cx="48" cy="28" r="12" {...lineProps(p)} />
        <path d="M27 68 C29 51 37 44 48 44 C59 44 67 51 69 68" {...lineProps(p)} />
        <circle cx="23" cy="35" r="8" {...lineProps(p)} />
        <path d="M8 66 C10 54 15 49 23 49 C28 49 32 51 35 56" {...lineProps(p)} />
        <circle cx="73" cy="35" r="8" {...lineProps(p)} />
        <path d="M61 56 C64 51 68 49 73 49 C81 49 86 54 88 66" {...lineProps(p)} />
        <path d="M32 68 H64" {...accentLineProps(p)} />
      </>
    ),
  },
  graph: {
    title: 'Graph',
    category: 'system',
    render: (p) => (
      <>
        <path d="M31 69 L49 28 L70 70" {...lineProps(p)} />
        <circle cx="49" cy="28" r="8" {...accentLineProps(p)} />
        <circle cx="31" cy="69" r="8" {...accentLineProps(p)} />
        <circle cx="70" cy="70" r="8" {...accentLineProps(p)} />
        <path d="M18 47 C24 48 29 45 33 39" {...lineProps(p)} />
        <path d="M14 51 L20 44" {...lineProps(p)} />
      </>
    ),
  },
  serverStack: {
    title: 'Server stack',
    category: 'system',
    render: (p) => (
      <>
        {[20, 40, 60].map((y) => (
          <g key={y}>
            <rect x="22" y={y - 10} width="52" height="20" rx="4" {...lineProps(p)} />
            <path d={`M31 ${y} H45`} {...lineProps(p)} />
            <circle cx="59" cy={y} r="2.6" {...solidAccentProps(p)} />
            <circle cx="68" cy={y} r="2.6" {...solidAccentProps(p)} />
          </g>
        ))}
      </>
    ),
  },
  database: {
    title: 'Database',
    category: 'data',
    render: (p) => (
      <>
        <ellipse cx="48" cy="23" rx="25" ry="11" {...lineProps(p)} />
        <path d="M23 23 V66 C23 72 34 78 48 78 C62 78 73 72 73 66 V23" {...lineProps(p)} />
        <path d="M23 44 C23 50 34 56 48 56 C62 56 73 50 73 44" {...lineProps(p)} />
        <path d="M31 35 H36 M31 57 H36" {...accentLineProps(p)} />
      </>
    ),
  },
  cloud: {
    title: 'Cloud',
    category: 'system',
    render: (p) => (
      <>
        <path d="M25 66 H70 C80 66 86 60 86 51 C86 42 80 36 71 36 C68 25 59 18 48 18 C35 18 25 28 24 41 C15 42 10 48 10 56 C10 62 16 66 25 66 Z" {...lineProps(p)} />
        <path d="M30 66 H68" {...accentLineProps(p)} />
      </>
    ),
  },
  shieldCheck: {
    title: 'Shield check',
    category: 'security',
    render: (p) => (
      <>
        <path d="M48 10 C55 18 64 21 75 23 V43 C75 60 64 72 48 84 C32 72 21 60 21 43 V23 C32 21 41 18 48 10 Z" {...lineProps(p)} />
        <path d="M34 47 L44 57 L63 35" {...accentLineProps(p)} />
      </>
    ),
  },
  growthChart: {
    title: 'Growth chart',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M18 74 H78" {...lineProps(p)} />
        {[24, 39, 54, 69].map((x, index) => (
          <rect key={x} x={x - 4} y={62 - index * 10} width="8" height={12 + index * 10} rx="2" {...lineProps(p)} />
        ))}
        <path d="M18 44 C34 43 51 34 73 14" {...accentLineProps(p)} />
        <path d="M72 14 L72 29 M72 14 L57 15" {...accentLineProps(p)} />
      </>
    ),
  },
  clock: {
    title: 'Clock',
    category: 'observability',
    render: (p) => (
      <>
        <circle cx="48" cy="48" r="34" {...lineProps(p)} />
        <path d="M48 26 V49 L64 60" {...lineProps(p)} />
        <path d="M48 16 V21 M80 48 H75 M48 80 V75 M16 48 H21" {...lineProps(p)} />
        <circle cx="48" cy="48" r="3" {...solidAccentProps(p)} />
        <path d="M72 32 C77 38 80 44 80 50" {...accentLineProps(p)} />
      </>
    ),
  },
  globe: {
    title: 'Globe',
    category: 'system',
    render: (p) => (
      <>
        <circle cx="48" cy="48" r="34" {...lineProps(p)} />
        <path d="M14 48 H82 M48 14 C37 23 31 34 31 48 C31 62 37 73 48 82 M48 14 C59 23 65 34 65 48 C65 62 59 73 48 82 M22 30 C37 36 59 36 74 30 M22 66 C37 60 59 60 74 66" {...lineProps(p)} />
      </>
    ),
  },
  networkTree: {
    title: 'Network tree',
    category: 'system',
    render: (p) => (
      <>
        <rect x="39" y="13" width="18" height="16" rx="3" {...lineProps(p)} />
        <path d="M48 29 V45 M22 45 H74 M22 45 V57 M48 45 V57 M74 45 V57" {...lineProps(p)} />
        {[22, 48, 74].map((x) => <rect key={x} x={x - 8} y="57" width="16" height="16" rx="2" {...lineProps(p)} />)}
        <circle cx="48" cy="45" r="3" {...solidAccentProps(p)} />
      </>
    ),
  },
  hexCluster: {
    title: 'Hex cluster',
    category: 'system',
    render: (p) => (
      <>
        <polygon points="32,16 45,24 45,40 32,48 19,40 19,24" {...lineProps(p)} />
        <polygon points="59,33 72,41 72,57 59,65 46,57 46,41" {...lineProps(p)} />
        <polygon points="32,50 45,58 45,74 32,82 19,74 19,58" {...accentLineProps(p)} />
      </>
    ),
  },
  browserCode: {
    title: 'Browser code',
    category: 'delivery',
    render: (p) => (
      <>
        <rect x="14" y="18" width="68" height="56" rx="5" {...lineProps(p)} />
        <path d="M14 32 H82" {...lineProps(p)} />
        <circle cx="24" cy="25" r="2.5" {...solidAccentProps(p)} />
        <circle cx="34" cy="25" r="2.5" {...solidAccentProps(p)} />
        <path d="M42 48 L32 58 L42 68 M54 48 L64 58 L54 68" {...accentLineProps(p)} />
        <path d="M51 45 L45 71" {...lineProps(p)} />
      </>
    ),
  },
  gear: {
    title: 'Gear',
    category: 'system',
    render: (p) => (
      <>
        <path d="M48 14 L55 15 L58 25 L67 22 L74 32 L68 40 L75 48 L68 56 L74 64 L67 74 L58 71 L55 81 L48 82 L41 81 L38 71 L29 74 L22 64 L28 56 L21 48 L28 40 L22 32 L29 22 L38 25 L41 15 Z" {...lineProps(p)} />
        <circle cx="48" cy="48" r="14" {...accentLineProps(p)} />
      </>
    ),
  },
  laptopCode: {
    title: 'Laptop code',
    category: 'delivery',
    render: (p) => (
      <>
        <rect x="23" y="18" width="50" height="39" rx="4" {...lineProps(p)} />
        <path d="M16 64 H80 L73 57 H23 Z" {...lineProps(p)} />
        <path d="M41 34 L32 43 L41 52 M55 34 L64 43 L55 52" {...accentLineProps(p)} />
      </>
    ),
  },
  phoneCode: {
    title: 'Phone code',
    category: 'delivery',
    render: (p) => (
      <>
        <rect x="32" y="12" width="32" height="72" rx="5" {...lineProps(p)} />
        <path d="M44 20 H52 M45 75 H51" {...accentLineProps(p)} />
        <path d="M43 40 L36 47 L43 54 M53 40 L60 47 L53 54" {...accentLineProps(p)} />
      </>
    ),
  },
  apiGear: {
    title: 'API gear',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M48 15 L55 16 L58 25 L67 23 L73 32 L68 40 L75 48 L68 56 L73 64 L67 73 L58 71 L55 80 L48 81 L41 80 L38 71 L29 73 L23 64 L28 56 L21 48 L28 40 L23 32 L29 23 L38 25 L41 16 Z" {...lineProps(p)} />
        <text x="48" y="56" fill={p.accent} fontFamily="Arial, sans-serif" fontSize="22" fontWeight="800" textAnchor="middle">
          API
        </text>
      </>
    ),
  },
  braces: {
    title: 'Braces',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M34 18 C25 18 25 24 25 31 V39 C25 45 19 45 19 48 C19 51 25 51 25 57 V65 C25 72 25 78 34 78" {...lineProps(p)} />
        <path d="M62 18 C71 18 71 24 71 31 V39 C71 45 77 45 77 48 C77 51 71 51 71 57 V65 C71 72 71 78 62 78" {...lineProps(p)} />
        <circle cx="42" cy="48" r="2.5" {...solidAccentProps(p)} />
        <circle cx="48" cy="48" r="2.5" {...solidAccentProps(p)} />
        <circle cx="54" cy="48" r="2.5" {...solidAccentProps(p)} />
      </>
    ),
  },
  puzzle: {
    title: 'Puzzle',
    category: 'system',
    render: (p) => (
      <>
        <path d="M21 30 H36 C35 22 40 17 47 17 C54 17 59 22 58 30 H75 V47 C66 46 62 52 62 58 C62 65 67 69 75 68 V79 H21 V62 C30 63 34 58 34 52 C34 46 30 41 21 42 Z" {...lineProps(p)} />
        <path d="M48 17 C55 17 60 22 59 30" {...accentLineProps(p)} />
      </>
    ),
  },
  tag: {
    title: 'Tag',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M17 45 L45 17 L72 18 L78 45 L50 73 Z" {...lineProps(p)} />
        <circle cx="63" cy="31" r="4" {...lineProps(p)} />
        <path d="M35 55 L50 40" {...accentLineProps(p)} />
        <path d="M42 61 L57 46" {...accentLineProps(p)} />
      </>
    ),
  },
  search: {
    title: 'Search',
    category: 'observability',
    render: (p) => (
      <>
        <circle cx="42" cy="42" r="24" {...lineProps(p)} />
        <path d="M59 59 L78 78" {...lineProps(p)} />
        <path d="M56 31 C61 40 59 50 51 57" {...accentLineProps(p)} />
      </>
    ),
  },
  document: {
    title: 'Document',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M27 14 H56 L72 30 V82 H27 Z" {...lineProps(p)} />
        <path d="M56 14 V31 H72" {...lineProps(p)} />
        <path d="M38 45 H60 M38 56 H60 M38 67 H53" {...accentLineProps(p)} />
      </>
    ),
  },
  checklist: {
    title: 'Checklist',
    category: 'workflow',
    render: (p) => (
      <>
        <rect x="27" y="18" width="42" height="64" rx="4" {...lineProps(p)} />
        <path d="M39 18 C39 13 43 11 48 11 C53 11 57 13 57 18" {...lineProps(p)} />
        <path d="M36 37 L41 42 L49 32 M36 54 L41 59 L49 49" {...accentLineProps(p)} />
        <path d="M54 38 H62 M54 55 H62 M36 70 H62" {...lineProps(p)} />
      </>
    ),
  },
  folder: {
    title: 'Folder',
    category: 'data',
    render: (p) => (
      <>
        <path d="M14 33 H38 L45 42 H80 V72 H14 Z" {...lineProps(p)} />
        <path d="M14 33 V24 H38 L45 33 H72 V42" {...lineProps(p)} />
        <path d="M32 50 H68" {...accentLineProps(p)} />
      </>
    ),
  },
  calendar: {
    title: 'Calendar',
    category: 'workflow',
    render: (p) => (
      <>
        <rect x="18" y="22" width="60" height="58" rx="5" {...lineProps(p)} />
        <path d="M18 38 H78 M32 16 V28 M64 16 V28" {...lineProps(p)} />
        {[33, 48, 63].map((x) => [51, 66].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="3" {...solidAccentProps(p)} />))}
      </>
    ),
  },
  bell: {
    title: 'Bell',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M26 64 C31 58 31 49 31 40 C31 29 38 22 48 22 C58 22 65 29 65 40 C65 49 65 58 70 64 Z" {...lineProps(p)} />
        <path d="M42 70 C44 75 52 75 54 70" {...lineProps(p)} />
        <path d="M38 22 C39 16 57 16 58 22" {...lineProps(p)} />
        <path d="M20 40 C18 47 18 52 22 58 M76 40 C78 47 78 52 74 58" {...accentLineProps(p)} />
      </>
    ),
  },
  warning: {
    title: 'Warning',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M48 14 L84 78 H12 Z" {...lineProps(p)} />
        <path d="M48 35 V57" {...accentLineProps(p)} />
        <circle cx="48" cy="67" r="3" {...solidAccentProps(p)} />
      </>
    ),
  },
  databaseSync: {
    title: 'Database sync',
    category: 'data',
    render: (p) => (
      <>
        <ellipse cx="33" cy="24" rx="18" ry="8" {...lineProps(p)} />
        <path d="M15 24 V59 C15 64 23 69 33 69 C43 69 51 64 51 59 V24" {...lineProps(p)} />
        <path d="M68 29 C77 37 78 53 69 62 M73 63 H63 V53" {...accentLineProps(p)} />
        <path d="M28 75 C19 67 18 51 27 42 M23 41 H33 V51" {...accentLineProps(p)} />
      </>
    ),
  },
  databaseFlow: {
    title: 'Database flow',
    category: 'data',
    render: (p) => (
      <>
        <ellipse cx="27" cy="30" rx="16" ry="8" {...lineProps(p)} />
        <path d="M11 30 V62 C11 67 18 71 27 71 C36 71 43 67 43 62 V30" {...lineProps(p)} />
        <ellipse cx="69" cy="30" rx="16" ry="8" {...lineProps(p)} />
        <path d="M53 30 V62 C53 67 60 71 69 71 C78 71 85 67 85 62 V30" {...lineProps(p)} />
        <path d="M46 50 H58 M58 50 L52 44 M58 50 L52 56" {...accentLineProps(p)} />
      </>
    ),
  },
  cloudUpload: {
    title: 'Cloud upload',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M26 68 H70 C80 68 86 62 86 53 C86 44 80 38 71 38 C68 27 59 20 48 20 C35 20 25 30 24 43 C15 44 10 50 10 58 C10 64 16 68 26 68 Z" {...lineProps(p)} />
        <path d="M48 66 V40 M48 40 L38 50 M48 40 L58 50" {...accentLineProps(p)} />
      </>
    ),
  },
  downloadTray: {
    title: 'Download tray',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M48 13 V56 M48 56 L35 43 M48 56 L61 43" {...accentLineProps(p)} />
        <path d="M20 62 V76 H76 V62" {...lineProps(p)} />
      </>
    ),
  },
  storage: {
    title: 'Storage',
    category: 'data',
    render: (p) => (
      <>
        <path d="M24 22 H64 L74 76 H14 Z" {...lineProps(p)} />
        <path d="M28 40 H70" {...lineProps(p)} />
        <circle cx="62" cy="62" r="4" {...accentLineProps(p)} />
      </>
    ),
  },
  firewall: {
    title: 'Firewall',
    category: 'security',
    render: (p) => (
      <>
        <path d="M15 26 H81 V70 H15 Z M15 41 H81 M15 56 H81 M32 26 V41 M52 26 V41 M42 41 V56 M66 41 V56 M30 56 V70 M55 56 V70" {...lineProps(p)} />
        <path d="M64 73 C55 64 62 55 69 48 C68 57 80 59 76 73 C74 80 66 84 58 79" {...accentLineProps(p)} />
      </>
    ),
  },
  key: {
    title: 'Key',
    category: 'security',
    render: (p) => (
      <>
        <circle cx="32" cy="36" r="16" {...lineProps(p)} />
        <circle cx="35" cy="32" r="3" {...solidAccentProps(p)} />
        <path d="M43 47 L76 80 M60 64 L68 56 M67 71 L75 63" {...lineProps(p)} />
      </>
    ),
  },
  lock: {
    title: 'Lock',
    category: 'security',
    render: (p) => (
      <>
        <rect x="24" y="42" width="48" height="36" rx="5" {...lineProps(p)} />
        <path d="M34 42 V31 C34 22 40 16 48 16 C56 16 62 22 62 31 V42" {...lineProps(p)} />
        <path d="M48 57 V67" {...accentLineProps(p)} />
        <circle cx="48" cy="55" r="3" {...solidAccentProps(p)} />
      </>
    ),
  },
  flowSteps: {
    title: 'Flow steps',
    category: 'workflow',
    render: (p) => (
      <>
        <rect x="14" y="16" width="20" height="16" rx="2" {...lineProps(p)} />
        <circle cx="24" cy="70" r="10" {...lineProps(p)} />
        <rect x="63" y="16" width="20" height="16" rx="2" {...lineProps(p)} />
        <polygon points="73,60 84,70 73,80 62,70" {...lineProps(p)} />
        <path d="M24 32 V54 M73 32 V54 M34 70 H52 M52 70 L45 63 M52 70 L45 77" {...accentLineProps(p)} />
      </>
    ),
  },
  queue: {
    title: 'Queue',
    category: 'workflow',
    render: (p) => (
      <>
        {[22, 39, 56].map((x) => <rect key={x} x={x} y="35" width="14" height="22" rx="2" {...lineProps(p)} />)}
        <path d="M10 46 H20 M37 46 H38 M54 46 H55 M72 46 H86" {...accentLineProps(p)} />
        <path d="M82 46 L76 40 M82 46 L76 52" {...accentLineProps(p)} />
      </>
    ),
  },
  gitBranch: {
    title: 'Git branch',
    category: 'workflow',
    render: (p) => (
      <>
        <circle cx="29" cy="19" r="7" {...accentLineProps(p)} />
        <circle cx="29" cy="77" r="7" {...lineProps(p)} />
        <circle cx="67" cy="39" r="7" {...accentLineProps(p)} />
        <path d="M29 26 V70 M29 51 C43 51 48 39 60 39" {...lineProps(p)} />
      </>
    ),
  },
  codeLoop: {
    title: 'Code loop',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M68 29 C77 38 78 54 69 64 C58 77 36 75 26 62 M28 67 L25 57 L36 58" {...lineProps(p)} />
        <path d="M28 67 L25 57 L36 58" {...lineProps(p)} />
        <path d="M28 67 C19 58 18 42 27 32 C38 19 60 21 70 34 M68 29 L72 39 L61 38" {...lineProps(p)} />
        <path d="M42 40 L34 48 L42 56 M54 40 L62 48 L54 56" {...accentLineProps(p)} />
      </>
    ),
  },
  infinityLoop: {
    title: 'Infinity loop',
    category: 'workflow',
    render: (p) => (
      <>
        <path d="M15 48 C25 28 40 28 48 48 C56 68 71 68 81 48 C71 28 56 28 48 48 C40 68 25 68 15 48 Z" {...lineProps(p)} />
        <path d="M48 48 C55 39 62 35 70 38" {...accentLineProps(p)} />
      </>
    ),
  },
  cube: {
    title: 'Cube',
    category: 'system',
    render: (p) => (
      <>
        <path d="M48 14 L76 30 V64 L48 82 L20 64 V30 Z" {...lineProps(p)} />
        <path d="M20 30 L48 47 L76 30 M48 47 V82" {...lineProps(p)} />
        <path d="M35 54 L42 59 L55 45" {...accentLineProps(p)} />
      </>
    ),
  },
  rocket: {
    title: 'Rocket',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M39 65 C28 65 22 73 18 82 C27 78 35 73 39 65 Z" {...accentLineProps(p)} />
        <path d="M50 58 L38 70 L26 58 L38 46 C43 29 57 17 78 13 C74 34 67 49 50 58 Z" {...lineProps(p)} />
        <circle cx="60" cy="31" r="6" {...lineProps(p)} />
        <path d="M28 67 L20 75 M42 78 L33 86" {...accentLineProps(p)} />
      </>
    ),
  },
  target: {
    title: 'Target',
    category: 'workflow',
    render: (p) => (
      <>
        <circle cx="48" cy="48" r="33" {...lineProps(p)} />
        <circle cx="48" cy="48" r="21" {...lineProps(p)} />
        <circle cx="48" cy="48" r="8" {...accentLineProps(p)} />
        <path d="M55 41 L78 18 M78 18 L78 32 M78 18 L64 18" {...accentLineProps(p)} />
      </>
    ),
  },
  sortArrows: {
    title: 'Sort arrows',
    category: 'workflow',
    render: (p) => (
      <>
        <path d="M28 78 V18 M28 18 L16 30 M28 18 L40 30" {...accentLineProps(p)} />
        <path d="M68 18 V78 M68 78 L56 66 M68 78 L80 66" {...lineProps(p)} />
      </>
    ),
  },
  gauge: {
    title: 'Gauge',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M16 66 A34 34 0 0 1 80 66" {...lineProps(p)} />
        <path d="M48 66 L65 43" {...accentLineProps(p)} />
        <circle cx="48" cy="66" r="5" {...accentLineProps(p)} />
        <path d="M24 66 H18 M30 43 L25 38 M48 31 V24 M66 43 L71 38 M78 66 H72" {...lineProps(p)} />
      </>
    ),
  },
  scales: {
    title: 'Scales',
    category: 'workflow',
    render: (p) => (
      <>
        <path d="M48 16 V78 M28 78 H68 M20 31 H76 M48 31 L31 61 M48 31 L65 61" {...lineProps(p)} />
        <path d="M18 61 C21 72 41 72 44 61 Z M52 61 C55 72 75 72 78 61 Z" {...accentLineProps(p)} />
        <circle cx="48" cy="31" r="4" {...solidAccentProps(p)} />
      </>
    ),
  },
  eye: {
    title: 'Eye',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M12 48 C24 29 36 22 48 22 C60 22 72 29 84 48 C72 67 60 74 48 74 C36 74 24 67 12 48 Z" {...lineProps(p)} />
        <circle cx="48" cy="48" r="12" {...lineProps(p)} />
        <circle cx="48" cy="48" r="4" {...solidAccentProps(p)} />
      </>
    ),
  },
  bug: {
    title: 'Bug',
    category: 'observability',
    render: (p) => (
      <>
        <ellipse cx="48" cy="52" rx="15" ry="24" {...lineProps(p)} />
        <path d="M37 30 C40 21 56 21 59 30 M48 28 V76 M30 43 H18 M30 60 H18 M66 43 H78 M66 60 H78 M35 36 L24 25 M61 36 L72 25 M35 70 L24 81 M61 70 L72 81" {...lineProps(p)} />
        <path d="M48 38 V66" {...accentLineProps(p)} />
      </>
    ),
  },
  wrench: {
    title: 'Wrench',
    category: 'workflow',
    render: (p) => (
      <>
        <path d="M72 18 C62 14 50 20 48 31 L65 48 L48 65 L31 48 C20 50 14 62 18 72 C27 77 39 74 44 64 L64 44 C74 39 77 27 72 18 Z" {...lineProps(p)} />
      </>
    ),
  },
  screwdriver: {
    title: 'Screwdriver',
    category: 'workflow',
    render: (p) => (
      <>
        <path d="M65 14 L78 27 L40 65 L27 52 Z" {...lineProps(p)} />
        <path d="M24 55 L41 72 L32 81 L15 64 Z" {...accentLineProps(p)} />
        <path d="M57 22 L70 35" {...lineProps(p)} />
      </>
    ),
  },
  codeBubble: {
    title: 'Code bubble',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M18 21 H78 V62 H55 L48 75 L41 62 H18 Z" {...lineProps(p)} />
        <path d="M42 34 L33 43 L42 52 M55 34 L64 43 L55 52" {...accentLineProps(p)} />
      </>
    ),
  },
  terminal: {
    title: 'Terminal',
    category: 'delivery',
    render: (p) => (
      <>
        <rect x="16" y="22" width="64" height="52" rx="5" {...lineProps(p)} />
        <path d="M28 39 L40 48 L28 57 M47 58 H66" {...accentLineProps(p)} />
      </>
    ),
  },
  heartbeat: {
    title: 'Heartbeat',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M10 53 H27 L35 33 L47 68 L56 47 H70" {...lineProps(p)} />
        <circle cx="78" cy="47" r="6" {...accentLineProps(p)} />
      </>
    ),
  },
  monitorMetrics: {
    title: 'Monitor metrics',
    category: 'observability',
    render: (p) => (
      <>
        <rect x="22" y="14" width="52" height="68" rx="5" {...lineProps(p)} />
        <path d="M34 41 H62 M34 61 H62" {...lineProps(p)} />
        <path d="M34 51 L42 43 L50 56 L60 44" {...accentLineProps(p)} />
        <circle cx="62" cy="72" r="3" {...lineProps(p)} />
      </>
    ),
  },
  alertGauge: {
    title: 'Alert gauge',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M16 65 A32 32 0 0 1 75 47" {...lineProps(p)} />
        <path d="M48 65 L62 43" {...accentLineProps(p)} />
        <path d="M72 57 L86 82 H58 Z" {...accentLineProps(p)} />
        <path d="M72 66 V74" {...accentLineProps(p)} />
        <circle cx="72" cy="78" r="2" {...solidAccentProps(p)} />
      </>
    ),
  },
  cloudWarning: {
    title: 'Cloud warning',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M25 62 H58 C68 62 74 56 74 48 C74 39 68 34 60 34 C56 24 48 19 38 20 C28 21 20 30 20 41 C12 42 8 48 8 55 C8 60 14 62 25 62 Z" {...lineProps(p)} />
        <path d="M65 48 L83 82 H47 Z" {...accentLineProps(p)} />
        <path d="M65 59 V70" {...accentLineProps(p)} />
        <circle cx="65" cy="75" r="2.5" {...solidAccentProps(p)} />
      </>
    ),
  },
  serverFire: {
    title: 'Server fire',
    category: 'observability',
    render: (p) => (
      <>
        <rect x="25" y="42" width="40" height="32" rx="4" {...lineProps(p)} />
        <path d="M35 53 H55 M35 64 H55" {...lineProps(p)} />
        <path d="M63 44 C55 36 62 25 70 16 C69 28 84 30 78 46 C75 55 65 59 58 53" {...accentLineProps(p)} />
      </>
    ),
  },
  power: {
    title: 'Power',
    category: 'system',
    render: (p) => (
      <>
        <path d="M48 14 V48" {...accentLineProps(p)} />
        <path d="M32 25 C22 32 17 43 20 56 C24 72 39 82 55 78 C70 74 80 60 77 44 C75 35 70 28 63 24" {...lineProps(p)} />
      </>
    ),
  },
  plug: {
    title: 'Plug',
    category: 'system',
    render: (p) => (
      <>
        <path d="M27 69 L69 27 M58 18 L78 38 M18 58 L38 78" {...lineProps(p)} />
        <path d="M49 36 L60 47 C66 53 66 62 60 68 C54 74 45 74 39 68 L28 57" {...lineProps(p)} />
        <path d="M70 14 V28 M82 26 H68" {...accentLineProps(p)} />
      </>
    ),
  },
  brokenLink: {
    title: 'Broken link',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M38 37 L33 32 C26 25 16 26 11 32 C5 39 6 48 13 55 L21 63 C28 70 38 69 43 63" {...lineProps(p)} />
        <path d="M58 59 L63 64 C70 71 80 70 85 64 C91 57 90 48 83 41 L75 33 C68 26 58 27 53 33" {...lineProps(p)} />
        <path d="M38 59 L58 39" {...accentLineProps(p)} />
        <path d="M31 15 L34 28 M65 68 L69 81" {...accentLineProps(p)} />
      </>
    ),
  },
  umbrella: {
    title: 'Umbrella',
    category: 'security',
    render: (p) => (
      <>
        <path d="M15 48 C22 28 36 18 48 18 C60 18 74 28 81 48 C68 43 58 43 48 48 C38 43 28 43 15 48 Z" {...lineProps(p)} />
        <path d="M48 48 V73 C48 81 60 82 60 72" {...accentLineProps(p)} />
      </>
    ),
  },
  teamOps: {
    title: 'Team ops',
    category: 'people',
    render: (p) => (
      <>
        <circle cx="48" cy="38" r="10" {...lineProps(p)} />
        <path d="M29 76 C31 59 38 52 48 52 C58 52 65 59 67 76" {...lineProps(p)} />
        <circle cx="24" cy="47" r="7" {...lineProps(p)} />
        <circle cx="72" cy="47" r="7" {...lineProps(p)} />
        <path d="M11 76 C13 63 18 58 25 58 M85 76 C83 63 78 58 71 58" {...lineProps(p)} />
        <path d="M61 20 L68 21 L70 27 L76 26 L79 32 L75 37 L79 42 L76 48 L70 47 L68 53 L61 54 L58 47 L52 48 L49 42 L53 37 L49 32 L52 26 L58 27 Z" {...accentLineProps(p)} />
      </>
    ),
  },
  handshake: {
    title: 'Handshake',
    category: 'people',
    render: (p) => (
      <>
        <path d="M17 48 L34 32 L48 42 L58 34 L79 52" {...lineProps(p)} />
        <path d="M31 55 L44 67 C49 72 55 72 59 68 L72 55" {...lineProps(p)} />
        <path d="M48 42 L37 53 C42 58 50 58 56 51" {...accentLineProps(p)} />
      </>
    ),
  },
  brain: {
    title: 'Brain',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M47 22 C39 14 25 19 25 31 C16 33 14 47 23 52 C18 62 27 75 39 70 C43 78 53 78 57 70 C69 75 78 62 73 52 C82 47 80 33 71 31 C71 19 57 14 49 22 Z" {...lineProps(p)} />
        <path d="M48 22 V72 M34 32 C40 35 42 41 39 48 M60 32 C54 36 52 41 56 48 M32 58 C39 55 44 58 47 64 M64 58 C57 55 52 58 49 64" {...accentLineProps(p)} />
      </>
    ),
  },
  lightbulb: {
    title: 'Lightbulb',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M34 43 C34 32 40 24 48 24 C56 24 62 32 62 43 C62 51 56 55 54 62 H42 C40 55 34 51 34 43 Z" {...lineProps(p)} />
        <path d="M41 69 H55 M43 78 H53" {...lineProps(p)} />
        <circle cx="48" cy="43" r="9" {...accentLineProps(p)} />
        <path d="M48 10 V17 M23 24 L28 29 M73 24 L68 29" {...accentLineProps(p)} />
      </>
    ),
  },
  graduationCap: {
    title: 'Graduation cap',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M12 38 L48 20 L84 38 L48 56 Z" {...lineProps(p)} />
        <path d="M28 48 V64 C38 74 58 74 68 64 V48" {...lineProps(p)} />
        <path d="M78 41 V64 L84 72" {...accentLineProps(p)} />
      </>
    ),
  },
  book: {
    title: 'Book',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M17 24 C29 18 39 18 48 25 V78 C39 71 29 70 17 76 Z" {...lineProps(p)} />
        <path d="M79 24 C67 18 57 18 48 25 V78 C57 71 67 70 79 76 Z" {...lineProps(p)} />
        <path d="M28 37 H39 M28 49 H39 M57 37 H68 M57 49 H68" {...accentLineProps(p)} />
      </>
    ),
  },
  chartWindow: {
    title: 'Chart window',
    category: 'observability',
    render: (p) => (
      <>
        <rect x="15" y="20" width="66" height="56" rx="5" {...lineProps(p)} />
        <path d="M15 34 H81" {...lineProps(p)} />
        <path d="M27 61 L40 49 L52 57 L69 40" {...accentLineProps(p)} />
        <circle cx="25" cy="27" r="2" {...lineProps(p)} />
        <circle cx="34" cy="27" r="2" {...lineProps(p)} />
      </>
    ),
  },
  trophy: {
    title: 'Trophy',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M32 18 H64 V36 C64 50 57 59 48 59 C39 59 32 50 32 36 Z" {...lineProps(p)} />
        <path d="M32 28 H18 C18 43 26 51 36 51 M64 28 H78 C78 43 70 51 60 51 M48 59 V73 M34 78 H62" {...lineProps(p)} />
        <path d="M48 28 L52 36 L61 37 L55 43 L56 52 L48 48 L40 52 L41 43 L35 37 L44 36 Z" {...accentLineProps(p)} />
      </>
    ),
  },
  mountainFlag: {
    title: 'Mountain flag',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M16 78 L41 36 L55 58 L64 44 L82 78 Z" {...lineProps(p)} />
        <path d="M52 20 V60 M52 20 H78 L72 31 H52" {...accentLineProps(p)} />
      </>
    ),
  },
  paperPlane: {
    title: 'Paper plane',
    category: 'delivery',
    render: (p) => (
      <>
        <path d="M13 46 L82 16 L59 82 L45 57 Z" {...lineProps(p)} />
        <path d="M45 57 L82 16 M30 64 L18 73" {...lineProps(p)} />
        <path d="M20 72 L10 79 M27 76 L22 84" {...accentLineProps(p)} />
      </>
    ),
  },
  compass: {
    title: 'Compass',
    category: 'meta',
    render: (p) => (
      <>
        <circle cx="48" cy="48" r="34" {...lineProps(p)} />
        <path d="M61 35 L53 57 L35 65 L43 43 Z" {...lineProps(p)} />
        <path d="M54 42 L43 55" {...accentLineProps(p)} />
      </>
    ),
  },
  signpost: {
    title: 'Signpost',
    category: 'workflow',
    render: (p) => (
      <>
        <path d="M48 20 V82" {...lineProps(p)} />
        <path d="M22 20 H70 L80 30 L70 40 H22 Z" {...lineProps(p)} />
        <path d="M74 50 H26 L16 60 L26 70 H74 Z" {...lineProps(p)} />
        <path d="M59 25 L68 34 M35 55 L26 64" {...accentLineProps(p)} />
      </>
    ),
  },
  mapPin: {
    title: 'Map pin',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M48 84 C62 65 73 51 73 36 C73 22 62 12 48 12 C34 12 23 22 23 36 C23 51 34 65 48 84 Z" {...lineProps(p)} />
        <circle cx="48" cy="36" r="9" {...accentLineProps(p)} />
      </>
    ),
  },
  binoculars: {
    title: 'Binoculars',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M25 35 L36 48 V70 H15 V50 C15 41 18 35 25 35 Z M71 35 L60 48 V70 H81 V50 C81 41 78 35 71 35 Z" {...lineProps(p)} />
        <path d="M36 48 C40 42 56 42 60 48 M35 34 V25 H45 V39 M61 34 V25 H51 V39" {...lineProps(p)} />
        <circle cx="25" cy="60" r="5" {...accentLineProps(p)} />
      </>
    ),
  },
  telescope: {
    title: 'Telescope',
    category: 'observability',
    render: (p) => (
      <>
        <path d="M22 49 L70 31 L76 47 L28 65 Z" {...lineProps(p)} />
        <path d="M67 33 L78 29 L84 45 L73 49" {...accentLineProps(p)} />
        <path d="M46 58 L38 82 M46 58 L58 82 M46 58 V82" {...lineProps(p)} />
      </>
    ),
  },
  puzzleFit: {
    title: 'Puzzle fit',
    category: 'system',
    render: (p) => (
      <>
        <path d="M18 23 H42 V37 C50 35 56 40 56 48 C56 56 50 61 42 59 V74 H18 Z" {...lineProps(p)} />
        <path d="M54 23 H78 V74 H54 V60 C62 62 68 56 68 48 C68 40 62 34 54 36 Z" {...accentLineProps(p)} />
      </>
    ),
  },
  crown: {
    title: 'Crown',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M16 34 L34 51 L48 22 L62 51 L80 34 L72 74 H24 Z" {...lineProps(p)} />
        <circle cx="48" cy="53" r="4" {...solidAccentProps(p)} />
        <path d="M27 66 H69" {...accentLineProps(p)} />
      </>
    ),
  },
  star: {
    title: 'Star',
    category: 'meta',
    render: (p) => (
      <>
        <path d="M48 15 L58 36 L81 38 L64 54 L69 78 L48 66 L27 78 L32 54 L15 38 L38 36 Z" {...lineProps(p)} />
        <path d="M48 26 L55 41 L70 43" {...accentLineProps(p)} />
      </>
    ),
  },
} satisfies Record<string, IconDefinition>;

export type ArchitectureIconName = keyof typeof architectureIconDefinitions;

export const architectureIconNames = Object.keys(architectureIconDefinitions) as ArchitectureIconName[];

export type ArchitectureIconProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
  name: ArchitectureIconName;
  size?: number | string;
  stroke?: string;
  accent?: string;
  muted?: string;
  strokeWidth?: number;
  background?: string;
  showBackground?: boolean;
  glow?: boolean;
  title?: string;
};

export const ArchitectureIcon: React.FC<ArchitectureIconProps> = ({
  name,
  size = 96,
  stroke = architectureDiagramTheme.stroke,
  accent = architectureDiagramTheme.accent,
  muted = architectureDiagramTheme.muted,
  strokeWidth = 3.4,
  background = architectureDiagramTheme.background,
  showBackground = false,
  glow = false,
  title,
  style,
  ...svgProps
}) => {
  const filterId = React.useId().replaceAll(':', '');
  const definition = architectureIconDefinitions[name];
  const accessibleTitle = title ?? svgProps['aria-label'];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 96 96"
      role={accessibleTitle ? 'img' : undefined}
      aria-hidden={accessibleTitle ? undefined : true}
      style={{display: 'block', overflow: 'visible', ...style}}
      {...svgProps}
    >
      {accessibleTitle ? <title>{accessibleTitle}</title> : null}
      {glow ? (
        <defs>
          <filter id={filterId}>
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      ) : null}
      {showBackground ? <rect x="0" y="0" width="96" height="96" rx="10" fill={background} /> : null}
      <g filter={glow ? `url(#${filterId})` : undefined}>{definition.render({stroke, accent, muted, strokeWidth})}</g>
    </svg>
  );
};

export type ArchitectureIconGlyphProps = {
  name: ArchitectureIconName;
  x: number;
  y: number;
  size?: number;
  anchor?: 'top-left' | 'center';
  stroke?: string;
  accent?: string;
  muted?: string;
  strokeWidth?: number;
  opacity?: number;
};

export const ArchitectureIconGlyph: React.FC<ArchitectureIconGlyphProps> = ({
  name,
  x,
  y,
  size = 72,
  anchor = 'center',
  stroke = architectureDiagramTheme.stroke,
  accent = architectureDiagramTheme.accent,
  muted = architectureDiagramTheme.muted,
  strokeWidth = 3.4,
  opacity = 1,
}) => {
  const definition = architectureIconDefinitions[name];
  const scale = size / 96;
  const tx = anchor === 'center' ? x - size / 2 : x;
  const ty = anchor === 'center' ? y - size / 2 : y;

  return (
    <g transform={`translate(${tx} ${ty}) scale(${scale})`} opacity={opacity}>
      {definition.render({stroke, accent, muted, strokeWidth})}
    </g>
  );
};

export type ArchitectureIconGalleryProps = {
  icons?: ArchitectureIconName[];
  columns?: number;
  iconSize?: number;
  showLabels?: boolean;
  stroke?: string;
  accent?: string;
  background?: string;
};

export const ArchitectureIconGallery: React.FC<ArchitectureIconGalleryProps> = ({
  icons = architectureIconNames,
  columns = 11,
  iconSize = 76,
  showLabels = false,
  stroke = architectureDiagramTheme.stroke,
  accent = architectureDiagramTheme.accent,
  background = architectureDiagramTheme.background,
}) => {
  const cellWidth = showLabels ? 124 : 104;
  const cellHeight = showLabels ? 116 : 94;
  const rows = Math.ceil(icons.length / columns);
  const width = columns * cellWidth;
  const height = rows * cellHeight;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} role="img" aria-label="Architecture diagram icon gallery">
      <rect x="0" y="0" width={width} height={height} fill={background} />
      {icons.map((icon, index) => {
        const column = index % columns;
        const row = Math.floor(index / columns);
        const x = column * cellWidth + cellWidth / 2;
        const y = row * cellHeight + (showLabels ? 42 : cellHeight / 2);
        const label = architectureIconDefinitions[icon].title;

        return (
          <g key={icon}>
            <ArchitectureIconGlyph name={icon} x={x} y={y} size={iconSize} stroke={stroke} accent={accent} />
            {showLabels ? (
              <text x={x} y={cellHeight * row + 98} fill={stroke} fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" textAnchor="middle">
                {label}
              </text>
            ) : null}
          </g>
        );
      })}
    </svg>
  );
};
