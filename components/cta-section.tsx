"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * Props for the CTASection component.
 * @public
 */
export interface CTASectionProps {
	/** Section title */
	title?: string;
	/** Section description */
	description?: string;
	/** Primary call-to-action button configuration */
	primaryAction?: {
		/** Button label */
		label: string;
		/** Button link href */
		href: string;
		/** Show arrow icon */
		showArrow?: boolean;
	};
	/** Secondary call-to-action button configuration */
	secondaryAction?: {
		/** Button label */
		label: string;
		/** Button link href */
		href: string;
		/** Open in new tab */
		external?: boolean;
	};
	/** Additional CSS classes */
	className?: string;
}

/**
 * Call-to-action section component with customizable content and buttons.
 *
 * Displays a prominent CTA section with title, description, and action buttons.
 * Includes smooth scroll-triggered animations.
 *
 * @param props - CTASection configuration props
 * @returns A CTA section React component
 *
 * @example
 * ```tsx
 * <CTASection
 *   title="Ready to Get Started?"
 *   description="Join thousands of happy customers"
 *   primaryAction={{ label: "Sign Up", href: "/signup", showArrow: true }}
 *   secondaryAction={{ label: "Learn More", href: "/about" }}
 * />
 * ```
 */
export function CTASection({
	title,
	description,
	primaryAction,
	secondaryAction,
	className,
}: CTASectionProps) {
	return (
		<section className={`py-20 md:py-28 ${className || ""}`}>
			<div className="container px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-primary p-10 text-center text-brand-cream md:p-16"
				>
					{/* Botanical wordmark watermark */}
					<div
						className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 bg-contain bg-top-right bg-no-repeat opacity-10"
						style={{
							backgroundImage:
								"url(/images/brand/logos/png/jardim-logo-botanical-cream.png)",
						}}
					/>
					<h2 className="relative text-3xl font-semibold tracking-tight text-brand-cream sm:text-4xl md:text-5xl">
						{title}
					</h2>
					<p className="relative mx-auto mt-4 max-w-2xl text-lg text-brand-cream/80">
						{description}
					</p>
					{(primaryAction || secondaryAction) && (
						<div className="relative mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
									<Link
										href={secondaryAction.href}
										target={secondaryAction.external ? "_blank" : undefined}
										rel={
											secondaryAction.external
												? "noopener noreferrer"
												: undefined
										}
									>
										{secondaryAction.label}
									</Link>
								</Button>
							)}
						</div>
					)}
				</motion.div>
			</div>
		</section>
	);
}
