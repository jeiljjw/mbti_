import { Footer } from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">Privacy Policy</h1>
          <p className="legal-last-updated">Last Updated: April 17, 2026</p>
        </header>

        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card">
            <h2>Introduction</h2>
            <p>
              Welcome to <strong>Simple MBTI</strong>. Your privacy is critically important to us. 
              This Privacy Policy document contains types of information that is collected and recorded 
              by Simple MBTI and how we use it.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Log Files</h2>
            <p>
              Simple MBTI follows a standard procedure of using log files. These files log visitors 
              when they visit websites. All hosting companies do this and a part of hosting services' 
              analytics. The information collected by log files includes internet protocol (IP) 
              addresses, browser type, Internet Service Provider (ISP), date and time stamp, 
              referring/exit pages, and possibly the number of clicks. These are not linked to any 
              information that is personally identifiable.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Cookies and Web Beacons</h2>
            <p>
              Like any other website, Simple MBTI uses 'cookies'. These cookies are used to store 
              information including visitors' preferences, and the pages on the website that the 
              visitor accessed or visited. The information is used to optimize the users' experience 
              by customizing our web page content based on visitors' browser type and/or other information.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Third Party Privacy Policies</h2>
            <p>
              Simple MBTI's Privacy Policy does not apply to other websites. Thus, we are advising 
              you to consult the respective Privacy Policies of any third-party services for more 
              detailed information.
            </p>
            <p>
              You can choose to disable cookies through your individual browser options. To know more 
              detailed information about cookie management with specific web browsers, it can be 
              found at the browsers' respective websites.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>Consent</h2>
            <p>
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
