import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

const FOOTER_LINKS = [
  { label: "Get the App", path: "/app" },
  { label: "Help", path: "/help" },
  { label: "Site Index", path: "/site-index" },
  { label: "Pro", path: "/pro" },
  { label: "Advertising", path: "/advertising" },
  { label: "Developer", path: "/developer" },
  { label: "Jobs", path: "/jobs" },
  { label: "Privacy Policy", path: "/privacy" },
];

const SOCIALS = [
  {
    icon: FaFacebookF,
    url: "#",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    url: "#",
    label: "Instagram",
  },
  {
    icon: FaLinkedinIn,
    url: "#",
    label: "LinkedIn",
  },
  {
    icon: FaYoutube,
    url: "#",
    label: "YouTube",
  },
  {
    icon: FaTelegramPlane,
    url: "#",
    label: "Telegram",
  },
];

const Footer = () => {
  const location = useLocation();

  if (["/login", "/register"].includes(location.pathname)) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-links">
        {FOOTER_LINKS.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className="footer-link"
          >
            {link.label}
            <ChevronRight />
          </Link>
        ))}
      </div>

      <div className="footer-socials">
        {SOCIALS.map(({ icon: Icon, url, label }) => (
          <a
            key={label}
            href={url}
            className="footer-social-icon"
            aria-label={label}
          >
            <Icon />
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;