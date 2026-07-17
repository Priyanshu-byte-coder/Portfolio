/**
 * Project links — edit this file to add/update GitHub and docs URLs.
 * Keys match the project `id` in data.ts.
 * Leave a field out or set to '' to hide that button.
 */
export const PROJECT_LINKS: Record<string, { github?: string; docs?: string; video?: string }> = {
  'spectra-scan': {
    github: 'https://github.com/Mitanshp5/MECup',
    video:  'https://youtu.be/Gq1PI3dG4mY',
  },
  'lumin-ai': {
    github: 'https://github.com/Neal006/LuMinAI', // repo renamed from Fantastic4
  },
  'solv-ai': {
    github: 'https://github.com/Neal006/lakshya-ldce', // add link when public
  },
  'sentinel': {
    github: 'https://github.com/Priyanshu-byte-coder/SENTINEL', // add link when public
  },
  'contextrot': {
    github: 'https://github.com/Priyanshu-byte-coder/contextrot',
    docs:   'https://pypi.org/project/contextrot/',
  },
};
