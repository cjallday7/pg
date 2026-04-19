import { getAllExperiments } from '@/lib/registry'
import { Gallery } from '@/components/Gallery'

export default async function PlaygroundPage() {
  const experiments = await getAllExperiments()

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <header className="px-6 pt-16 pb-10 max-w-7xl mx-auto">
        <p className="text-neutral-500 text-sm mb-2 tracking-widest uppercase">
          playground.christianjohnson.dev
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">
          Interaction Lab
        </h1>
        <p className="text-neutral-400 mt-3 text-sm max-w-md leading-relaxed">
          {experiments.length} interactive experiment
          {experiments.length !== 1 ? 's' : ''} — cursor effects, scroll
          experiences, Three.js scenes, and GLSL shaders. Click any card to
          explore the code.
        </p>
      </header>

      <Gallery experiments={experiments} />
    </main>
  )
}
