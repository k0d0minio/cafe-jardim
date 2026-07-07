"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function Header() {
	const t = useTranslations("header");
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const navItems = [
		{ href: "/#menu", label: t("menu") },
		{ href: "/#gallery", label: t("gallery") },
		{ href: "/catering", label: t("catering") },
		{ href: "/events", label: t("events") },
		{ href: "/#contact", label: t("contact") },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
			<nav className="container flex h-20 items-center justify-between px-4">
				<Link
					href="/"
					className="flex items-center"
					aria-label={`Jardim — ${t("home")}`}
				>
					<Logo variant="green" height={40} priority />
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex md:items-center md:space-x-7">
					{navItems.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className="text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
						>
							{item.label}
						</Link>
					))}
					<Button size="sm" asChild>
						<Link href="/#contact">{t("visitUs")}</Link>
					</Button>
				</div>

				{/* Mobile Menu Button */}
				<Button
					variant="ghost"
					size="icon"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
					aria-label={mobileMenuOpen ? t("closeMenu") : t("openMenu")}
					aria-expanded={mobileMenuOpen}
					aria-controls="mobile-navigation"
				>
					{mobileMenuOpen ? (
						<X className="h-6 w-6" aria-hidden="true" />
					) : (
						<Menu className="h-6 w-6" aria-hidden="true" />
					)}
				</Button>
			</nav>

			{/* Mobile Navigation */}
			<AnimatePresence>
				{mobileMenuOpen && (
					<motion.div
						id="mobile-navigation"
						role="menu"
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.2 }}
						className="border-t md:hidden"
					>
						<div className="container space-y-2 px-4 py-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									role="menuitem"
									className="block py-2 text-sm font-medium text-foreground/70 transition-colors hover:text-primary"
									onClick={() => setMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
							<Button className="w-full mt-4" size="sm" asChild>
								<Link href="/#contact" onClick={() => setMobileMenuOpen(false)}>
									{t("visitUs")}
								</Link>
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</header>
	);
}
