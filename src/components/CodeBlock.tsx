'use client'

import { CopyButton } from './CopyButton'

interface Props {
  source: string       // raw source for the copy button
  highlighted: string  // pre-highlighted HTML from the API route
}

export function CodeBlock({ source, highlighted }: Props) {
  return (
    <div className="relative group h-full">
      <CopyButton code={source} />
      <div
        className="text-[13px] leading-relaxed overflow-auto h-full p-4 [&_pre]:!bg-transparent [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: highlighted }}
      />
    </div>
  )
}
