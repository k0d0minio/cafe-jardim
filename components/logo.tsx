import Image from "next/image";

const LOGO_SRC = {
	green: "/images/brand/logos/png/jardim-logo-primary-green.png",
	// Cream wordmark on a transparent background (derived from the green
	// lockup's shape) — for use over dark / photographic surfaces.
	cream: "/images/brand/logos/png/jardim-logo-wordmark-cream.png",
	white: "/images/brand/logos/png/jardim-logo-mono-white.png",
	botanical: "/images/brand/logos/png/jardim-logo-botanical-green.png",
} as const;

/** Native aspect ratio of the Jardim lockups (3509 × 2482). */
const RATIO = 3509 / 2482;

export interface LogoProps {
	/** Which brand lockup to render. */
	variant?: keyof typeof LOGO_SRC;
	/** Rendered height in pixels; width follows the native aspect ratio. */
	height?: number;
	className?: string;
	priority?: boolean;
}

/**
 * The Jardim "Café · Galeria" wordmark, rendered from the official brand PNGs.
 * Use `green` on light surfaces, `white` on dark/photo surfaces.
 */
export function Logo({
	variant = "green",
	height = 44,
	className,
	priority,
}: LogoProps) {
	return (
		<Image
			src={LOGO_SRC[variant]}
			alt="Jardim — Café · Galeria"
			width={Math.round(height * RATIO)}
			height={height}
			priority={priority}
			className={className}
		/>
	);
}
