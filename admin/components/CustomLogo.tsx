/** @jsxRuntime classic */
/** @jsx jsx */
import Link from "next/link";
import Image from "next/image";
import { jsx, H3 } from "@keystone-ui/core";
const TridentPng = require("../assets/tridente.png");

export const CustomLogo = () => {
  return (
    <H3>
      <Link href="/" passHref>
          
          <a
            css={{
              // TODO: we don't have colors in our design-system for this.
              backgroundImage: `linear-gradient(to right, #0ea5e9, #6366f1)`,
              backgroundClip: "text",
              lineHeight: "1.75rem",
              color: "transparent",
              verticalAlign: "middle",
              transition: "color 0.3s ease",
              textDecoration: "none", 
              display: "flex", 
              alignItems: "center",
            }}
          >
            <Image src={TridentPng} height={40} width={40}/>
            <span css={{marginLeft: 10}}>Poseidón CMMS</span>
          </a>
      </Link>
    </H3>
  );
};
