'use client'

import { Suspense, ComponentType } from 'react'

interface Props {
  component: ComponentType
  isCardPreview?: boolean
}

function PreviewSkeleton() {
  return <div className="w-full h-full bg-neutral-900 animate-pulse" />
}

export function PreviewContainer({ component: Component, isCardPreview = false }: Props) {

  // In the modal (isCardPreview = false) no transform is applied — full size.
  // In the card (isCardPreview = true) we scale down to fit the thumbnail.
  const scale = isCardPreview ? 0.35 : 1

  if (scale === 1) {
    return (
      <div className="relative w-full h-full overflow-hidden bg-neutral-950">
        <Suspense fallback={<PreviewSkeleton />}>
          <Component />
        </Suspense>
      </div>
    )
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-neutral-950">
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: `${100 / scale}%`,
          height: `${100 / scale}%`,
          position: 'absolute',
          top: 0,
          left: 0,
        }}
      >
        <Suspense fallback={<PreviewSkeleton />}>
          <Component />
        </Suspense>
      </div>
    </div>
  )
}
