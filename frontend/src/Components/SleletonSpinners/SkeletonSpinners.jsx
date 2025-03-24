import React from 'react'
import './SkeletonSpinners.scss'

export default function SkeletonSpinners() {
  return (
    <div class="card" aria-hidden="true" style={{ height: "100vh" }}>
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title placeholder-glow">
          <span className="placeholder col-6"></span>
        </h5>
        <p class="card-text placeholder-glow">
          <span className="placeholder col-7"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-4"></span>
          <span className="placeholder col-6"></span>
          <span className="placeholder col-8"></span>
        </p>
      </div>
    </div>
  )
}
