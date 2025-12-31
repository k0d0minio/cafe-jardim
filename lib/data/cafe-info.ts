/**
 * Cafe information data structure
 * This file contains placeholder data that can be replaced with actual cafe information
 */

export interface OpeningHours {
	day: string;
	open: string;
	close: string;
	closed?: boolean;
}

export interface Review {
	id: string;
	author: string;
	rating: number;
	comment: string;
	date: string;
	avatar?: string;
}

export interface GalleryImage {
	id: string;
	url: string;
	alt: string;
	title?: string;
}

/**
 * Opening hours for the cafe
 * Format: Day name, opening time, closing time
 * Set closed: true if the cafe is closed on that day
 */
export const openingHours: OpeningHours[] = [
	{ day: "Monday", open: "08:00", close: "18:00" },
	{ day: "Tuesday", open: "08:00", close: "18:00" },
	{ day: "Wednesday", open: "08:00", close: "18:00" },
	{ day: "Thursday", open: "08:00", close: "18:00" },
	{ day: "Friday", open: "08:00", close: "18:00" },
	{ day: "Saturday", open: "09:00", close: "19:00" },
	{ day: "Sunday", open: "09:00", close: "17:00", closed: false },
];

/**
 * Customer reviews and testimonials
 * These are placeholder reviews - replace with actual customer reviews
 */
export const reviews: Review[] = [
	{
		id: "1",
		author: "Maria Silva",
		rating: 5,
		comment: "Amazing coffee and the atmosphere is so cozy! Perfect place to relax and enjoy a good cup of coffee.",
		date: "2024-01-15",
	},
	{
		id: "2",
		author: "João Santos",
		rating: 5,
		comment: "The best cafe in São Lourenço! The food is fresh, the service is excellent, and the coffee is outstanding.",
		date: "2024-01-20",
	},
	{
		id: "3",
		author: "Ana Costa",
		rating: 5,
		comment: "I love coming here for breakfast. The pastries are delicious and the staff is always friendly and welcoming.",
		date: "2024-02-01",
	},
];

/**
 * Gallery images
 * These are placeholder image URLs - replace with actual cafe photos
 * Images should be stored in the public directory or hosted externally
 */
export const galleryImages: GalleryImage[] = [
	{
		id: "1",
		url: "/images/cafe-1.jpg",
		alt: "Cafe interior",
		title: "Cozy interior",
	},
	{
		id: "2",
		url: "/images/cafe-2.jpg",
		alt: "Coffee preparation",
		title: "Artisan coffee",
	},
	{
		id: "3",
		url: "/images/cafe-3.jpg",
		alt: "Fresh pastries",
		title: "Fresh pastries",
	},
	{
		id: "4",
		url: "/images/cafe-4.jpg",
		alt: "Outdoor seating",
		title: "Outdoor seating",
	},
];

/**
 * Get today's opening hours
 */
export function getTodayHours(): OpeningHours | null {
	const today = new Date().getDay();
	// Convert Sunday (0) to 6, and shift other days
	const dayIndex = today === 0 ? 6 : today - 1;
	return openingHours[dayIndex] || null;
}

/**
 * Check if cafe is currently open
 */
export function isOpenNow(): boolean {
	const today = getTodayHours();
	if (!today || today.closed) return false;

	const now = new Date();
	const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;

	return currentTime >= today.open && currentTime <= today.close;
}

