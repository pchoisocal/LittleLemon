import React from "react";
import specials from "../specials";
import Swal from "sweetalert2"

const Menu = () => {

  const handleOrder = (order) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: true
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Do you want to confirm order?',
      text: `${order.title} - ${order.price}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      reverseButtons: false
    }).then((result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire(
          'Orderd!',
          'Your order has been confirmed.',
          'success'
        )
      } 
    })
  }

  return (
    <div className="menu-container">
      <div className="menu-header">
        <h2>This weeks specials!</h2>
        <button>Online Menu</button>
      </div>
      <div className="cards">
        {specials.map((special) => (
          <div key={special.id} className="menu-items">
            <img src={special.image} alt="" />
            <div className="menu-content">
              <div className="heading">
                <h5>{special.title}</h5>
                <p>${special.price}</p>
              </div>
              <p>{special.description}</p>
              <button
                className="orderbtn"
                onClick={() => handleOrder(special)}
              > 
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
