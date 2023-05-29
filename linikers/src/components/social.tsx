import {
  faGithub,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Social() {
  return (
    <div className="p-2 md:p-6">
      <a
        href="https://github.com/linikers/"
        target="_blank"
        className="p-2 md:p-4"
      >
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a
        href="https://instagram.com/linikers"
        target="_blank"
        className="p-2 md:p-4"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a
        href="https://www.linkedin.com/in/linikers/"
        target="_blank"
        className="p-2 md:p-4"
      >
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
    </div>
  );
}
