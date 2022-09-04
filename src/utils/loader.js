// import React from "react";
// import {Spin} from "antd";
// import styled from "styled-components";
// import {Icon} from "../components/ui";
//
// export const antIcon = (
//     <Icon icon="loading"
//           className="spin-version-icon"
//           spin/>
// );
//
// export const spinLoader = (message) => {
//     return (
//         <ContainerSpinLoader type="relative">
//             <Spin
//                 indicator={antIcon}
//                 tip={message}
//                 spinning={true}
//                 className="spin-version"
//             />
//         </ContainerSpinLoader>
//     );
// };
//
// export const spinLoaderFixed = (message) => {
//     return (
//         <ContainerSpinLoader type="fixed">
//             <Spin
//                 indicator={antIcon}
//                 tip={message}
//                 spinning={true}
//                 className="spin-version"
//             />
//         </ContainerSpinLoader>
//     );
// };
//
// const ContainerSpinLoader = styled.div`
//   width: ${({type}) => (type === "fixed" ? "100%" : "100vw")};
//   height: ${({type}) => (type === "fixed" ? "100%" : "100vw")};
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   position: ${({type}) => type};
//
//   .spin-version-icon {
//     font-size: 4rem;
//   }
// `;
