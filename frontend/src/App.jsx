import NavbarComponent from "./components/Navbar"
import MainPoll from "./pages/Polls/MainPoll"
import styled from 'styled-components';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { MetaMaskContextProvider, useMetaMask } from "./hooks/useMetamask";
import Home from "./pages/Home";
import MainCommunity from "./pages/Communities/MainCommunity";
import CommunityPage from "./pages/Communities/CommunityPage"; // Import the CommunityPage component
import Profile from "./pages/Profile/Profile";

const Container = styled.div`
  padding: 0;
  margin: 0;
`

export default function App() {

  return (
    <MetaMaskContextProvider>
      <Container>
        <BrowserRouter>
          <NavbarComponent />
          <main>
            <Routes>
              <Route path="/">
                <Route index element={<Home />} /> {/* Use `index` for the default route */}
                <Route path="polls" element={<MainPoll />} />
                <Route path="communities" element={<MainCommunity />} />
                <Route path="communities/:communityId" element={<CommunityPage />} /> {/* Dynamic route */}
                <Route path="profile" element={<Profile />} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </Container>
    </MetaMaskContextProvider>
  )
}
