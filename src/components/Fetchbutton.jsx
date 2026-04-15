"use client";

import { useState } from "react";


export default function Fetchbutton({ onFetch }) {
  return <button onClick={onFetch}>Fetch Data</button>;
}

