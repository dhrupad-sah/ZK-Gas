import { Image } from "@nextui-org/react";
import AnonymousGhost from "../assets/anonymous.png";

export default function Home() {
    return (
        <div>
            <div className="flex justify-around">
                <div style={{ fontFamily: "Archivo" }}>Hey man</div>
                <Image
                    width={400}
                    alt="Anonymous Ghost"
                    src={AnonymousGhost}
                />
                <div>Hey man</div>
            </div>
        </div>
    )
}