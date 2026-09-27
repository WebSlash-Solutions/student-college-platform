function Contact() {
  return (
    <section id="contact">
      <style>{`
        #contact {
          padding: 80px 7%;
          background: #f5f9ff;
          font-family: Arial, sans-serif;
        }

        .contact-container {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        .contact-label {
          color: #168cff;
          font-weight: bold;
          letter-spacing: 2px;
        }

        .contact-info h2 {
          font-size: 42px;
          color: #102033;
          margin: 15px 0;
        }

        .contact-info h2 span {
          color: #168cff;
        }

        .contact-text {
          color: #64748b;
          line-height: 1.7;
        }

        .contact-details {
          margin-top: 30px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .contact-icon {
          width: 45px;
          height: 45px;
          background: white;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .contact-item h4 {
          margin: 0 0 5px;
        }

        .contact-item p {
          margin: 0;
          color: #64748b;
        }

        .contact-form-box {
          background: white;
          padding: 35px;
          border-radius: 20px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }

        .contact-form-box h3 {
          margin-bottom: 25px;
          color: #102033;
        }

        .contact-form-box form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .input-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .contact-form-box input,
        .contact-form-box textarea {
          width: 100%;
          box-sizing: border-box;
          padding: 14px;
          border: 1px solid #dbe5ef;
          border-radius: 8px;
          font-size: 15px;
          outline: none;
        }

        .contact-form-box textarea {
          resize: vertical;
        }

        .contact-form-box input:focus,
        .contact-form-box textarea:focus {
          border-color: #168cff;
        }

        .contact-form-box button {
          padding: 14px;
          border: none;
          border-radius: 8px;
          background: #168cff;
          color: white;
          font-size: 16px;
          cursor: pointer;
        }

        .contact-form-box button:hover {
          background: #0875dc;
        }

        @media (max-width: 800px) {
          .contact-container {
            grid-template-columns: 1fr;
          }

          .contact-info h2 {
            font-size: 34px;
          }
        }

        @media (max-width: 500px) {
          #contact {
            padding: 50px 20px;
          }

          .input-row {
            grid-template-columns: 1fr;
          }

          .contact-form-box {
            padding: 25px 20px;
          }
        }
      `}</style>

      <div className="contact-container">

        <div className="contact-info">
          <p className="contact-label">CONTACT US</p>

          <h2>
            Let's Start a <span>Conversation.</span>
          </h2>

          <p className="contact-text">
            Have a question or need more information?
            Get in touch with us. Our team is happy to help you.
          </p>

          <div className="contact-details">

            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <div>
                <h4>Address</h4>
                <p>Chennai, Tamil Nadu, India</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <div>
                <h4>Phone</h4>
                <p>+91 98765 43210</p>
              </div>
            </div>

            <div className="contact-item">
              <div className="contact-icon">✉️</div>
              <div>
                <h4>Email</h4>
                <p>contact@example.com</p>
              </div>
            </div>

          </div>
        </div>

        <div className="contact-form-box">
          <h3>Send Us a Message</h3>

          <form>
            <div className="input-row">
              <input
                type="text"
                placeholder="Your Name"
                required
              />

              <input
                type="email"
                placeholder="Your Email"
                required
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              required
            />

            <textarea
              rows="6"
              placeholder="Your Message"
              required
            ></textarea>

            <button type="submit">
              Send Message →
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}

export default Contact;