export type ProjectVisual = 'news' | 'pitch' | 'light' | 'brief' | 'map' | 'signal' | 'resonance'

export interface PortfolioProject {
  slug: string
  title: string
  kind: string
  discipline: string
  summary: string
  intro: string
  contribution?: string
  stack: string
  visual: ProjectVisual
  sections: { title: string; text: string }[]
  takeaway: string
  links: { label: string; href: string }[]
}

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: 'inteply',
    title: 'Inteply',
    kind: 'Product · Technical co-founder',
    discipline: 'AI product + developer experience',
    summary: 'Find the sources. Check the facts. Shape the article.',
    intro: 'AI research for newsrooms. Source discovery, fact extraction, and article drafting in one workflow. The journalist stays in charge.',
    contribution: 'Technical co-founder. I work across the product and its engineering.',
    stack: 'Next.js · TypeScript · Plate · LLMs · Express · PostgreSQL',
    visual: 'news',
    sections: [
      { title: 'The question', text: 'An article is only as useful as the sources behind it. How do you make AI-assisted research something a journalist can inspect, question, and edit?' },
      { title: 'The decision', text: 'Keep the research visible. Source selection comes before generation. The draft opens in an editing studio. Each step leaves room for a human decision.' },
      { title: 'The build', text: 'A Next.js interface connects research to a rich-text editor. An API playground puts search filters, request examples, and responses in one place.' },
    ],
    takeaway: 'The draft is a starting point. The judgement stays human.',
    links: [
      { label: 'Explore the API playground', href: 'https://inteply.com/try-headlines-api' },
      { label: 'Open Inteply', href: 'https://inteply.com' },
    ],
  },
  {
    slug: 'resonance',
    title: 'Resonance',
    kind: 'Self-initiated concept',
    discipline: 'Brand + motion + creative tooling',
    summary: 'A voice becomes a visual language.',
    intro: 'A playable identity for an imaginary audio platform. One voice drives the artwork. The same visual rules carry it across a poster, a social tile, and a documentation cover.',
    stack: 'React · TypeScript · HTML Audio · SVG · Design tokens',
    visual: 'resonance',
    sections: [
      { title: 'The question', text: 'An audio platform has little to photograph. How can its identity make the invisible product tangible, and still work when the sound is off?' },
      { title: 'The decision', text: 'Let the voice move the mark. Keep the palette and typography fixed. Freeze any moment and the same shape becomes a brand asset. Sound, words, and data are three views of one sample.' },
      { title: 'The build', text: 'A self-initiated concept, grown from Common Form. The bundled voice is synthetic; its measured amplitude drives the motion. Captions are authored, not live transcription. A short brief changes the geometry, and every format exports as SVG. The visual generator is rule-based.' },
    ],
    takeaway: 'The voice changes. The identity holds.',
    links: [],
  },

  {
    slug: 'pitchmate',
    title: 'PitchMate',
    kind: 'Team hackathon project',
    discipline: 'Voice + interaction',
    summary: 'Thirty seconds to pitch. A voice that answers back.',
    intro: 'A voice-based pitch coach, built with a team at a hackathon. Speak for thirty seconds. Confirm what it heard. Get direct feedback, spoken back.',
    contribution: 'Co-built with the team during the hackathon. We shared the work.',
    stack: 'React · TypeScript · Framer Motion · Speechmatics · OpenAI · Supabase',
    visual: 'pitch',
    sections: [
      { title: 'The question', text: 'A pitch is spoken, but most feedback tools start with a text box. What happens when the whole exchange stays in voice?' },
      { title: 'The decision', text: 'Let the speaker confirm the transcript before the feedback starts. The interface names each state: listening, confirming, thinking, speaking. A moving orb gives the exchange a visual rhythm.' },
      { title: 'The build', text: 'We built the prototype together during a hackathon. Live transcription feeds an AI critique, then speech synthesis reads it back. The transcript stays visible, and the speaker can re-record before sending.' },
    ],
    takeaway: 'Before judging the pitch, make sure you heard it.',
    links: [
      { label: 'Open PitchMate', href: 'https://voice-pitchmate.lovable.app/' },
    ],
  },
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
    contribution: 'I proposed the concept and developed the prototype with the team.',
    stack: 'Next.js · TypeScript · OpenAI · Zod · Netlify Blobs',
    visual: 'brief',
    sections: [
      { title: 'The question', text: 'How does a team give a coding agent one reliable set of instructions? A chat history contains decisions, duplicates, and things nobody agreed to.' },
      { title: 'The decision', text: 'Make “blocked” a real product state. Conflicting requirements become questions for the team. Approval and agreement determine whether the brief is ready.' },
      { title: 'The build', text: 'We built this together at the Codex hackathon. A shared room, a compilation endpoint, schema-validated output, and persistent session activity. The interface and the API speak the same language: draft, blocked, ready.' },
    ],
    takeaway: 'A clear question is more useful than a confident guess.',
    links: [
      { label: 'Source', href: 'https://github.com/VassoD/codex-hackathon' },
    ],
  },
  {
    slug: 'spots',
    title: 'Spots',
    kind: 'Side project',
    discipline: 'Maps + product design',
    summary: 'Scattered saved places. One map.',
    intro: 'Places saved across different accounts, brought together. Drop in Google Takeout exports. Get one searchable map, with the duplicates removed.',
    stack: 'Next.js · TypeScript · Leaflet · Google Places · IndexedDB',
    visual: 'map',
    sections: [
      { title: 'The question', text: 'Saving a place is easy. Finding it again, across several accounts and years of lists, is harder. The collection needed one home.' },
      { title: 'The decision', text: 'Keep the list and the map in agreement. A filter changes both. Selecting a place moves the map to it. Add another export without starting again.' },
      { title: 'The build', text: 'A Next.js app that reads Takeout files, merges saved places, and groups them by city and category. The map uses Leaflet. The collection persists in the browser, so the next visit starts where the last one ended.' },
    ],
    takeaway: 'A saved place should be easy to find again.',
    links: [
      { label: 'Source', href: 'https://github.com/VassoD/spots' },
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
]
