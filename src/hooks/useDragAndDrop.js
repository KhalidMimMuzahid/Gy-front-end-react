// import React, { useEffect } from "react";

const useDragAndDrop = () => {
    const dragElement = (element, dragzone) => {
      // let pos1 = 0,
      //   // pos2 = 0,
      //   pos3 = 0
        // pos4 = 0;
      // const dragMouseUp = () => {
      //   document.onmouseup = null;
      //   document.onmousemove = null;
      //   element.classList.remove("drag");
      // };
      // const dragMouseMove = (event) => {
      //   event.preventDefault();
      //   pos1 = pos3 - event.clientX;
      //   // pos2 = pos4 - event.clientY;
      //   pos3 = event.clientX;
      //   // pos4 = event.clientY;
      //   // element.style.top = `${element.offsetTop - pos2}px`;
      //   element.style.left = `${element.offsetLeft - pos1}px`;
      // };
      // const dragMouseDown = (event) => {
      //   event.preventDefault();
      //   pos3 = event.clientX;
      //   // pos4 = event.clientY;
      //   element.classList.add("drag");
      //   document.onmouseup = dragMouseUp;
      //   document.onmousemove = dragMouseMove;
      // };
      // dragzone.onmousedown = dragMouseDown;
    };
    return {dragElement};
};

export default useDragAndDrop;
