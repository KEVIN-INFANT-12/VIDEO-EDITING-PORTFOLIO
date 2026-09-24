import { Scissors, Zap, Clapperboard, Megaphone, type LucideIcon } from 'lucide-react';

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    number: '01',
    title: 'Video Editing',
    description:
      'Cutting, sequencing, transitions, effects, pacing and storytelling — the craft that turns raw footage into a finished piece.',
    icon: Scissors,
  },
  {
    number: '02',
    title: 'Short Form Content',
    description:
      'Reels, Shorts, TikToks and fast-paced social edits with captions and trend-based editing built to stop the scroll.',
    icon: Zap,
  },
  {
    number: '03',
    title: 'Long Form Content',
    description:
      'YouTube videos, documentaries, podcasts, interviews and story-driven content that holds attention from start to finish.',
    icon: Clapperboard,
  },
  {
    number: '04',
    title: 'Commercial / Brand',
    description:
      'Promotional videos, product films, advertisements, social campaigns and brand storytelling that sells the idea.',
    icon: Megaphone,
  },
];

export interface Software {
  abbr: string;
  name: string;
  full: string;
  accent: string;
}

export const software: Software[] = [
  {
    abbr: 'Pr',
    name: 'Premiere Pro',
    full: 'Adobe Premiere Pro',
    accent: '#9999FF',
  },
  {
    abbr: 'Ae',
    name: 'After Effects',
    full: 'Adobe After Effects',
    accent: '#C084FC',
  },
  {
    abbr: 'Ps',
    name: 'Photoshop',
    full: 'Adobe Photoshop',
    accent: '#4AA5FF',
  },
];

export const aboutQualities = [
  'Detail Oriented',
  'Creative Thinking',
  'On-Time Delivery',
  'Client Focused',
] as const;
