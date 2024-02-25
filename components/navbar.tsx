import {
	Link,
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	Button,
  } from "@nextui-org/react";
  import React from "react";
  import { link as linkStyles } from "@nextui-org/theme";
  
  import { siteConfig } from "@/config/site";
  import NextLink from "next/link";
  import clsx from "clsx";
  
  import { ThemeSwitch } from "@/components/theme-switch";
  
  import { Logo } from "@/components/icons";
  
  export const Navbar = () => {
	return (
	  <NextUINavbar maxWidth="xl" position="sticky">
		<NavbarContent className="basis-1/2 sm:basis-full" justify="start">
		  <NavbarBrand className="gap-3 max-w-fit">
			<NextLink className="flex justify-start items-center gap-1" href="/">
			  <Logo />
			  <p className="font-bold text-inherit">QuizHUB</p>
			</NextLink>
		  </NavbarBrand>
		  <div className="hidden lg:flex gap-4 justify-start ml-2">
			{siteConfig.navItems.map((item) => (
			  <NavbarItem key={item.href}>
				<NextLink
				  className={clsx(
					linkStyles({ color: "foreground" }),
					"data-[active=true]:text-primary data-[active=true]:font-medium"
				  )}
				  color="foreground"
				  href={item.href}>
				  {item.label}
				</NextLink>
			  </NavbarItem>
			))}
		  </div>
		</NavbarContent>
  
		<NavbarContent
		  className="hidden sm:flex basis-1/2 sm:basis-full"
		  justify="end">
		  <NavbarItem className="hidden sm:flex gap-4">
			<NextLink href="/auth/login" passHref>
			  <Button color="primary" variant="bordered">
				Login
			  </Button>
			</NextLink>
			<NextLink href="/auth/signup" passHref>
			  <Button color="primary" variant="bordered">
				Sign Up
			  </Button>
			</NextLink>
			<ThemeSwitch />
		  </NavbarItem>
		</NavbarContent>
  
		<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
		  <ThemeSwitch />
		  <NavbarMenuToggle />
		</NavbarContent>
  
		<NavbarMenu>
		  <div className="flex flex-col justify-between items-center w-full gap-2">
			{siteConfig.navItems.map((item) => (
			  <NavbarItem className="w-full" key={item.href}>
				<NextLink
				  className="flex items-center justify-center text-lg w-full border-gray-300 border-2 px-4 my-2"
				  href={item.href}>
				  {item.label}
				</NextLink>
			  </NavbarItem>
			))}
		  </div>
		  <NavbarItem className="flex flex-col gap-4">
			<NextLink href="/auth/login" passHref>
			  <Button className="w-full" color="primary" variant="bordered">
				Login
			  </Button>
			</NextLink>
			<NextLink href="/auth/signup" passHref>
			  <Button className="w-full" color="primary" variant="bordered">
				Sign Up
			  </Button>
			</NextLink>
		  </NavbarItem>
		</NavbarMenu>
	  </NextUINavbar>
	);
  };
  