import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, NavbarMenuToggle, Image, NavbarMenu, NavbarMenuItem } from "@nextui-org/react"
import { AcmeLogo } from "./assets/AcmeLogo"
import Metamask from "./assets/MetamaskLogo.svg"
import { useState } from "react";
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ZK-Gas</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">ZK-Gas</p>
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
          <Button as={Link} color="primary" href="#" variant="flat">
            <Image
              src={Metamask}
              alt="Metamask Logo"
              width={25}
            /> Connect to Metamask
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

export default App
