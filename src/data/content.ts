/** Services, software workflow and about copy. */

export interface Service {
  no: string;
  title: string;
  tags: string[];
  line: string;
}

export const services: Service[] = [
  {
    no: '01',
    title: 'Short Form',
    tags: ['Reels', 'Shorts', 'Social'],
    line: 'Reels, Shorts & social content built to stop the scroll.',
  },
  {
    no: '02',
    title: 'Long Form',
    tags: ['Vlogs', 'Talking Heads', 'Documentaries'],
    line: 'Vlogs, talking heads & documentaries shaped into engaging stories.',
  },
  {
    no: '03',
    title: 'Cinematic Edit',
    tags: ['Montages', 'Cinematic', 'Music-Driven'],
    line: 'Montages, cinematic sequences & music-driven edits with rhythm and impact.',
  },
  {
    no: '04',
    title: 'Motion',
    tags: ['Motion Graphics', 'Animated Text', 'VFX'],
    line: 'Motion graphics, animated text & visual effects that bring ideas to life.',
  },
];

export interface WorkflowStep {
  tool: string;
  abbr: string;
  role: string;
  accent: string;
}

/** The creative pipeline — PREMIERE → CUT → AE → MOTION → PS → VISUALS. */
export const workflow: WorkflowStep[] = [
  { tool: 'Premiere Pro', abbr: 'Pr', role: 'Cut', accent: '#9A8CFF' },
  { tool: 'After Effects', abbr: 'Ae', role: 'Motion', accent: '#C084FC' },
  { tool: 'Photoshop', abbr: 'Ps', role: 'Visuals', accent: '#5AA9FF' },
];

export const aboutAnnotations = ['Cut', 'Pause', 'Repeat', 'Feel'] as const;

export const aboutParagraph =
  "I'm Kevin Infant — a video editor obsessed with rhythm, pacing and the feeling a cut leaves behind. I work with creators and brands to turn raw footage into content people actually finish watching. Every project is about timing: knowing exactly when to hold, when to cut, and when to let a moment breathe.";
