"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTodayHours, isOpenNow, openingHours } from "@/lib/data/cafe-info";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function OpeningHours() {
	const t = useTranslations("openingHours");
	const today = getTodayHours();
	const open = isOpenNow();

	const getDayName = (day: string): string => {
		try {
			return t(`days.${day}` as Parameters<typeof t>[0]) || day;
		} catch {
			return day;
		}
	};

	return (
		<section id="hours" className="py-20 md:py-32">
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
					<p className="mt-4 text-lg text-muted-foreground">{t("description")}</p>
				</motion.div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5, delay: 0.1 }}
					className="mx-auto mt-12 max-w-2xl"
				>
					<Card>
						<CardHeader>
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<Clock className="h-5 w-5 text-primary" />
									<CardTitle>{t("today")}</CardTitle>
								</div>
								<Badge variant={open ? "default" : "secondary"}>
									{open ? t("openNow") : t("closed")}
								</Badge>
							</div>
							{today && (
								<CardDescription>
									{today.closed
										? t("closed")
										: `${today.open} - ${today.close}`}
								</CardDescription>
							)}
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{openingHours.map((hours) => {
									const isToday =
										getTodayHours()?.day === hours.day;
									return (
										<div
											key={hours.day}
											className={`flex items-center justify-between border-b pb-3 last:border-0 ${
												isToday ? "font-semibold" : ""
											}`}
										>
											<span>{getDayName(hours.day)}</span>
											<span className="text-muted-foreground">
												{hours.closed
													? t("closed")
													: `${hours.open} - ${hours.close}`}
											</span>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>
				</motion.div>
			</div>
		</section>
	);
}

