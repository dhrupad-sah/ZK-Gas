import { useLocation } from "react-router-dom";

export default function WallForm() {
    const location = useLocation();
    const route = location.pathname;

    return (
        <div>
            <h3>This is a Form component of the Wall for the user {route}</h3>
        </div>
    )
}