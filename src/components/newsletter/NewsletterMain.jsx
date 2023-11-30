import React, { useState } from 'react';

import './../newsletter/newsletter.css';

function NewsletterMain({ news }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!news) {
    // Handle the case when news is still loading or if there's an error
    return <div>Loading news...</div>;
  }

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : news.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex < news.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <>
      <div className="container-fluid" id="carouselDecorative"></div>
      <div className="col" id="MasterContainer">
      <div className="carousel slide" id="enchilada" data-ride="carousel">
        <div className="carousel-inner">
          {news.slice(0, 3).map((item, index) => (
            <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
              {/* Carousel item content */}
              <div className="container oracleInspiration">
                <div>
                  <img src={item.Image} className="carouselImage" alt="" />
                </div>
                <div className="container carouselTextBox rounded">
                  <div className="col">
                    <div className="row">
                      <h2>{item.Title}</h2>
                    </div>
                    <div className="row">
                      <p>{item.Text}</p>
                    </div>
                    <div className="row">
                      <a href={item.URL} target="_blank" rel="noopener noreferrer">
                        Read the article here
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Carousel control buttons */}
        <a className="carousel-control-prev" href="#enchilada" role="button" data-slide="prev" onClick={handlePrev}>
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#enchilada" role="button" data-slide="next" onClick={handleNext}>
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="sr-only">Next</span>
        </a>
      </div>
      
      <div class="container">
      <div class="row justify-content-center">
      <div class="col col-12 col-lg-8">
      <div class="container rounded" id="contenedorNoticias">
        <div className="container">
          {/* News section */}
          <div className="row rounded bg-light">
            <div className="col">
              <h2>Aqui van las noticias del dia</h2>
            </div>
          </div>
          {/* Individual news items */}
          {news.slice().reverse().map((item, index) => (
            <div key={index} className="container">
              {/* News item content */}
              <div className="row rounded noticia bg-light">
                <div className="col col-6 col-lg-4 col-sm-6 align-self-center">
                  <img className="img-fluid flat-start" src={item.Image} alt="" />
                </div>
                <div className="col col-6 col-lg-8 col-md-6">
                  <div className="container">
                    <div className="col">
                      <div className="row">
                        <h3>{item.Title}</h3>
                      </div>
                      <div className="row nonCellphoneCompatible">
                        <p>{item.ShortDescription}</p>
                      </div>
                      <div className="row">
                        <div className="col col-md-4 offset-md-8">
                          <span>
                            <a href={item.URL} target="_blank" rel="noopener noreferrer">
                              Read more
                            </a>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        Admin News Manager
      </button>

      {/* Modal */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        {/* Modal content */}
      </div>
    </>
  );
}

export default NewsletterMain;
