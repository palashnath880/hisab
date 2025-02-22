import { Typography } from "@mui/material";
import React from "react";

export default function Footer() {
  return (
    <div className="py-3 border-t-2 flex items-center justify-center">
      <Typography>
        Develop By{" "}
        <a
          target="_blank"
          href="https://palashnath.netlify.app"
          className="font-medium underline"
        >
          Palash Nath
        </a>
      </Typography>
    </div>
  );
}
