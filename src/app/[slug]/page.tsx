import { getAllSlugs, getLazyComponent } from '@/lib/registry'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export default async function ExperimentPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const Component = getLazyComponent(slug)
  if (!Component) notFound()

  return (
    <div className="w-screen h-screen bg-neutral-950 overflow-hidden">
      <Suspense fallback={null}>
        <Component />
      </Suspense>
    </div>
  )
}
