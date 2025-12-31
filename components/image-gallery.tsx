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
					<h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
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
					className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
				>
					{galleryImages.map((image) => (
						<motion.div
							key={image.id}
							variants={itemVariants}
							className="group relative aspect-square overflow-hidden rounded-lg border"
						>
							<Image
								src={image.url}
								alt={image.alt}
								fill
								className="object-cover transition-transform duration-300 group-hover:scale-110"
								sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
							/>
							{image.title && (
								<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/40 flex items-end">
									<p className="w-full p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
										{image.title}
									</p>
								</div>
							)}
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
}

