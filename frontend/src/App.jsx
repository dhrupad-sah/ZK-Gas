import NavbarComponent from "./components/Navbar"
import MainPoll from "./pages/Polls/MainPoll"
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import MainCommunity from "./pages/Communities/MainCommunity";


const Container = styled.div`
  padding: 0;
  margin: 0;
`

export default function App() {
  return (
    <Container>
      <BrowserRouter>
        <NavbarComponent />
        <main>
          <Routes>
            <Route path = "/">
              <Route path = "" element={<Home />}></Route>
              <Route path = "/polls" element={<MainPoll />}></Route>
              <Route path = "/communities" element={<MainCommunity />}></Route>
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </Container>
  )
}
