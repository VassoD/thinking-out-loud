export type ProjectVisual = 'news' | 'pitch' | 'light' | 'brief' | 'signal' | 'brand'

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
    slug: 'inteply',
    title: 'Inteply',
    kind: 'Product · Technical co-founder',
    discipline: 'AI product + developer experience',
    summary: 'Find the sources. Check the facts. Shape the article.',
    intro: 'AI research for newsrooms. Source discovery, fact extraction, and article drafting in one workflow. The journalist stays in charge.',
    stack: 'Next.js · TypeScript · Plate · LLMs · Express · PostgreSQL',
    visual: 'news',
    sections: [
      { title: 'The question', text: 'An article is only as useful as the sources behind it. How do you make AI-assisted research something a journalist can inspect, question, and edit?' },
      { title: 'The decision', text: 'Keep the research visible. Source selection comes before generation. The draft opens in an editing studio. Each step leaves room for a human decision.' },
      { title: 'The build', text: 'As technical co-founder, I work across the product and its engineering. A Next.js interface connects research to a rich-text editor. An API playground puts search filters, request examples, and responses in one place.' },
    ],
    takeaway: 'The draft is a starting point. The judgement stays human.',
    links: [
      { label: 'Open Inteply', href: 'https://inteply.com' },
    ],
  },
  {
    slug: 'pitchmate',
    title: 'PitchMate',
    kind: 'Team hackathon project',
    discipline: 'Voice + interaction',
    summary: 'Thirty seconds to pitch. A voice that answers back.',
    intro: 'A voice-based pitch coach, built with a team at a hackathon. Speak for thirty seconds. Confirm what it heard. Get direct feedback, spoken back.',
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
