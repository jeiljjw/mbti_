import { Footer } from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="legal-page">
      <div className="legal-container">
        <header className="legal-header">
          <h1 className="legal-title text-gradient">Terms of Service</h1>
          <p className="legal-last-updated">Last Updated: April 17, 2026</p>
        </header>

        <div className="legal-content">
          <section className="legal-section glass-panel legal-section-card">
            <h2>1. Agreement to Terms</h2>
            <p>
              By accessing our website at <strong>Simple MBTI</strong>, you are agreeing to be bound by these 
              terms of service, all applicable laws and regulations, and agree that you are responsible 
              for compliance with any applicable local laws. If you do not agree with any of these 
              terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>2. Use License</h2>
            <p>
              Permission is granted to temporarily use the materials (information or software) on 
              Simple MBTI's website for personal, non-commercial transitory viewing only. 
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul>
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display;</li>
              <li>Attempt to decompile or reverse engineer any software contained on Simple MBTI's website;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>3. Disclaimer</h2>
            <p>
              The materials on Simple MBTI's website are provided on an 'as is' basis. 
              Simple MBTI makes no warranties, expressed or implied, and hereby disclaims and negates 
              all other warranties including, without limitation, implied warranties or conditions of 
              merchantability, fitness for a particular purpose, or non-infringement of intellectual 
              property or other violation of rights.
            </p>
            <p>
              Further, Simple MBTI does not warrant or make any representations concerning the accuracy, 
              likely results, or reliability of the use of the materials on its website or otherwise 
              relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>4. Limitations</h2>
            <p>
              In no event shall Simple MBTI or its suppliers be liable for any damages (including, 
              without limitation, damages for loss of data or profit, or due to business interruption) 
              arising out of the use or inability to use the materials on Simple MBTI's website, 
              even if Simple MBTI or a Simple MBTI authorized representative has been notified orally 
              or in writing of the possibility of such damage.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>5. Accuracy of Materials</h2>
            <p>
              The materials appearing on Simple MBTI's website could include technical, typographical, 
              or photographic errors. Simple MBTI does not warrant that any of the materials on its 
              website are accurate, complete or current. Simple MBTI may make changes to the materials 
              contained on its website at any time without notice. However Simple MBTI does not make 
              any commitment to update the materials.
            </p>
          </section>

          <section className="legal-section glass-panel legal-section-card">
            <h2>6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws 
              and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
            </p>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
