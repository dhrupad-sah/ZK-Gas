import Comments from "./Comments";

export default function Profile(){
    return(
        <div>
            {/* The below component will be rendered only for the user  */}
            <Comments/>
        </div>
    )
}