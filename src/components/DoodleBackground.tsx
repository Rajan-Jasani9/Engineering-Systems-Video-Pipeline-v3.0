import React from 'react';
import {Boxes, Cloud, Cpu, Database, GitBranch, Network, RefreshCw, Server, ShieldCheck, Workflow} from 'lucide-react';

type DoodleBackgroundProps = {
  currentTime: number;
};

const doodles = [
  {Icon: Server, x: 210, y: 260, label: 'API'},
  {Icon: Database, x: 360, y: 210, label: 'DB'},
  {Icon: Cloud, x: 1540, y: 170, label: 'REGION'},
  {Icon: GitBranch, x: 1280, y: 740, label: 'SAGA'},
  {Icon: Boxes, x: 190, y: 760, label: 'CACHE'},
  {Icon: Workflow, x: 1510, y: 820, label: 'QUEUE'},
  {Icon: Network, x: 1010, y: 175, label: 'FANOUT'},
  {Icon: Cpu, x: 790, y: 820, label: 'WORKER'},
  {Icon: ShieldCheck, x: 1690, y: 525, label: 'IDEMPOTENT'},
  {Icon: RefreshCw, x: 490, y: 875, label: 'RETRY'},
];

export const DoodleBackground: React.FC<DoodleBackgroundProps> = ({currentTime}) => {
  const dashOffset = -(currentTime * 28);

  return (
    <div className="doodle-background">
      <svg className="grid-lines" viewBox="0 0 1920 1080" role="img" aria-label="system design doodle grid">
        <defs>
          <pattern id="small-grid" width="48" height="48" patternUnits="userSpaceOnUse">
            <path d="M 48 0 L 0 0 0 48" fill="none" stroke="rgba(255,255,255,0.055)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#small-grid)" />
        <path
          d="M210 300 C420 180 600 380 770 260 S1160 190 1340 330 S1580 520 1760 380"
          className="doodle-path"
          style={{strokeDashoffset: dashOffset}}
        />
        <path
          d="M250 705 C470 565 690 760 900 630 S1280 515 1550 660"
          className="doodle-path secondary"
          style={{strokeDashoffset: dashOffset * 0.7}}
        />
        <path d="M128 538 h230 v98 h-230 z" className="doodle-box" />
        <path d="M1468 312 h270 v116 h-270 z" className="doodle-box" />
        <path d="M812 404 h430 v126 h-430 z" className="doodle-box faint" />
      </svg>

      {doodles.map(({Icon, x, y, label}, index) => (
        <div
          key={label}
          className="doodle-icon"
          style={{
            left: x,
            top: y,
            transform: `rotate(${index % 2 === 0 ? -4 : 4}deg)`,
          }}
        >
          <Icon size={42} strokeWidth={1.8} />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};
