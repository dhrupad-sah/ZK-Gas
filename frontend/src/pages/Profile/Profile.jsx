import { useMetaMask } from "../../hooks/useMetamask";
import Comments from "./Comments";
import Avatar from "../../assets/user_example_avatar.png"
import { Image, Divider } from "@nextui-org/react"
import { useAuth } from '../../context/auth.js'
import "../../hooks/useMetamask";
export default function Profile() {

    const { wallet } = useMetaMask();

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            <div className="profiler" style={{ display: "flex", alignItems: "center" }}>
                <div className="userImage" style={{ borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
                    <Image src={Avatar} alt="User Profile" width={150} height={150} style={{ maxWidth: '100%' }} />
                </div>
                <div style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <p style={{ marginBottom: "5px", fontWeight: "bold" }}>{wallet.accounts[0]}</p>
                    <Divider style={{ borderTop: "2px solid #9e9d9d", width: "100%" }} />
                </div>
            </div>
            <Comments />
        </div>
    )
}
