import { useEffect, useRef } from "react";
import { Image, Divider, Link } from "@nextui-org/react";
import styled from "styled-components";
import AnonymousGhost from "../assets/anonymous.png";
import BackgroundImage1 from "./Home/1.png"; // Import your first background image
import BackgroundImage2 from "./Home/2.png";
import "./styles/Home.css";

const Container = styled.div`
  position: relative;
  height: 2234px;
  width: 100%;
  background-image: url(${BackgroundImage1}) no-repeat; /* Set the initial background image */
  background-size: contain;
  background-position: center top, center bottom;
  overflow: ;
`;

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  text-align: center;
  color: #ffffff;
  margin: 0;
`;

const StyledImage = styled(Image)`
  width: 400px;
`;

export default function Home() {
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const contentHeight = contentRef.current.clientHeight;
      const scrollPosition = window.scrollY; // Use window.scrollY instead of deprecated pageYOffset

      if (scrollPosition > contentHeight / 2) {
        document.body.style.backgroundImage = `url(${BackgroundImage2})`; // Change background image when scrolling
      } else {
        document.body.style.backgroundImage = `url(${BackgroundImage1})`; // Revert to initial background image
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Container>
      <Content ref={contentRef}>
        <div className="flex justify-evenly">
          <div className="flex items-center text-7xl fontface">Anonymous</div>
          {/* <StyledImage
            width={400}
            alt="Anonymous Ghost"
            src={AnonymousGhost}
          /> */}
          <div className="flex items-center text-7xl fontface">Secure</div>
        </div>
        <div className="flex justify-center">
          <Divider className="w-11/12 my-10" />
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        <div className="flex justify-center w-100 fontface text-4xl mt-10">
          ZK-Gas: Whisper compliments, fuel connections. Anonymous & secure with Noir & zk-proofs.
        </div>
        {/* <Link
          isExternal
          showAnchorIcon
          href="https://github.com/dhrupad-sah/ZK-Gas"
          className="flex justify-center mt-20 text-xl"
        >
          GitHub       
        </Link> */}
      </Content>
    </Container>
  );
}


