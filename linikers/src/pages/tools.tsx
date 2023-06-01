import { Container, ListGroup, ListGroupItem } from "reactstrap";

import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faJs, faReact } from "@fortawesome/free-brands-svg-icons";
export default function Ferramentas() {
  return (
    <Container>
      <ListGroup className="">
        <motion.div>
          <ListGroupItem>
            <motion.div>
              <FontAwesomeIcon icon={faJs} className="mr-2" />
            </motion.div>
            Next.Js
          </ListGroupItem>
        </motion.div>
      </ListGroup>
    </Container>
  );
}
