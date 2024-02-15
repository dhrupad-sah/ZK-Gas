import { useMetaMask } from "../../hooks/useMetamask";
import Comments from "./Comments";
import Avatar from "../../assets/user_example_avatar.png"
import { Image, Divider, Button, Modal, Input } from "@nextui-org/react"
import "../../hooks/useMetamask";

export default function Profile() {
    const { wallet } = useMetaMask();

    return (
        <div className="container" style={{ display: "flex", flexDirection: "column", padding: "20px" }}>
            <div className="profiler" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div className="userImage" style={{ borderRadius: "50%", overflow: "hidden", marginRight: "10px" }}>
                    <Image src={Avatar} alt="User Profile" width={150} height={150} style={{ maxWidth: '100%' }} />
                </div>
                <div className="fine" style={{ flex: "1", display: "flex", flexDirection: "column" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
                        <p className="flex items-center font-bold text-left">{wallet.accounts[0]}</p>
                        <Button color="primary" style={{ textAlign: "right", marginBottom: "10px" }}>Share Profile</Button>
                    </div>
                    <Divider style={{ borderTop: "2px solid #9e9d9d", width: "100%" }} />
                </div>
            </div>

            <Comments />
        </div>
    )
}
