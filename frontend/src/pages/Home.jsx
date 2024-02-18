import { useEffect, useRef } from "react";
import { Button, Image, Link } from "@nextui-org/react";
import BackgroundImage1 from "./Home/3.png";
import Anonymous from "../assets/anonymous.png";
import AztecLogo from "../assets/aztec.png";
import SolidityLogo from "../assets/SolidityLogo.svg";
import MetamaskLogo from "../assets/MetamaskLogo.svg";
import "./styles/Home.css";
import Atropos from "atropos/react";
import AnimatedHeading from '../components/AnimatedHeading';

export default function Home() {

  const lines_1 = ["Protect Privacy, Build Communities"];

  return (
    <div className="flex-col" style={{ minHeight: '200vh', background: 'linear-gradient(to bottom, #1b1521, #47193d)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8rem', minHeight: '80vh', paddingTop: '8rem' }}>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '7rem' }}>
          <div style={{ width: '75%' }}>
            <h1 className="text-[73px] grad">
              <AnimatedHeading lines={lines_1} />
            </h1>
          </div>
        </div>
        <div className="flex justify-center gap-28">
          <Button
            radius="full"
            variant="bordered"
            className="w-[15rem] h-[4rem] px-15 font-semibold border-[#D94FD5]"
            as={Link}
            href="/communities"
          >
            <span className="text-[20px] text-[#ECBFBF]">
              Show Communities
            </span>
          </Button>
          <Button
            radius="full"
            variant="bordered"
            className="w-[15rem] h-[4rem] text-[20px] font-semibold border-[#D94FD5]"
            as={Link}
            href="/polls"
          >
            <span className="text-[#ECBFBF]">Show Polls</span>
          </Button>
        </div>
      </div>
      <div className="">
        <div className="flex justify-between pt-56">
          <div className="flex-col text-6xl text-[#cac7d0] ml-10">
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
    </div>
  );
}
