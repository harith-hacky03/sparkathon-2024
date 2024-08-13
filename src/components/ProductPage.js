import React,{useEffect} from 'react';
import './ProductPage.css'; // Import CSS for styling
import laptop from "../assets/laptop.png";
import { usePeer } from "./PeerContext";
import { useNavigate } from "react-router-dom";
const ProductPage = () => {

  const { myPeer, connection, setConnection, remoteId, connectAudio, localAudioRef, remoteAudioRef } = usePeer();


  useEffect(() => {
    const handleData = (data) => {
      if (data.type === 'scroll') {
        var left = data.position.left;
        var top = data.position.top;
        // if(left>window.innerWidth) left = window.innerWidth
        // if(top>window.innerHeight) top = window.innerHeight
        window.scrollTo(left,top);
      }
      if (data.type === 'buttonClicked') {
        console.log(data.btn);
        mapFunctions(data.btn);
      }
    };
  
    connection?.on('data', handleData);
  
    myPeer?.on('call', (call) => {
      console.log('receiving');
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          localAudioRef.current.srcObject = stream;
          call.answer(stream);
          call.on('stream', (remoteStream) => {
            remoteAudioRef.current.srcObject = remoteStream;
          });
        })
        .catch(err => console.error('Failed to get local stream', err));
    });
  
    return () => {
      connection?.off('data', handleData);
      // You can also clean up myPeer event listeners here if needed
    };
  }, [connection]);
  

  useEffect(() => {
    const handleScroll = () => {
      if (connection) {
        connection.send({ type: "scroll", position: {left:window.scrollX,top:window.scrollY} });
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [connection]);

  const navigate = useNavigate();
  const handleBuyNow = () => {
    // Logic for the "Buy Now" button
    alert("Proceeding to checkout...");
  };

  const handleAddToCart = () => {
    // Logic for the "Add to Cart" button
    alert("Item added to cart!");
  };

  function mapFunctions(name) {
    if (name === 'buyn') {
      handleBuyNow()
    }
    if(name === 'atc'){
      handleAddToCart()
    }
  }

  const handleButtonClick = (event) => {
    const buttonName = event.currentTarget.getAttribute("name");
    connection?.send({ type: "buttonClicked", btn: buttonName });
    console.log(buttonName);
    mapFunctions(buttonName);
  };

  return (
    <div className="product-page">
      <div className="product-image-container">
        <img 
          src={laptop} 
          alt="Mac Laptop" 
          className="product-image" 
        />
      </div>
      <div className="product-details">
        <h1 className="product-title">MacBook Pro 16-inch</h1>
        <p className="product-price">$2,499.00</p>
        <p className="product-description">
          The 16-inch MacBook Pro is the ultimate pro notebook, designed for pros who need the best in performance and graphics. Experience the stunning Retina display, the supercharged performance with the M1 Pro or M1 Max chip, and up to 64GB of unified memory.
        </p>
        <div className="button-container">
          <button name="buyn" onClick={(event)=>handleButtonClick(event)} className="buy-now-button" >
            Buy Now
          </button>
          <button name="atc" onClick={(event)=>handleButtonClick(event)} className="add-to-cart-button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
