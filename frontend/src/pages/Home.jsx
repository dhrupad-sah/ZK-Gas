import { useEffect, useRef } from "react";
import { Button, Image } from "@nextui-org/react";
import BackgroundImage1 from "./Home/3.png";
import Anonymous from "../assets/anonymous.png";
import "./styles/Home.css";
import Atropos from "atropos/react";

export default function Home() {
  return (
    <div className="pt-28">
      <h1 className="text-[73px] grad text-center" style={{ fontFamily: "Poppins, sans-serif" }}>
        Empower Identity, Protect Privacy
      </h1>
      <h1 className="text-[73px] grad text-center" style={{ fontFamily: "Poppins, sans-serif" }}>Build Communities</h1>
      <div className="flex justify-center gap-[200px] p-10">
        <Button
          radius="full"
          variant="bordered"
          className="w-[15rem] h-[4rem] px-15 font-semibold border-[#D94FD5]"
        >
          <span className="text-white text-[20px] text-grad ">
            Create Community
          </span>
        </Button>
        <Button
          radius="full"
          variant="bordered"
          className="w-[15rem] h-[4rem] text-[20px] font-semibold border-[#D94FD5]"
        >
          <span className="text-grad-rev">Create Poll</span>
        </Button>
      </div>
      <div className="flex gap-[900px] pt-56">
        <div>sup nigga</div>
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
