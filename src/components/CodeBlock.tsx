import { codeToHtml } from 'shiki'
import { CopyButton } from './CopyButton'

interface Props {
  code: string
  language?: string
}

export async function CodeBlock({ code, language = 'tsx' }: Props) {
  const html = await codeToHtml(code, {
    lang: language,
    theme: 'github-dark',
  })

  return (
    <div className="relative group h-full">
      <CopyButton code={code} />
      <div
        className="text-[13px] leading-relaxed overflow-auto h-full p-4 [&_pre]:!bg-transparent [&_pre]:!p-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
