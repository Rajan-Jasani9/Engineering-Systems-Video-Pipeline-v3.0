import React from 'react';
import {interpolate, spring} from 'remotion';

type SystemDiagramProps = {
  activeIndex: number;
  frame: number;
  fps: number;
};

const nodes = ['Client', 'API', 'Inventory', 'Ledger', 'Email'];

export const SystemDiagram: React.FC<SystemDiagramProps> = ({activeIndex, frame, fps}) => {
  const pulse = spring({
    frame: frame % Math.round(fps * 1.4),
    fps,
    from: 0,
    to: 1,
    config: {
      damping: 12,
      stiffness: 90,
    },
  });
  const movingDot = interpolate(frame % Math.round(fps * 2.2), [0, Math.round(fps * 2.2)], [205, 1500]);
  const highlighted = activeIndex % nodes.length;

  return (
    <div className="system-diagram">
      <svg viewBox="0 0 1700 360" className="diagram-svg" aria-label="distributed system consistency sketch">
        <path d="M210 180 H1500" className="diagram-line" />
        <circle cx={movingDot} cy="180" r="10" className="diagram-packet" />
        {nodes.map((node, index) => {
          const x = 210 + index * 322.5;
          const isHighlighted = index === highlighted;
          return (
            <g key={node}>
              <circle
                cx={x}
                cy="180"
                r={isHighlighted ? 54 + pulse * 6 : 48}
                className={isHighlighted ? 'diagram-node active' : 'diagram-node'}
              />
              <text x={x} y="188" textAnchor="middle" className={isHighlighted ? 'diagram-label active' : 'diagram-label'}>
                {node}
              </text>
            </g>
          );
        })}
        <path d="M532 212 C610 315 823 315 855 213" className="diagram-arc" />
        <path d="M1180 146 C1250 62 1425 62 1500 145" className="diagram-arc" />
      </svg>
      <div className="diagram-caption">black-box systems, drawn as moving contracts</div>
    </div>
  );
};
