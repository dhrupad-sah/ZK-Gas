import { useMetaMask } from "../../hooks/useMetamask";
import Comments from "./Comments";

export default function Profile(){
    const { wallet } = useMetaMask();
    console.log(wallet.accounts[0]);
    return(
        <div>
            {/* The below component will be rendered only for the user  */}
            <Comments/>
        </div>
    )
}