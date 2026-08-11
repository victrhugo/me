"use client"

import { SmokeyFluidCursor } from "react-smokey-fluid-cursor"

export function FluidCursor() {
  return (
    <SmokeyFluidCursor
      config={{
        curl: 14,
        splatRadius: 0.3,
        splatForce: 4500,
        densityDissipation: 3.2,
        velocityDissipation: 2.2,
        colorUpdateSpeed: 6,
        transparent: true,
      }}
    />
  )
}
