// import { Container } from "react-bootstrap";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";
// import DishUpFour from "../dish-condition/DishUpFour";
// import DishMinusFour from "../dish-condition/DishMinusFour";
// import DishWornOut from "../dish-condition/DishWornOut";

// const Dishes = () => {
//   const menu = useSelector((state) => state.menu.menu);
//   const [showModal, setShowModal] = useState(false);

//   const handleShow = () => setShowModal(true);
//   const handleClose = () => setShowModal(false);
//   useEffect(() => {}, [menu]);
//   return (
//     <Container fluid className="m-0 p-0">
//       {menu.length > 0 && (
//         <h1
//           style={{ backgroundColor: "aliceblue", borderRadius: "12px" }}
//           className="m-0 mt-5 text-center"
//           id={`${menu[0].ward.id.toString()}`}
//         >
//           {menu[0].ward.name}
//         </h1>
//       )}
//       {menu.length > 0 &&
//         menu.map((dish, i) => {
//            const isHellaHop = dish.name === "Hella Hop";
//           if (i + 1 < menu.length) {
//             const nextDish = menu[i + 1];
//             if (dish.ward.id === nextDish.ward.id) {
//               return dish.stock <= 4 ? (
//                 dish.stock !== 0 ? (
//                   <DishMinusFour key={dish.id} dish={dish} />
//                 ) : (
//                   <DishWornOut key={dish.id} dish={dish} />
//                 )
//               ) : (
//                 <DishUpFour key={dish.id} dish={dish} />
//               );
//             } else {
//               return dish.stock <= 4 ? (
//                 dish.stock !== 0 ? (
//                   <Container fluid className="m-0 p-0" key={dish.id}>
//                     <DishMinusFour dish={dish} />
//                     <h1
//                       style={{
//                         backgroundColor: "aliceblue",
//                         borderRadius: "12px",
//                       }}
//                       className="m-0 mt-5 text-center"
//                       id={`${menu[i + 1].ward.id.toString()}`}
//                     >
//                       {menu[i + 1].ward.name}
//                     </h1>
//                   </Container>
//                 ) : (
//                   <Container fluid className="m-0 p-0" key={dish.id}>
//                     <DishWornOut dish={dish} />
//                     <h1
//                       style={{
//                         backgroundColor: "aliceblue",
//                         borderRadius: "12px",
//                       }}
//                       className="m-0 mt-5 text-center"
//                       id={`${menu[i + 1].ward.id.toString()}`}
//                     >
//                       {menu[i + 1].ward.name}
//                     </h1>
//                   </Container>
//                 )
//               ) : (
//                 <Container fluid className="m-0 p-0" key={dish.id}>
//                   <DishUpFour dish={dish} />
//                   <h1
//                     style={{
//                       backgroundColor: "aliceblue",
//                       borderRadius: "12px",
//                     }}
//                     className="m-0 mt-5 text-center"
//                     id={`${menu[i + 1].ward.id.toString()}`}
//                   >
//                     {menu[i + 1].ward.name}
//                   </h1>
//                 </Container>
//               );
//             }
//           }
//           //Ultimo elemento, qui si parte sempre da 0, non so se id bobak partono da 0 o 1.
//           return menu[menu.length - 1].stock <= 4 ? (
//             menu[menu.length - 1].stock !== 0 ? (
//               <DishMinusFour key={dish.id} dish={menu[menu.length - 1]} />
//             ) : (
//               <DishWornOut key={dish.id} dish={menu[menu.length - 1]} />
//             )
//           ) : (
//             <DishUpFour key={dish.id} dish={menu[menu.length - 1]} />
//           );
//         })}
//     </Container>
//   );
// };
// export default Dishes;

import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import DishUpFour from "../dish-condition/DishUpFour";
import DishMinusFour from "../dish-condition/DishMinusFour";
import DishWornOut from "../dish-condition/DishWornOut";
import HellaHopModal from "../modals/HellaHopModal";

const Dishes = () => {
  const menu = useSelector((state) => state.menu.menu);
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {}, [menu]);

  return (
    <Container fluid className="m-0 p-0">
      {menu.length > 0 && (
        <h1
          style={{ backgroundColor: "aliceblue", borderRadius: "12px" }}
          className="m-0 mt-5 text-center"
          id={`${menu[0].ward.id.toString()}`}
        >
          {menu[0].ward.name}
        </h1>
      )}
      {menu.length > 0 &&
        menu.map((dish, i) => {
          const isHellaHop = dish.name.includes("Hella Hop");
          if (i + 1 < menu.length) {
            const nextDish = menu[i + 1];
            if (dish.ward.id === nextDish.ward.id) {
              return dish.stock <= 4 ? (
                dish.stock !== 0 ? (
                  <DishMinusFour key={dish.id} dish={dish} />
                ) : (
                  <DishWornOut key={dish.id} dish={dish} />
                )
              ) : (
                <DishUpFour key={dish.id} dish={dish} />
              );
            } else {
              return dish.stock <= 4 ? (
                dish.stock !== 0 ? (
                  <Container fluid className="m-0 p-0" key={dish.id}>
                    <DishMinusFour dish={dish} />
                    <h1
                      style={{
                        backgroundColor: "aliceblue",
                        borderRadius: "12px",
                        cursor: isHellaHop ? "pointer" : "default",
                      }}
                      className="m-0 mt-5 text-center"
                      id={`${menu[i + 1].ward.id.toString()}`}
                      onClick={isHellaHop ? handleShow : undefined}
                    >
                      {menu[i + 1].ward.name}
                    </h1>
                  </Container>
                ) : (
                  <Container fluid className="m-0 p-0" key={dish.id}>
                    <DishWornOut dish={dish} />
                    <h1
                      style={{
                        backgroundColor: "aliceblue",
                        borderRadius: "12px",
                        cursor: isHellaHop ? "pointer" : "default",
                      }}
                      className="m-0 mt-5 text-center"
                      id={`${menu[i + 1].ward.id.toString()}`}
                      onClick={isHellaHop ? handleShow : undefined}
                    >
                      {menu[i + 1].ward.name}
                    </h1>
                  </Container>
                )
              ) : (
                <Container fluid className="m-0 p-0" key={dish.id}>
                  <DishUpFour dish={dish} />
                  <h1
                    style={{
                      backgroundColor: "aliceblue",
                      borderRadius: "12px",
                      cursor: isHellaHop ? "pointer" : "default",
                    }}
                    className="m-0 mt-5 text-center"
                    id={`${menu[i + 1].ward.id.toString()}`}
                    onClick={isHellaHop ? handleShow : undefined}
                  >
                    {menu[i + 1].ward.name}
                  </h1>
                </Container>
              );
            }
          }
          // Last element
          return menu[menu.length - 1].stock <= 4 ? (
            menu[menu.length - 1].stock !== 0 ? (
              <DishMinusFour key={dish.id} dish={menu[menu.length - 1]} />
            ) : (
              <DishWornOut key={dish.id} dish={menu[menu.length - 1]} />
            )
          ) : (
            <DishUpFour key={dish.id} dish={menu[menu.length - 1]} />
          );
        })}
      {showModal && (
        <HellaHopModal show={showModal} handleClose={handleClose} />
      )}
    </Container>
  );
};

export default Dishes;
