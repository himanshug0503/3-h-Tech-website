import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { apiBase, fetchJson } from "../api";

export function HomePage() {
  const [content, setContent] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchJson("/content/home").then(setContent).catch(() => setStatus("Could not load content."));
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const header = document.getElementById("header");
      if (header) header.classList.toggle("visible", window.scrollY > 50);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sliderImages = useMemo(() => {
    if (!content?.sliderImages?.length) return [];
    return [...content.sliderImages, content.sliderImages[0]];
  }, [content]);

  const submitContact = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const response = await fetch(`${apiBase}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (response.ok) {
      setStatus("Message sent successfully.");
      event.currentTarget.reset();
      return;
    }

    setStatus("Failed to send message.");
  };

  if (!content) return <div className="loading">Loading...</div>;

  return (
    <>
      <header className="header" id="header">
        <div className="logo"><img src="/logo.png" alt="3-HM Logo" /></div>
        <button className="get-in-touch" onClick={() => setPopupOpen(true)}>GET IN TOUCH &gt;</button>
      </header>

      {popupOpen && (
        <div id="popup" className="popup-overlay active" onClick={(e) => e.target.id === "popup" && setPopupOpen(false)}>
          <div className="popup-content">
            <span className="popup-close" onClick={() => setPopupOpen(false)}>&times;</span>
            <div className="popup-left"><p className="statement">Have any questions? Feel free to reach out to us!</p></div>
            <div className="popup-right">
              <form onSubmit={submitContact}>
                <input type="text" name="name" placeholder="Your Name" required />
                <input type="email" name="email" placeholder="Your Email" required />
                <textarea name="message" placeholder="Your Message" rows="4" required />
                <div className="form-actions"><button type="submit">Send Message</button></div>
              </form>
            </div>
          </div>
        </div>
      )}

      <main>
        <section className="hero"><div className="hero-box"><h1>{content.heroTitle}</h1></div><p className="tagline">{content.tagline}</p></section>
        <section className="services"><div className="vertical-line" /><h2 className="services-title">{content.servicesTitle}</h2><p className="services-content">{content.servicesSubtitle}</p></section>

        {content.projects.map((project, index) => (
          <section className={`project-block ${index % 2 ? "reverse" : ""}`} key={project.id}>
            <div className="project-text"><h2>{project.label}</h2><h3>{project.title}</h3><p>{project.description}</p><a className="gallery-button" href={project.link}>View More &rarr;</a></div>
            <div className="project-image-wrap"><img src={project.image} alt={project.title} /></div>
          </section>
        ))}

        <section className="our-projects">
          <h2>OUR PROJECTS</h2>
          <div className="slider-track">
            {sliderImages.map((image, index) => <img key={`${image}-${index}`} src={image} alt="Project" className="slider-image" />)}
          </div>
          <Link to="/projects" className="gallery-button">See More Projects &rarr;</Link>
        </section>
      </main>

      <footer className="footer" id="contact">
        <p>2025 3-HM. All Rights Reserved. | <Link to="/privacy" className="footer-link">Privacy Policy</Link> | <Link to="/terms" className="footer-link">Terms of Service</Link></p>
      </footer>
      {status ? <div className="status-msg">{status}</div> : null}
    </>
  );
}
