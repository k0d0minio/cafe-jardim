"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { galleryImages } from "@/lib/data/cafe-info";

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, scale: 0.9 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.5,
		},
	},
};

export function ImageGallery() {
	const t = useTranslations("gallery");

	return (
		<section id="gallery" className="py-20 md:py-32">
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
					className="mx-auto mt-16 grid max-w-6xl auto-rows-[220px] grid-cols-2 gap-4 md:grid-cols-4"
				>
					{galleryImages.map((image, i) => (
						<motion.div
							key={image.id}
							variants={itemVariants}
							className={`group relative overflow-hidden rounded-2xl ${
								i === 0 ? "col-span-2 row-span-2" : ""
							}`}
						>
							<Image
								src={image.url}
								alt={image.alt}
								fill
								className="object-cover transition-transform duration-500 group-hover:scale-105"
								sizes={
									i === 0
										? "(max-width: 768px) 100vw, 50vw"
										: "(max-width: 768px) 50vw, 25vw"
								}
							/>
							<div className="absolute inset-0 bg-linear-to-t from-primary/80 via-primary/10 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-90" />
							{image.title && (
								<p className="absolute bottom-0 left-0 p-4 font-display text-sm font-semibold text-brand-cream md:text-base">
									{image.title}
								</p>
							)}
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

