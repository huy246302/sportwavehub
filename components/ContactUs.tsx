import Image from 'next/image';

const ContactUs = () => {
    return (
        <div style={{ display: 'flex', backgroundColor: '#f5f5f5', padding: '50px', borderRadius: '20px', color: '#333', alignItems: 'center' }}>
          {/* Left Section */}
          <div style={{ 
              flex: 1, 
              backgroundColor: '#ffffff', 
              padding: '30px', 
              borderRadius: '20px', 
              marginRight: '20px', 
              transform: 'rotate(-5deg)', 
              boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
              color: '#333'
          }}>
            <Image 
            src="https://cdn.rareblocks.xyz/collection/clarity/images/cta/3/crowny-logo.svg" 
            alt="Brand Logo" 
            width={100}
            height={100}
            sizes="100vw" 
            />
            <p style={{ fontStyle: 'italic' }}>
              “This platform is a game-changer! Our sports news is now faster and more engaging.”
            </p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Image 
                src="https://cdn.rareblocks.xyz/collection/clarity/images/cta/3/avatar-female.png" 
                alt="Profile"             
                width={50}
                height={50}
                sizes="100vw" 
                />
              <div style={{ marginLeft: '10px' }}>
                <p>Jane Smith</p>
                <p>Chief Editor, SportsDaily</p>
              </div>
                <Image 
                src="https://img.freepik.com/premium-vector/fake-autograph-with-letter-handwritten-ink-signature-documents-certificates_608189-1184.jpg?semt=ais_hybrid" 
                alt="Signature" 
                width={100}
                height={30}
                sizes="100vw" 
                style={{ position: 'relative', left: '-20px' }}
                />
            </div>
          </div>
    
          {/* Right Section */}
          <div style={{ flex: 2 }}>
            <h1>Stay Updated with the Latest Sports News 🏅</h1>
            <p>Get the latest sports news delivered directly to your inbox. Sign up now and never miss an update!</p>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <input 
                type="email" 
                placeholder="Enter your email address" 
                style={{ flex: 1, padding: '15px', borderRadius: '50px 0 0 50px', border: 'none' }} 
              />
              <button 
                style={{ padding: '15px 30px', background: 'linear-gradient(90deg, #ff4500, #ff6347)', borderRadius: '0 50px 50px 0', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                Subscribe Now
              </button>
            </div>
          </div>
        </div>
    );
};

export default ContactUs;
