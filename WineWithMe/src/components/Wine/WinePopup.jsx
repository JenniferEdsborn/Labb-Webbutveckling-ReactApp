import "./WinePopup.css";
import closeButton from "../../images/closebtn.png"
import shoppingCart from "../../images/shopping-cart.png"
import star from "../../images/star.png"
import { createPortal } from "react-dom";

export default function WinePopup({ wine, onClose }) {
    const closeModal = () => {
        onClose();
      };

      // Öppnar vinets köp-länk i ett nytt fönster
      const openWineLink = () => {
        window.open(wine.link, '_blank', 'noopener,noreferrer')
      };

      // Fönstret stängs när man klickar utanför popup
      const handleClickOutside = (e) => {
        if (e.target === e.currentTarget) {
          closeModal();
        }
      };

      const modalContent = (
        <>
          <div className="Wineoverlay" />
          <div className="Winemodal"  onClick={handleClickOutside} >
            <div className="Winemodal-content">
              <div className="Winemodal-header">
                <h2>{wine.title}</h2>
                <img src={closeButton} onClick={closeModal} className="Wineclose-modal" />
              </div>
              <div className="Winemodal-body">
              <img src={wine.imageUrl} className="logo" alt="Image of Wine" />
                    <div className="stats">
                    <span className="rating">
                        {Math.floor(wine.averageRating * 10 / 2) * 2} / 10
                        <img src={star} alt="star" />
                    </span>
                    <span className="price">${parseFloat(wine.price.replace('$', '')).toFixed(2)}</span>
                    <img
                        src={shoppingCart}
                        className="shopping-cart-link"
                        alt="shopping cart"
                        onClick={openWineLink}/>
                    </div>
                <hr />
                <p>{wine.description}</p>
              </div>
            </div>
          </div>
        </>
      );

      return createPortal(modalContent, document.body)
}
