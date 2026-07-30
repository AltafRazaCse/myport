import { MdArrowOutward } from "react-icons/md";
import "./styles/Contact.css";
import contact from "../content/contact.json";

const Contact = () => {
  return (
    <section className="contact-section section-container" id="contact">
      <div className="contact-container">
        <span className="eyebrow">{contact.eyebrow}</span>

        <h2 className="contact-cta">
          {contact.ctaLine1}
          <br />
          {contact.ctaLine2}
          <span className="accent-text">{contact.ctaHighlight}</span>
        </h2>

        <a
          href={`mailto:${contact.email}`}
          className="contact-email"
          data-cursor="disable"
        >
          {contact.email}
          <MdArrowOutward />
        </a>

        <div className="contact-footer">
          <div className="contact-block">
            <span className="contact-label">Socials</span>
            <div className="contact-socials">
              {contact.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social"
                  data-cursor="disable"
                >
                  {s.label}
                  <MdArrowOutward />
                </a>
              ))}
            </div>
          </div>

          <div className="contact-block">
            <span className="contact-label">Based in</span>
            <span className="contact-line">{contact.location}</span>
            {/* <a href="#book" className="contact-line contact-book" data-cursor="disable">
              Book a 1:1 call ↗
            </a> */}
          </div>

          <div className="contact-block contact-block-end">
            <span className="contact-label">Info</span>
            <span className="contact-line">
              Designed &amp; built by{" "}
              <span className="accent-text">{contact.signature}</span>
            </span>
            <a href="#landingDiv" className="contact-top" data-cursor="disable">
              Back to top ↑
            </a>
            <span className="contact-line contact-muted">{contact.year}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
