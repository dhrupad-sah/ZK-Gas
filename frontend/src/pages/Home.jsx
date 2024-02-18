import { useEffect, useRef } from "react";
import { Button, Image } from "@nextui-org/react";
import styled from "styled-components";
import Anonymous from "../assets/anonymous.png";
import AztecLogo from "../assets/aztec.png";
import SolidityLogo from "../assets/SolidityLogo.svg";
import MetamaskLogo from "../assets/MetamaskLogo.svg";
import "./styles/Home.css";
import Atropos from "atropos/react";
import AnimatedHeading from '../components/AnimatedHeading';

export default function Home() {

    const lines_1 = ["Empower Identity, Protect Privacy Build Communities"];

  return (
    <div className="pt-28">
        <div style={{minHeight: '7rem', display: 'flex', width: '75%'}} >  
            <h1 className="text-[73px] grad text-center">
                <AnimatedHeading lines={lines_1} />
            </h1>
        </div>
        {/* <div style={{minHeight: '7rem'}}>
        <h1 className="text-[73px] grad text-center">
        <AnimatedHeading lines={lines_2} />
        </h1>
        </div> */}
      
      <div className="flex justify-center gap-[200px] p-10">
        <Button
          radius="full"
          variant="bordered"
          className="w-[15rem] h-[4rem] px-15 font-semibold border-[#D94FD5]"
          >
          <span className="text-[20px] text-[#ECBFBF]">
            Create Community
          </span>
        </Button>
        <Button
          radius="full"
          variant="bordered"
          className="w-[15rem] h-[4rem] text-[20px] font-semibold border-[#D94FD5]"
          >
          <span className="text-[#ECBFBF]">Create Poll</span>
        </Button>
      </div>
      {/* <div> */}
      {/* <div className="text-6xl text-white font-semibold text-center pt-48">
          Partners
        </div>
        <div className="flex">
          <Image
            isBlurred
            style={{ width: "100%", height: "10%" }}
            alt="Home Image"
            src={MetamaskLogo}
          />
          <Image
            isBlurred
            style={{ width: "100%", height: "10%" }}
            alt="Home Image"
            src={AztecLogo}
          />
          <Image
            isBlurred
            style={{ width: "100%", height: "10%" }}
            alt="Home Image"
            src={SolidityLogo}
          />
        </div>
      </div> */}
      
      <div className="flex justify-between pt-56">
        <div className="flex-col text-7xl text-[#cac7d0] ml-10">
          <h1 className="pb-2">Privacy First Blockchain Based</h1>
          <h1>Social Media Application</h1>
          <p className="text-2xl">
            <br />
            Validation of your information using zero knowledge,
          </p>
          <p className="text-2xl">
            giving you complete privacy
          </p>
        </div>
        <Atropos className="my-atropos" shadow={false} highlight={false}>
          <Image
            isBlurred
            style={{ width: "90%", height: "100%" }}
            alt="Home Image"
            src={Anonymous}
          />
        </Atropos>
      </div>
    </div>
  );
}
