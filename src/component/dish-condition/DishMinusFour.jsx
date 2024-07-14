import { Col, Container, Row } from "react-bootstrap";
import Numero from "../client-menu/Numero";

const DishMinusFour = ({ dish }) => {
  return (
    <Container key={dish.id}>
      <Row className="row-cols-3 align-items-center">
        <Col xs={4}>
          <p className="fs-5">
            {dish.name.length > 18
              ? dish.name.substring(0, 15) + "..."
              : dish.name}
          </p>
        </Col>
        <Col xs={2}>
          <span className="fs-6 fw-bold m-0">
            {dish.price % 1 !== 0
              ? "€" + dish.price.toString().replace(".", ",") + "0"
              : "€" + dish.price.toString() + ",00"}
          </span>
          <p className="m-0" style={{ color: "red", fontSize: "0.7rem" }}>
            Max: {dish.stock}pz
          </p>
        </Col>
        <Col xs={6}>
          <Numero specificDish={dish} />
        </Col>
      </Row>
    </Container>
  );
};
export default DishMinusFour;
