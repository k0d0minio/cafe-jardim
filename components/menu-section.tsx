"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { menuHighlights, menuPdf } from "@/lib/data/cafe-info";
import { Button } from "@/components/ui/button";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.08 },
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5 },
	},
};

export function MenuSection() {
	const t = useTranslations("menu");

	return (
		<section id="menu" className="bg-secondary/50 py-20 md:py-28">
			<div className="container px-4">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mx-auto max-w-2xl text-center"
				>
					<span className="eyebrow">{t("eyebrow")}</span>
					<h2 className="mt-5 text-3xl font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl">
						{t("title")}
					</h2>
					<p className="mt-4 text-lg text-muted-foreground">
						{t("description")}
					</p>
				</motion.div>

				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="mx-auto mt-14 grid max-w-6xl grid-cols-2 gap-4 md:grid-cols-4"
				>
					{menuHighlights.map((item) => (
						<motion.figure
							key={item.id}
							variants={itemVariants}
							className="group relative aspect-4/5 overflow-hidden rounded-2xl"
						>
							<Image
								src={item.url}
								alt={item.name}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								sizes="(max-width: 768px) 50vw, 25vw"
							/>
							<div className="absolute inset-0 bg-linear-to-t from-primary/85 via-primary/10 to-transparent" />
							<figcaption className="absolute inset-x-0 bottom-0 p-4">
								<span className="inline-block rounded-full bg-brand-cream/90 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
									{item.tag}
								</span>
								<p className="mt-2 font-display text-base font-semibold leading-tight text-brand-cream">
									{item.name}
								</p>
							</figcaption>
						</motion.figure>
					))}
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
					className="mt-12 text-center"
				>
					<Button size="lg" asChild>
						<a href={menuPdf} target="_blank" rel="noopener noreferrer">
							{t("viewFull")}
							<ArrowUpRight className="ml-2 h-4 w-4" />
						</a>
					</Button>
				</motion.div>
			</div>
		</section>
	);
}
