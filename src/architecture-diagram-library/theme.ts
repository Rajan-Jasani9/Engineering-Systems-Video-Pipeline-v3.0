export const architectureDiagramTheme = {
  background: '#050505',
  panel: '#0D0D0D',
  panelMuted: '#171717',
  stroke: '#F4F4EF',
  muted: '#9EA1A6',
  accent: '#FFD400',
  success: '#50E38A',
  warning: '#FFD400',
  danger: '#FF5959',
  info: '#60D8FF',
} as const;

export const architectureDiagramStyleGuide = {
  canvas: {
    defaultWidth: 1380,
    defaultHeight: 548,
    cornerRadius: 8,
  },
  connector: {
    strokeWidth: 3.2,
    arrowMarkerWidth: 16,
    arrowMarkerHeight: 16,
    arrowRefX: 14,
    arrowRefY: 8,
    arrowPath: 'M 2 2 L 14 8 L 2 14 Z',
    dashArray: '14 12',
    labelWidth: 112,
    labelHeight: 30,
    labelRadius: 15,
  },
  node: {
    width: 168,
    height: 140,
    iconSize: 58,
    cornerRadius: 9,
    strokeWidth: 3.2,
  },
  badge: {
    height: 34,
    radius: 17,
    strokeWidth: 2.4,
  },
  typography: {
    family: 'Arial, sans-serif',
    monoFamily: 'Courier New, monospace',
    nodeLabelSize: 18,
    nodeSubLabelSize: 13,
    connectorLabelSize: 14,
    badgeLabelSize: 15,
  },
} as const;

export type ArchitectureDiagramTone = 'default' | 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'info';

export const toneToColor = (tone: ArchitectureDiagramTone, fallback: string = architectureDiagramTheme.stroke): string => {
  if (tone === 'default') {
    return fallback;
  }

  if (tone === 'accent' || tone === 'warning') {
    return architectureDiagramTheme.accent;
  }

  return architectureDiagramTheme[tone];
};
