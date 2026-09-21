export type ProjectVisual = 'light' | 'brief' | 'signal' | 'brand'

export interface PortfolioProject {
  slug: string
  title: string
  kind: string
  discipline: string
  summary: string
  intro: string
  stack: string
  visual: ProjectVisual
  sections: { title: string; text: string }[]
  takeaway: string
  links: { label: string; href: string }[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'lumen-sonic',
    title: 'Lumen-Sonic',
    kind: 'Hackathon project',
    discipline: 'Audio + AI',
    summary: 'Point a camera at light. Hear what it looks like.',
    intro: 'A candle, a window, a neon sign. Lumen-Sonic turns a short video of light into thirty seconds of music.',
    stack: 'Flask · Gemini Vision · Lyria · HTML / CSS',
    visual: 'light',
    sections: [
      { title: 'The question', text: 'What if light could be a musical brief? Warmth, flicker, brightness. A narrow input gives the model something specific to interpret.' },
      { title: 'The decision', text: 'Music takes time to generate. The interface shows the model’s reading of the light first. The recorded clip stays visible. You can see what the system understood while you wait to hear it.' },
      { title: 'The build', text: 'Built at the Gemini 3 Paris Hackathon. Two steps: analyse the clip, then generate the track. Camera capture, playback, and a WAV download, all in the browser.' },
    ],
    takeaway: 'The waiting time is part of the interface.',
    links: [
      { label: 'Source', href: 'https://github.com/VassoD/gemini3-hackathon' },
    ],
  },
  {
    slug: 'codex-team-brief',
    title: 'Codex Team Brief',
    kind: 'Team hackathon project',
    discipline: 'Developer experience',
    summary: 'A room full of requirements. One brief an agent can use.',
    intro: 'Teams contradict themselves. Coding agents inherit the contradiction. This shared room makes the disagreement visible before it becomes code.',
    stack: 'Next.js · TypeScript · OpenAI · Zod · Netlify Blobs',
    visual: 'brief',
    sections: [
      { title: 'The question', text: 'How does a team give a coding agent one reliable set of instructions? A chat history contains decisions, duplicates, and things nobody agreed to.' },
      { title: 'The decision', text: 'Make “blocked” a real product state. Conflicting requirements become questions for the team. Approval and agreement determine whether the brief is ready.' },
      { title: 'The build', text: 'A team project for the Codex hackathon. A shared room, a compilation endpoint, schema-validated output, and persistent session activity. The interface and the API speak the same language: draft, blocked, ready.' },
    ],
    takeaway: 'A clear question is more useful than a confident guess.',
    links: [
      { label: 'Source', href: 'https://github.com/VassoD/codex-hackathon' },
    ],
  },
  {
    slug: 'signal',
    title: 'Signal',
    kind: 'Self-initiated concept',
    discipline: 'Speech + interaction',
    summary: 'A transcript that knows which words are still changing.',
    intro: 'Speech arrives before it is certain. A small interface study about showing that uncertainty without making the conversation harder to read.',
    stack: 'React · TypeScript · CSS · Simulated transcript',
    visual: 'signal',
    sections: [
      { title: 'The question', text: 'Live transcription revises itself. If every word looks final, each correction feels like a mistake.' },
      { title: 'The decision', text: 'Give provisional words their own treatment. Keep the speaker and timestamp steady. When a phrase is confirmed, the emphasis settles with it.' },
      { title: 'The build', text: 'An interactive prototype built for this portfolio. Play, pause, and replay a scripted conversation. The sample makes a correction visible; it uses no microphone or speech recognition service.' },
    ],
    takeaway: 'The interface should be as certain as the system. No more.',
    links: [],
  },
  {
    slug: 'common-form',
    title: 'Common Form',
    kind: 'Self-initiated concept',
    discipline: 'Brand system + creative tooling',
    summary: 'A few words in. A visual language with rules.',
    intro: 'A small brand tool for an imaginary audio product. One set of rules makes a poster, a social tile, and a mark.',
    stack: 'React · TypeScript · SVG · Design tokens',
    visual: 'brand',
    sections: [
      { title: 'The question', text: 'How do you let a team make new assets without asking them to reinvent the identity each time?' },
      { title: 'The decision', text: 'Keep the type, spacing, and palette constrained. Let the brief change the rhythm. A shared generative motif carries the identity across formats.' },
      { title: 'The build', text: 'A working concept built for this portfolio. A short brief maps to a palette and a repeatable pattern. Change the format, vary the composition, export an SVG. Generation is local and rule-based; connecting an AI model is a possible next step.' },
    ],
    takeaway: 'The system makes room for variation. The rules keep it recognisable.',
    links: [],
  },
]
