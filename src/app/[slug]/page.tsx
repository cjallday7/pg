import { getAllSlugs, getComponentLoader } from '@/lib/registry'
import { notFound } from 'next/navigation'
import { lazy, Suspense } from 'react'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default function ExperimentPage({
  params,
}: {
  params: { slug: string }
}) {
  const loader = getComponentLoader(params.slug)
  if (!loader) notFound()

  const Component = lazy(loader)

  return (
    <div className="w-screen h-screen bg-neutral-950 overflow-hidden">
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </div>
  )
}
