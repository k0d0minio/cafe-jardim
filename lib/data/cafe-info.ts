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

export interface MenuHighlight {
	id: string;
	url: string;
	name: string;
	tag: string;
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
		comment:
			"A hidden gem in São Lourenço. Great coffee, a beautiful brunch, and rotating art on the walls — it feels like a garden you never want to leave.",
		date: "2025-05-15",
	},
	{
		id: "2",
		author: "João Santos",
		rating: 5,
		comment:
			"Half café, half gallery, all charm. The mezze board and the poke bowl were superb, and we stumbled into an exhibition opening while we were there.",
		date: "2025-06-02",
	},
	{
		id: "3",
		author: "Ana Costa",
		rating: 5,
		comment:
			"My favourite spot for breakfast. Fresh toast, friendly staff, and always something new to look at. The botanical, green interior is gorgeous.",
		date: "2025-06-21",
	},
];

/**
 * Menu highlights — a curated selection of dishes from the kitchen,
 * shot for the Jardim photoshoot. Full menu lives in the PDF.
 */
export const menuPdf = "/images/jardim-menu.pdf";

export const menuHighlights: MenuHighlight[] = [
	{
		id: "mezze",
		url: "/images/food/tabua-mezze-photoshoot.jpg",
		name: "Tábua Mezze",
		tag: "To share",
	},
	{
		id: "poke",
		url: "/images/food/poke-bowl-photoshoot.jpg",
		name: "Poke Bowl",
		tag: "Fresh",
	},
	{
		id: "smash-burger",
		url: "/images/food/smash-burger-photoshoot.jpg",
		name: "Smash Burger",
		tag: "Kitchen",
	},
	{
		id: "burrata",
		url: "/images/food/avocado-burrata-salad.jpeg",
		name: "Avocado & Burrata Salad",
		tag: "Garden",
	},
	{
		id: "tacos",
		url: "/images/food/taco-beyond-photoshoot.jpg",
		name: "Street Tacos",
		tag: "Small plates",
	},
	{
		id: "toast",
		url: "/images/food/fresh-toast-photoshoot.jpg",
		name: "Fresh Toast",
		tag: "Brunch",
	},
	{
		id: "tuna",
		url: "/images/food/ahi-tuna-poke-nori-1.jpeg",
		name: "Ahi Tuna & Nori",
		tag: "Fresh",
	},
	{
		id: "steak",
		url: "/images/food/steak-and-potatoes.jpeg",
		name: "Steak & Potatoes",
		tag: "Kitchen",
	},
];

/**
 * Galeria — art exhibitions & event life at Jardim.
 * Real photography from openings, artist talks and the space itself.
 */
export const galleryImages: GalleryImage[] = [
	{
		id: "interior",
		url: "/images/events/venue-interior-01-window-nook-paintings.jpeg",
		alt: "Window nook with paintings inside Jardim café",
		title: "The space",
	},
	{
		id: "opening",
		url: "/images/events/event-crowd-07-gallery-opening-crowd.jpeg",
		alt: "Guests at a Jardim gallery opening",
		title: "Openings",
	},
	{
		id: "flower-paintings",
		url: "/images/events/art-exhibition-03-flower-paintings-on-wall.jpeg",
		alt: "Floral paintings hanging on the gallery wall",
		title: "Exhibitions",
	},
	{
		id: "artist-talk",
		url: "/images/events/art-exhibition-05-artist-talk-wave-paintings.jpeg",
		alt: "Artist talk in front of a series of wave paintings",
		title: "Artist talks",
	},
	{
		id: "still-life",
		url: "/images/events/artwork-closeup-01-still-life-fruit-paintings.jpeg",
		alt: "Close-up of a still-life fruit painting",
		title: "The art",
	},
	{
		id: "facade-night",
		url: "/images/events/venue-exterior-02-jardim-sign-night.jpeg",
		alt: "Jardim illuminated sign on the façade at night",
		title: "After dark",
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

