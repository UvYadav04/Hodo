import React from 'react'
import c1 from '../Photos/b21.jpg'
import c2 from '../Photos/b22.jpg'
import c3 from '../Photos/b23.jpg'
export default function Carousel() {
  return (
    <div className="carousel ">
      <div id="carouselExampleFade" className="carousel slide carousel-fade">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={c1} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={c2} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={c3} className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  )
}
