/**
 * Global site config — edit everything here.
 */

export const person = {
  name: 'KEVIN INFANT',
  initials: 'KI',
  role: 'VIDEO EDITOR',
  positioning: 'I turn raw footage into stories.',
} as const;

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About + Contact', href: '#about' },
] as const;

/** Side scroll indicator sections. */
export const chapters = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'software', label: 'Tools' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About + Contact' },
] as const;

/** Contact — edit freely. */
export const contact = {
  phone: '9384967955',
  phoneHref: 'tel:+919384967955',
  email: 'kevininfant12@gmail.com',
  instagram: 'kevin_infant_12',
  instagramUrl: 'https://instagram.com/kevin_infant_12',
} as const;

/** Photo paths (already optimized in /public/photos). */
export const photos = {
  wide: '/photos/kevin.jpg',
  portrait: '/photos/kevin-portrait.jpg',
} as const;

export const showreelUrl = 'https://youtu.be/ziPVMccjoyw';
