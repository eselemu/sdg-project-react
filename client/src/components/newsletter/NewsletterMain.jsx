import React, { useState } from 'react';

import './newsletter.css';

function NewsletterMain({ news }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!news) {
    return (<div>Loading news...</div>);
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
            {news.map((item, index) => (
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
      <div className="container">
        <div className="row">
          <div className="col-12 d-flex justify-content-center align-items-center">
            <button type="button" className="btn btn-primary btn-purple" data-bs-toggle="modal" data-bs-target="#exampleModal" disabled>
              Admin News Manager
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <form action="/newNews" method="POST" enctype="multipart/form-data">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Post news as admin</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="container">
                <div class="row">
                    <div class="col-10">
                        <h5>Username</h5>
                    </div>
                </div>
                <br/>
                <div class="row">
                    <div class="col-12">
                        <div class="mb-3">
                            <input type="text" class="form-control" name="Title" id="exampleFormControlInput1" placeholder="Title"/>
                        </div>
                        <div class="mb-3">
                            <textarea class="form-control" name="Text" id="exampleFormControlTextarea1" placeholder="Brief summary (up to 200 characters)" rows="4" maxlength="200"></textarea>
                        </div>
                        <div class="mb-3">
                          <textarea class="form-control" name="ShortDescription" id="exampleFormControlTextarea1" placeholder="Catching Description (50 characters or less)" rows="4" maxlength="50"></textarea>
                      </div>
                        <div class="mb-3">
                          <input type="url" name="URL" class="form-control" id="exampleFormControlInput1" placeholder="URL"/>
                      </div>
                        <div class="mb-3">
                            <label for="formFile" class="form-label">Upload a picture</label>
                            <input class="form-control" name="Image" type="file" id="formFile" placeholder="Upload image"/>
                          </div>
                    </div>
                </div>
            </div>
        </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary btn-purple">Upload</button>
          </div>
        </div>
      </form>

    </div>
  </div>
    </>
  );
}

export default NewsletterMain;
