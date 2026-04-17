import { Footer } from '../components/Footer';

const About = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">About Simple MBTI</h1>
          <p className="legal-last-updated">Our Mission & Vision</p>
        </header>

        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card">
            <h2>Our Story</h2>
            <p>
              <strong>Simple MBTI</strong> was born out of a desire to make personality psychology accessible, 
              engaging, and truly insightful for everyone. We believe that understanding yourself is 
              the first step towards a more fulfilling life, better relationships, and a successful career.
            </p>
            <p>
              In a world where personality tests are often either too complex or too shallow, 
              we've combined rigorous psychological frameworks with a modern, user-friendly interface 
              to provide an experience that is both deep and approachable.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Why "Simple"?</h2>
            <p>
              "Simple" doesn't mean simplistic. To us, simplicity means removing the barriers to understanding. 
              We focus on delivering high-accuracy results without the fluff, ensuring that you get 
              the insights you need in a way that you can immediately apply to your life.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Our Technology</h2>
            <p>
              Our assessment algorithm is constantly refined using data-driven insights and 
              established personality theories. We are committed to maintaining a platform that is:
            </p>
            <ul>
              <li><strong>Accurate:</strong> Built on proven psychological foundations.</li>
              <li><strong>Fast:</strong> Designed for modern users who value their time.</li>
              <li><strong>Secure:</strong> Your privacy and data security are our top priorities.</li>
              <li><strong>Beautiful:</strong> We believe that useful tools should also be a joy to use.</li>
            </ul>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Join the Journey</h2>
            <p>
              Whether you're looking for self-improvement, career guidance, or just curious about 
              what makes you unique, Simple MBTI is here to help you unlock your full potential. 
              Take the test today and start your journey of discovery.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
