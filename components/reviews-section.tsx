"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { reviews } from "@/lib/data/cafe-info";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

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

export function ReviewsSection() {
	const t = useTranslations("reviews");
	const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

	const toggleReview = (id: string) => {
		const newExpanded = new Set(expandedReviews);
		if (newExpanded.has(id)) {
			newExpanded.delete(id);
		} else {
			newExpanded.add(id);
		}
		setExpandedReviews(newExpanded);
	};

	const renderStars = (rating: number) => {
		return Array.from({ length: 5 }, (_, i) => (
			<Star
				key={i}
				className={`h-4 w-4 ${
					i < rating
						? "fill-yellow-400 text-yellow-400"
						: "text-muted-foreground"
				}`}
			/>
		));
	};

	return (
		<section id="reviews" className="py-20 md:py-32 bg-muted/30">
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
					className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
				>
					{reviews.map((review) => {
						const isExpanded = expandedReviews.has(review.id);
						const shouldTruncate = review.comment.length > 150;
						const displayComment = shouldTruncate && !isExpanded
							? `${review.comment.slice(0, 150)}...`
							: review.comment;

						return (
							<motion.div key={review.id} variants={cardVariants}>
								<Card className="h-full flex flex-col">
									<CardHeader>
										<div className="flex items-center justify-between mb-2">
											<CardDescription className="font-semibold text-foreground">
												{review.author}
											</CardDescription>
											<div className="flex items-center gap-1">
												{renderStars(review.rating)}
											</div>
										</div>
										<CardDescription className="text-xs">
											{new Date(review.date).toLocaleDateString()}
										</CardDescription>
									</CardHeader>
									<CardContent className="flex-1">
										<p className="text-sm text-muted-foreground">
											{displayComment}
										</p>
										{shouldTruncate && (
											<button
												type="button"
												onClick={() => toggleReview(review.id)}
												className="mt-2 text-sm text-primary hover:underline"
											>
												{isExpanded ? t("readLess") : t("readMore")}
											</button>
										)}
									</CardContent>
								</Card>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
}

