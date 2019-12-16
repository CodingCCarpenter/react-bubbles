import React, { useState, useEffect } from "react";

import axiosWithAuth from '../auth/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  axiosWithAuth()
  .get('/colors')
  .then((res) => {
    // set that data to the colorList state property
    setColorList(res.data);
  })
  .catch((err) => {
    console.log(
      'src/compontnts/BubblePage.js: BubblePage: axiosWithAuth: .catch ERROR: ',
      err
    )
  })
  

  return (
    <div>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </div>
  );
};

export default BubblePage;
