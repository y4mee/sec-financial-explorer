"use client";

import { useState } from "react";
import { fetchdata } from '../utils/fetchdata'

const Fetchbutton = () => {
  return (
    <div>
      <button onClick={fetchdata}>Fetch Data</button>
    </div>
  )
}

export default Fetchbutton
