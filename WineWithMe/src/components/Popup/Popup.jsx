import React, { useState } from "react";
import "./Popup.css";
import WW_logo from "/src/images/WW_logo.png";
import AboutImage from "./../../images/infobtn.png";
import ContactImage from "./../../images/contactbtn.png";
import InspoImage from "./../../images/inspbtn.png";
import CloseButton from "./../../images/closebtn.png"

export default function Popup({type}) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  if (type == "about")
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          <img src={AboutImage} className="popup-button-img" />
        </button>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content">
                <img src={WW_logo} className="logo" alt="Vite logo" />
                  <div className="modal-content-inner">
                  <div className="header-btn">
                  <img src={CloseButton} className="close-modal" onClick={toggleModal}/>
                    <h2 className="headernav insp">About us</h2>
                    </div>
                      <p>
                        Our Concept: We are here to help you to find the ideal beverage
                        to serve at your special occasion, or which food that pairs best
                        with your favorite cocktail. Combining food and drink has been a
                        long-standing practice to enhance the dining experience. While
                        wine is commonly associated with food pairing, cocktails and
                        beer can also be paired with meals, from fancy dinner parties to
                        casual barbecue gatherings.
                        <br></br>
                        <br></br>
                        Pairing food with drinks can be challenging due to the
                        complexity of their flavors, but it can also be enjoyable as the
                        flavor possibilities are endless and can lead to amazing
                        results. Unlike wine and beer, cocktails offer a broader range
                        of choices for pairing, which can make it difficult to decide
                        where to start.
                        <br></br>
                        <br></br>
                        We have compiled some of the best drink and recipe combinations
                        for you to explore and find your perfect pairing.
                      </p>
                  </div>
                {/* <img src={CloseButton} className="close-modal" onClick={toggleModal}/> */}
              </div>
          </div>
        )}
      </>
    );
  else if (type == "contact")
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          <img src={ContactImage} className="popup-button-img" />
        </button>

        {modal && (
          <div className="modal">
            <div  className="overlay"></div>
            <div className="modal-content">
              <img src={WW_logo} className="logo" alt="Vite logo" />
              <div className="modal-content-inner">
                <div className="header-btn">
              <img src={CloseButton} className="close-modal" onClick={toggleModal}/>
              <h2 className="headernav insp">Contact</h2>
              </div>
              <form className="cf">
              <div className="half left cf">
                <input type="text" id="input-name" placeholder="Name" />
                <input
                  type="email"
                  id="input-email"
                  placeholder="Email address"
                />
                <input type="text" id="input-subject" placeholder="Subject" />
              </div>
              <div className="half right cf">
                <textarea
                  name="message"
                  type="text"
                  id="input-message"
                  placeholder="Message"
                ></textarea>
              </div>
              <input type="submit" value="Submit" id="input-submit" />
            </form>
                {/* <img src={CloseButton} className="close-modal" onClick={toggleModal}/> */}
              </div>
            </div>
          </div>
        )}
      </>
    );

    else if (type == "inspiration")
    return (
      <>
        <button onClick={toggleModal} className="btn-modal">
          <img src={InspoImage} className="popup-button-img" />
        </button>

        {modal && (
          <div className="modal">
            <div onClick={toggleModal} className="overlay"></div>
              <div className="modal-content-inspiration">
                <div className="content-container-inspiration">
                  <img src={WW_logo} className="logo" alt="Vite logo" />
                    <div className="modal-content-inner-inspiration">
                      <div className="header-btn">
                        <img src={CloseButton} className="close-modal" onClick={toggleModal}/>
                        <h2 className="headernav insp">Inspiration</h2>
                      </div>
                        <p>
                          Here are some general tips for pairing food and drinks:
                          <br></br>
                          <br></br>
                          Experiment with flavors for a unique experience. Pair light
                          wines with light dishes and full-bodied wines with rich dishes.
                          For example, a light white wine pairs well with fish and chicken
                          dishes, while a full-bodied red wine pairs well with red meat.
                          If the food is rich and heavy, consider a cocktail with light
                          and refreshing flavors to create a contrast. Pair fatty foods
                          with drinks that have high acidity or tannins. This can help to
                          cut through the richness of the food and provide a refreshing
                          contrast.
                          <br></br>
                          <br></br>
                          Balance the intensity of the flavors. Pair spicy food with
                          drinks that have a cooling effect, such as beer or white wine.
                          This can help to balance out the spiciness and make the food
                          more enjoyable. Consider a cocktail with sweet or sour notes to
                          balance the heat.
                          <br></br>
                          <br></br>
                          Look for complementary flavors. If the food has hints of citrus
                          or fruitiness, a cocktail with similar notes would be an ideal
                          pairing. Pair sweet foods with sweet drinks. For example, a
                          sweet dessert can be paired with a sweet dessert wine or a
                          liqueur. Pair acidic foods with acidic drinks. For example, a
                          salad with a vinaigrette dressing can be paired with a wine that
                          has high acidity, such as a Sauvignon Blanc.
                          <br></br>
                          <br></br>
                          Pair salty foods with drinks that have low acidity. This can
                          help to balance out the saltiness and prevent the drink from
                          tasting too tart.
                          <br></br>
                          <br></br>
                          Remember, these are just suggestions, and ultimately, pairing
                          food and cocktails is a matter of personal taste. Don't be
                          afraid to experiment and find your perfect pairing!
                        </p>
                    </div>
                  </div>
              </div>
          </div>
        )}
      </>
    );
}
