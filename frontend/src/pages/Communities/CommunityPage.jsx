import { useLocation } from "react-router-dom";

export default function CommunityPage({ community }) {
    const location = useLocation();
    const route = location.pathname;
    return (
        <>
            <h1>Community Page: {route}</h1>
        </>
    )
}