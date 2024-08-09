import Image from 'next/image';
import '../styles/globals.css'; // Import the global CSS

const ContactUs = () => {
    return (
        <div id="contactUsContainer">
          {/* Left Section */}
          <div id="contactUsLeftSection">
            <Image 
              src="https://cdn.rareblocks.xyz/collection/clarity/images/cta/3/crowny-logo.svg" 
              alt="Brand Logo" 
              width={100}
              height={100}
              sizes="100vw" 
            />
            <p id="contactUsTestimonial">
              “This platform is a game-changer! Our sports news is now faster and more engaging.”
            </p>
            <div id="contactUsProfile">
              <Image 
                src="https://cdn.rareblocks.xyz/collection/clarity/images/cta/3/avatar-female.png" 
                alt="Profile"             
                width={50}
                height={50}
                sizes="100vw" 
              />
              <div id="contactUsProfileInfo">
                <p>Jane Smith</p>
                <p>Chief Editor, SportsDaily</p>
              </div>
              <Image 
                src="https://img.freepik.com/premium-vector/fake-autograph-with-letter-handwritten-ink-signature-documents-certificates_608189-1184.jpg?semt=ais_hybrid" 
                alt="Signature" 
                width={100}
                height={30}
                sizes="100vw" 
                id="contactUsSignature"
              />
            </div>
          </div>
    
          {/* Right Section */}
          <div id="contactUsRightSection">
            <h1>Stay Updated with the Latest Sports News 🏅</h1>
            <p>Get the latest sports news delivered directly to your inbox. Sign up now and never miss an update!</p>
            <div id="contactUsSubscriptionForm">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                id="contactUsEmailInput"
              />
              <button 
                id="contactUsSubscribeButton"
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
    );
};

export default ContactUs;
