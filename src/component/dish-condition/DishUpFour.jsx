// import { Col, Container, Row } from "react-bootstrap";
// import Numero from "../client-menu/Numero";

// const DishUpFour = ({ dish }) => {
//   return (
//     <Container fluid className="m-0 p-0" key={dish.id}>
//       <Row
//         className="row-cols-3 align-items-center d-flex w-100 "
//         style={{ minHeight: "90px" }}
//       >
//         <Col className="m-0 p-0 d-flex flex-grow-1" xs={4}>
//           <span className="fs-5 fw-bold flex-grow-1 m-0 p-0 ps-3">
//             {dish.name}
//           </span>
//         </Col>
//         <Col className="m-0 p-0 d-flex flex-grow-0" xs={2}>
//           <span className="fs-4 fw-bold m-0">
//             {dish.price % 1 !== 0
//               ? "€" + dish.price.toString().replace(".", ",") + "0"
//               : "€" + dish.price.toString() + ",00"}
//           </span>
//         </Col>
//         <Col className="m-0 p-0 d-flex flex-grow-0" xs={5}>
//           <Numero specificDish={dish} />
//         </Col>
//       </Row>
//     </Container>
//   );
// };
// export default DishUpFour;

import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Numero from "../client-menu/Numero";
import HellaHopModal from "../modals/HellaHopModal";
import WahidaModal from "../modals/WahidaModal";
import SpecialModal from "../modals/SpecialModal";
import NaifModal from "../modals/NaifModal";
import AmberAleModal from "../modals/AmberAleModal";
import { BsInfoCircle } from "react-icons/bs";

const DishUpFour = ({ dish }) => {
  const [showHella, setShowHella] = useState(false);
  const [showNaif, setShowNaif] = useState(false);
  const [showAmber, setShowAmber] = useState(false);
  const [showWahida, setShowWahida] = useState(false);
  const [showSpecial, setShowSpecial] = useState(false);
  const handleShowHella = () => setShowHella(true);
  const handleCloseHella = () => setShowHella(false);
  const handleShowNaif = () => setShowNaif(true);
  const handleCloseNaif = () => setShowNaif(false);
  const handleShowAmber = () => setShowAmber(true);
  const handleCloseAmber = () => setShowAmber(false);
  const handleShowWahida = () => setShowWahida(true);
  const handleCloseWahida = () => setShowWahida(false);
  const handleShowSpecial = () => setShowSpecial(true);
  const handleCloseSpecial = () => setShowSpecial(false);

  return (
    <Container fluid className="m-0 p-0" key={dish.id}>
      <Row
        className="row-cols-3 align-items-center d-flex w-100"
        style={{ minHeight: "90px" }}
      >
        <Col className="m-0 p-0 d-flex flex-grow-1" xs={4}>
          <span className="fs-5 fw-bold flex-grow-1 m-0 p-0 ps-3">
            {dish.name}
          </span>
          {dish.name.includes("pasta") ? (
            <BsInfoCircle size={35} onClick={handleShow} />
          ) : dish.name.includes("gramigna") ? (
            <BsInfoCircle size={35} onClick={handleShow} />
          ) : dish.name.includes("tortelloni") ? (
            <BsInfoCircle size={35} onClick={handleShow} />
          ) : dish.name.includes("penne") ? (
            <BsInfoCircle size={35} onClick={handleShow} />
          ) : dish.name.includes("farro") ? (
            <BsInfoCircle size={35} onClick={handleShow} />
          ) : null}
        </Col>
        <Col className="m-0 p-0 d-flex flex-grow-0" xs={2}>
          <span className="fs-4 fw-bold m-0">
            {dish.price % 1 !== 0
              ? "€" + dish.price.toString().replace(".", ",") + "0"
              : "€" + dish.price.toString() + ",00"}
          </span>
        </Col>
        <Col className="m-0 p-0 d-flex flex-grow-0" xs={5}>
          <Numero specificDish={dish} />
        </Col>
      </Row>
      {dish.name.includes("pasta") ? (
        <HellaHopModal show={showHella} handleClose={handleCloseHella} />
      ) : dish.name.includes("gramigna") ? (
        <AmberAleModal show={showAmber} handleClose={handleCloseAmber} />
      ) : dish.name.includes("tortelloni") ? (
        <SpecialModal show={showSpecial} handleClose={handleCloseSpecial} />
      ) : dish.name.includes("penne") ? (
        <NaifModal show={showNaif} handleClose={handleCloseNaif} />
      ) : dish.name.includes("farro") ? (
        <WahidaModal show={showWahida} handleClose={handleCloseWahida} />
      ) : null}
    </Container>
  );
};

export default DishUpFour;
