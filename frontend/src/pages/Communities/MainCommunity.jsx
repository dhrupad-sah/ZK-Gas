import CommunityCard from "../../components/CommunityCard"

export default function MainCommunity() {
    const communities = [
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Anime Society",
            communityDescription: "A place for anime enthusiasts to hang out and connect with each other!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
        {
            communityName: "Blockchain Society",
            communityDescription: "GM! Welcome to the haven for web3 and crypto!",
            communityId: ""
        },
    ]

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {communities.map((community, index) => (
                    <div key={index}>
                        <CommunityCard community={community} />
                    </div>
                ))}
            </div>
        </div>
    );
}