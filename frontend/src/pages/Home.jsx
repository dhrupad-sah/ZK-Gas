import { Image, Divider, Card, CardHeader, CardBody, CardFooter, Link } from "@nextui-org/react";
import AnonymousGhost from "../assets/anonymous.png";
import "./styles/Home.css"

export default function Home() {
    return (
        <div className="mt-10"> 
            <div className="flex justify-evenly">
                <div className="flex items-center text-7xl fontface">Anonymous</div>
                <Image
                    width={400}
                    alt="Anonymous Ghost"
                    src={AnonymousGhost}
                />
                <div className="flex items-center text-7xl fontface">Secure</div>
            </div>
            <div className="flex justify-center">
                <Divider className="w-11/12 my-10" />
            </div>
            <div className="flex justify-center w-100 fontface text-4xl mt-10">
                ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
            </div>
            <Link
                isExternal
                showAnchorIcon
                href="https://github.com/dhrupad-sah/ZK-Gas"
                className="flex justify-center mt-20 text-xl"
            >
                GitHub       
            </Link>
        </div>
    )
}