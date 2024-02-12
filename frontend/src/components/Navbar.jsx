import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, Image, NavbarMenu, NavbarMenuItem } from "@nextui-org/react"
import { useConnect } from '@metamask/sdk-react-ui';
import { AcmeLogo } from "../assets/AcmeLogo.jsx"
import Metamask from "../assets/MetamaskLogo.svg"
import { useState } from "react";

export default function NavbarComponent() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { connect } = useConnect();

    const handleConnectWallet = async () => {
        try {
            await connect();
        } catch (error) {
            console.error('Error connecting to MetaMask:', error);
        }
    };
    const menuItems = [
        "Communities",
        "Polls",
        "Profile"
    ];

    const routes = [
        '/communities',
        '/polls',
        '/profile',
    ]

    return (
        <Navbar
            isBordered
            isMenuOpen={isMenuOpen}
            onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">Zk-Gas</p>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>
                    <AcmeLogo />
                    <p className="font-bold text-inherit">Zk-Gas</p>
                </NavbarBrand>

                <NavbarItem isActive>
                    <Link href="/communities" aria-current="page">
                        Communities
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link color="foreground" href="/polls">
                        Polls
                    </Link>
                </NavbarItem>

                <NavbarItem>
                    <Link color="foreground" href="/profile">
                        Profile
                    </Link>
                </NavbarItem>

            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button onClick={handleConnectWallet} as={Link} color="primary" variant="flat">
                        <Image
                            src={Metamask}
                            alt="Metamask Logo"
                            width={25}
                        /> Connect wallet
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <Link
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            href={routes[index]}
                            size="lg"
                        >
                            {item}
                        </Link>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    )
}