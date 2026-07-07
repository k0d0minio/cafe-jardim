"use client";

import { motion } from "framer-motion";
import {
	Coffee,
	type LucideIcon,
	Palette,
	Sprout,
	UtensilsCrossed,
} from "lucide-react";
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

// Icon mapping for server-to-client component compatibility
const iconMap: Record<string, LucideIcon> = {
	coffee: Coffee,
	food: UtensilsCrossed,
	art: Palette,
	garden: Sprout,
};

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
		},
	},
};

/**
 * A single feature item in the feature grid.
 * @public
 */
export interface FeatureItem {
	/** Icon name (e.g., "zap", "shield", "code", "rocket") - must be a key in iconMap */
	icon: string;
	/** Feature title */
	title: string;
	/** Feature description */
	description: string;
}

/**
 * Props for the FeatureGrid component.
 * @public
 */
export interface FeatureGridProps {
	/** Small uppercase label above the title */
	eyebrow?: string;
	/** Section title */
	title?: string;
	/** Section description */
	description?: string;
	/** Array of features to display */
	features?: FeatureItem[];
	/** Section ID for anchor links */
	id?: string;
	/** Additional CSS classes */
	className?: string;
}

/**
 * Feature grid component displaying a collection of features with icons and descriptions.
 *
 * Displays a grid of feature cards with smooth scroll-triggered animations.
 * Each feature includes an icon, title, and description.
 *
 * @param props - FeatureGrid configuration props
 * @returns A feature grid React component
 *
 * @example
 * ```tsx
 * <FeatureGrid
 *   title="Our Features"
 *   description="Everything you need to succeed"
 *   features={[
 *     { icon: "zap", title: "Fast", description: "Lightning fast performance" },
 *     { icon: "shield", title: "Secure", description: "Enterprise-grade security" }
 *   ]}
 * />
 * ```
 */
export function FeatureGrid({
	eyebrow,
	title,
	description,
	features,
	id = "features",
	className,
}: FeatureGridProps) {
	return (
		<section id={id} className={`py-20 md:py-28 ${className || ""}`}>
			<div className="container px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mx-auto max-w-2xl text-center"
				>
					{eyebrow && <span className="eyebrow">{eyebrow}</span>}
					<h2 className="mt-5 text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl">
						{title}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">{description}</p>
				</motion.div>

				{features && features.length > 0 && (
					<motion.div
						variants={containerVariants}
						initial="hidden"
						whileInView="visible"
						viewport={{ once: true }}
						className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
					>
						{features.map((feature) => {
							const Icon = iconMap[feature.icon.toLowerCase()];
							if (!Icon) {
								console.warn(`Icon "${feature.icon}" not found in iconMap`);
								return null;
							}
							return (
								<motion.div key={feature.title} variants={cardVariants}>
									<Card className="group h-full border-primary/10 bg-card shadow-sm transition-shadow duration-300 hover:shadow-md">
										<CardHeader>
											<div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-brand-cream">
												<Icon className="h-6 w-6" />
											</div>
											<CardTitle className="text-primary">
												{feature.title}
											</CardTitle>
											<CardDescription className="leading-relaxed">
												{feature.description}
											</CardDescription>
										</CardHeader>
									</Card>
								</motion.div>
							);
						})}
					</motion.div>
				)}
			</div>
		</section>
	);
}
