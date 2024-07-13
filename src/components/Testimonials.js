import React from "react";
import testimonials from "../testimonials";

const Testimonials = () => {
  return (
    <div className="testimonial-container">
      <div className="testimonial-header">
        <p>Testimonials</p>
      </div>
      <div className="testimonial-cards-container">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-content">
              <div className="profile-picture">
                <img src={testimonial.profile_picture} alt={testimonial.user} />
              </div>
              <div className="info">
                <h3>{testimonial.user}</h3>
                <p>{testimonial.user_location}</p>
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <span key={index} role="img" aria-label="star">
                      &#9733;
                    </span>
                  ))}
                </div>
                <p className="review">{testimonial.review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
