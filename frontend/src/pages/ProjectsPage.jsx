import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchJson } from "../api";

export function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchJson("/content/projects").then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <div className="projects-page">
      <header className="header visible" id="header">
        <div className="logo"><img src="/logo.png" alt="3-HM Logo" /></div>
        <Link to="/home" className="get-in-touch">HOME &gt;</Link>
      </header>
      <main className="projects-main">
        <section className="hero compact"><div className="hero-box"><h1>List of Our Projects</h1></div></section>
        {projects.map((project) => (
          <section key={project.slug} className="project-block">
            <div className="project-text"><h3>{project.title}</h3><p>{project.description}</p></div>
            <div className="project-image-wrap"><img src={project.image} alt={project.title} /></div>
          </section>
        ))}
      </main>
    </div>
  );
}
