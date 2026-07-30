import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { TbNotes } from "react-icons/tb";
import HoverLinks from "./HoverLinks";
import ThemeToggle from "./ThemeToggle";
import { gsap } from "gsap";
import { getLenis } from "./utils/smoothScroll";
import site from "../content/site.json";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const links = Array.from(
      document.querySelectorAll<HTMLAnchorElement>(".header ul a")
    );

    const handleClick = (e: MouseEvent) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const element = e.currentTarget as HTMLAnchorElement;
        const section = element.getAttribute("data-href");
        const target = section
          ? document.querySelector<HTMLElement>(section)
          : null;
        if (!target) return;
        const lenis = getLenis();
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        } else {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    };

    links.forEach((link) => link.addEventListener("click", handleClick));
    return () => {
      links.forEach((link) => link.removeEventListener("click", handleClick));
    };
  }, []);

  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          {site.navTitle}
        </a>
        <a
          href={`mailto:${site.navEmail}`}
          className="navbar-connect"
          data-cursor="disable"
        >
          {site.navEmail}
        </a>

        <ul className={open ? "is-open" : ""}>
          {site.navLinks.map((link) => (
            <li key={link.href}>
              <a
                data-href={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
              >
                <HoverLinks text={link.label} />
              </a>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <div className="nav-socials">
            <a
              href={site.githubUrl || "https://github.com/altafraza84276"}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              data-cursor="disable"
            >
              <FaGithub />
            </a>
            <a
              href={site.linkedinUrl || ""}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              data-cursor="disable"
              style={{ opacity: site.linkedinUrl ? 1 : 0.4 }}
            >
              <FaLinkedinIn />
            </a>
            <a
              href={site.instagramUrl || ""}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              data-cursor="disable"
              style={{ opacity: site.instagramUrl ? 1 : 0.4 }}
            >
              <FaInstagram />
            </a>
          </div>
          {site.resumeUrl && (
            <a
              className="nav-resume"
              href={site.resumeUrl}
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
            >
              <HoverLinks text="RESUME" />
              <TbNotes />
            </a>
          )}
          <ThemeToggle />
          <button
            className="nav-burger"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            data-cursor="disable"
          >
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      <div
        className={`nav-backdrop ${open ? "is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
