"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 24 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.22, 1, 0.36, 1] as const,
		},
	},
};

/**
 * Props for the HeroSection component.
 * @public
 */
export interface HeroSectionProps {
	/** Main headline text */
	title: string;
	/** Subtitle text (eyebrow / location) */
	subtitle?: string;
	/** Description paragraph text */
	description?: string;
	/** Primary call-to-action button configuration */
	primaryAction?: {
		label: string;
		href: string;
		showArrow?: boolean;
	};
	/** Secondary call-to-action button configuration */
	secondaryAction?: {
		label: string;
		href: string;
	};
	/** Background photograph */
	imageSrc?: string;
	className?: string;
}

/**
 * Full-bleed brand hero for Jardim — a forest-green photographic banner with
 * the white wordmark, tagline and calls to action.
 */
export function HeroSection({
	title,
	subtitle,
	description,
	primaryAction,
	secondaryAction,
	imageSrc = "/images/events/venue-interior-01-window-nook-paintings.jpeg",
	className,
}: HeroSectionProps) {
	return (
		<section
			className={`relative flex min-h-[88vh] items-center overflow-hidden ${className || ""}`}
		>
			{/* Photograph */}
			<Image
				src={imageSrc}
				alt=""
				fill
				priority
				className="object-cover"
				sizes="100vw"
			/>
			{/* Brand-green wash for contrast + warmth */}
			<div
				className="absolute inset-0"
				style={{
					background:
						"linear-gradient(180deg, hsl(var(--brand-green) / 0.72) 0%, hsl(var(--brand-green) / 0.80) 55%, hsl(var(--brand-green) / 0.92) 100%)",
				}}
			/>

			<div className="container relative z-10 px-4 py-24">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="mx-auto max-w-3xl text-center"
				>
					<motion.div variants={itemVariants} className="flex justify-center">
						<Logo
							variant="white"
							height={128}
							priority
							className="h-24 w-auto mix-blend-screen sm:h-32 md:h-40"
						/>
					</motion.div>

					{subtitle && (
						<motion.p
							variants={itemVariants}
							className="mt-6 text-sm font-semibold uppercase tracking-[0.32em] text-brand-cream/90"
						>
							{subtitle}
						</motion.p>
					)}

					<motion.h1
						variants={itemVariants}
						className="mt-5 font-display text-3xl font-semibold leading-tight text-brand-cream sm:text-4xl md:text-5xl"
					>
						{title}
					</motion.h1>

					{description && (
						<motion.p
							variants={itemVariants}
							className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-brand-cream/85"
						>
							{description}
						</motion.p>
					)}

					{(primaryAction || secondaryAction) && (
						<motion.div
							variants={itemVariants}
							className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
						>
							{primaryAction && (
								<Button size="lg" variant="secondary" asChild>
									<Link href={primaryAction.href}>
										{primaryAction.label}
										{primaryAction.showArrow && (
											<ArrowRight className="ml-2 h-4 w-4" />
										)}
									</Link>
								</Button>
							)}
							{secondaryAction && (
								<Button
									size="lg"
									variant="outline"
									className="border-brand-cream/40 bg-transparent text-brand-cream hover:bg-brand-cream hover:text-primary"
									asChild
								>
									<Link href={secondaryAction.href}>
										{secondaryAction.label}
									</Link>
								</Button>
							)}
						</motion.div>
					)}
				</motion.div>
			</div>
		</section>
	);
}
