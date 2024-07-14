// import { Container, Image, Modal } from "react-bootstrap";
// import QRCode from "react-qr-code";
// import scanqr from "../../asset/img/scanqr.png";
// import { useSelector } from "react-redux";
// import { IoIosCloseCircle } from "react-icons/io";
// import { useRef } from "react";

// const ModalQR = ({ showProp, repetedDishStateProp }) => {
//   const qntCartApp = useSelector(state => state.cart.qnt);
//   const canvasRef = useRef();
//   const createBlobFromCanvas = () => {
//     const canvas = canvasRef.current;
//     canvas.toBlob(blob => {
//       if (blob) {
//         const message = encodeURIComponent("Guarda questa immagine:");
//         const whatsappUrl = `https://api.whatsapp.com/send?text=${message} ${blob}`;
//         window.open(whatsappUrl, "_blank");
//       }
//     }, "image/png");
//   };

//   return (
//     <Container
//       className="m-0 p-0"
//       fluid>
//       <Modal
//         show={showProp}
//         centered
//         onHide={() => {
//           window.location.reload();
//         }}>
//         <Modal.Header
//           closeButton
//           className="me-5">
//           <Container className="d-flex justify-content-center">
//             <Image
//               src={scanqr}
//               width={60}
//             />
//             <p style={{ marginTop: "1.5rem", fontWeight: "bold" }}>Mostra il QR alla cassa</p>
//           </Container>
//         </Modal.Header>
//         <Modal.Body>
//           <Container className="d-flex justify-content-center">
//             <QRCode
//               className="m-4"
//               value={repetedDishStateProp ? JSON.stringify(repetedDishStateProp) : "nulla da mostrare"}
//               ref={canvasRef}
//               renderAs="canvas"
//             />
//           </Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <Container className="d-flex flex-column align-items-center gap-1">
//             <p className="text-center">Articoli Totali: {qntCartApp}</p>
//             <p className="text-center">
//               Chiudi dopo aver letto il QR in cassa, <b>Grazie!</b>
//             </p>
//             <div className="d-flex flex-column align-items-center gap-1 border-PayCart">
//               <IoIosCloseCircle
//                 onClick={() => {
//                   createBlobFromCanvas();
//                 }}
//                 cursor="pointer"
//                 color="#083759"
//                 fontSize={60}></IoIosCloseCircle>
//               <p className="m-0 p-0 fst-italic">What app</p>
//             </div>
//           </Container>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };
// export default ModalQR;
import { Container, Image, Modal } from "react-bootstrap";
import QRCode from "react-qr-code";
import scanqr from "../../asset/img/scanqr.png";
import { useSelector } from "react-redux";
import { IoIosCloseCircle } from "react-icons/io";
import { useRef, useEffect, useState } from "react";
import html2canvas from "html2canvas";

const ModalQR = ({ showProp, repetedDishStateProp }) => {
  const qntCartApp = useSelector(state => state.cart.qnt);
  const qrCodeRef = useRef();
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    const generateQrCodeUrl = async () => {
      const canvas = await html2canvas(qrCodeRef.current);
      const dataUrl = canvas.toDataURL("image/png");
      setQrCodeUrl(dataUrl);
    };

    if (showProp) {
      generateQrCodeUrl();
    }
  }, [showProp]);

  return (
    <Container
      className="m-0 p-0"
      fluid>
      <Modal
        show={showProp}
        centered
        onHide={() => {
          window.location.reload();
        }}>
        <Modal.Header
          closeButton
          className="me-5">
          <Container className="d-flex justify-content-center">
            <Image
              src={scanqr}
              width={60}
            />
            <p style={{ marginTop: "1.5rem", fontWeight: "bold" }}>Mostra il QR alla cassa</p>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container className="d-flex justify-content-center">
            <div
              ref={qrCodeRef}
              className="m-4">
              {/*  */}
            </div>
            {qrCodeUrl ? (
              <div className="m-4">
                <a
                  href={qrCodeUrl}
                  download="ordinazione.png">
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    style={{ userSelect: "auto" }}
                  />
                </a>
              </div>
            ) : (
              <QRCode value={repetedDishStateProp ? JSON.stringify(repetedDishStateProp) : "nulla da mostrare"} />
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Container className="d-flex flex-column align-items-center gap-1">
            <p className="text-center">Articoli Totali: {qntCartApp}</p>
            <p className="text-center">
              Chiudi dopo aver letto il QR in cassa, <b>Grazie!</b>
            </p>
            <div className="d-flex flex-column align-items-center gap-1 border-PayCart">
              <IoIosCloseCircle
                onClick={() => window.location.reload()}
                cursor="pointer"
                color="#083759"
                fontSize={60}
              />
              <p className="m-0 p-0 fst-italic">Chiudi</p>
            </div>
          </Container>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ModalQR;
