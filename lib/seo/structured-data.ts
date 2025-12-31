// JSON-LD Schema.org types
type WithContext<T> = T & { "@context": "https://schema.org" };

interface Organization {
	"@type": "Organization";
	name: string;
	url: string;
	logo: string;
	sameAs?: string[];
}

interface WebSite {
	"@type": "WebSite";
	name: string;
	url: string;
	description: string;
	potentialAction?: {
		"@type": "SearchAction";
		target: {
			"@type": "EntryPoint";
			urlTemplate: string;
		};
		"query-input": string;
	};
}

interface BreadcrumbList {
	"@type": "BreadcrumbList";
	itemListElement: Array<{
		"@type": "ListItem";
		position: number;
		name: string;
		item: string;
	}>;
}

interface LocalBusiness {
	"@type": "LocalBusiness" | "CafeOrCoffeeShop";
	name: string;
	image?: string;
	"@id"?: string;
	url?: string;
	telephone?: string;
	priceRange?: string;
	address?: {
		"@type": "PostalAddress";
		streetAddress?: string;
		addressLocality?: string;
		addressRegion?: string;
		postalCode?: string;
		addressCountry?: string;
	};
	geo?: {
		"@type": "GeoCoordinates";
		latitude?: number;
		longitude?: number;
	};
	openingHoursSpecification?: Array<{
		"@type": "OpeningHoursSpecification";
		dayOfWeek: string[];
		opens: string;
		closes: string;
	}>;
	sameAs?: string[];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Cafe Jardim";
const organizationName =
	process.env.NEXT_PUBLIC_ORGANIZATION_NAME ||
	process.env.NEXT_PUBLIC_SITE_NAME ||
	"Cafe Jardim";
const organizationUrl =
	process.env.NEXT_PUBLIC_ORGANIZATION_URL ||
	process.env.NEXT_PUBLIC_SITE_URL ||
	"http://localhost:3000";
const organizationLogo =
	process.env.NEXT_PUBLIC_ORGANIZATION_LOGO || `${siteUrl}/logo.png`;
const twitterHandle = process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@yourusername";

/**
 * Options for creating an Organization schema.
 * @public
 */
export interface OrganizationSchemaOptions {
	/** Organization name. Falls back to NEXT_PUBLIC_ORGANIZATION_NAME or NEXT_PUBLIC_SITE_NAME */
	name?: string;
	/** Organization URL. Falls back to NEXT_PUBLIC_ORGANIZATION_URL or NEXT_PUBLIC_SITE_URL */
	url?: string;
	/** Organization logo URL. Falls back to NEXT_PUBLIC_ORGANIZATION_LOGO or /logo.png */
	logo?: string;
	/** Array of social media profile URLs */
	sameAs?: string[];
}

/**
 * Creates a JSON-LD Organization schema for structured data.
 *
 * This schema helps search engines understand your organization's identity and social presence.
 * It's automatically included in the root layout but can be customized per-page.
 *
 * @param options - Configuration options for the organization schema
 * @returns A JSON-LD Organization schema object with @context
 *
 * @example
 * ```tsx
 * const schema = createOrganizationSchema({
 *   name: "Acme Corp",
 *   url: "https://acme.com",
 *   logo: "https://acme.com/logo.png",
 *   sameAs: ["https://twitter.com/acme", "https://linkedin.com/company/acme"]
 * });
 * ```
 */
export function createOrganizationSchema(
	options: OrganizationSchemaOptions = {},
): WithContext<Organization> {
	const name = options.name || organizationName;
	const url = options.url || organizationUrl;
	const logo = options.logo || organizationLogo;
	const sameAs: string[] = options.sameAs || [];

	// Add social media links if available
	if (twitterHandle && twitterHandle !== "@yourusername") {
		sameAs.push(`https://twitter.com/${twitterHandle.replace("@", "")}`);
	}

	return {
		"@context": "https://schema.org",
		"@type": "Organization",
		name,
		url,
		logo,
		...(sameAs.length > 0 && { sameAs }),
	};
}

/**
 * Options for creating a WebSite schema.
 * @public
 */
export interface WebSiteSchemaOptions {
	/** Website name. Falls back to NEXT_PUBLIC_SITE_NAME */
	name?: string;
	/** Website URL. Falls back to NEXT_PUBLIC_SITE_URL */
	url?: string;
	/** Website description. Falls back to NEXT_PUBLIC_SITE_DESCRIPTION */
	description?: string;
	/** Search action configuration for site search functionality */
	potentialAction?: {
		/** URL template for search (e.g., "https://example.com/search?q={search_term_string}") */
		target: string;
		/** Query input specification (e.g., "required name=search_term_string") */
		queryInput: string;
	};
}

/**
 * Creates a JSON-LD WebSite schema for structured data.
 *
 * This schema helps search engines understand your website and enables search action
 * functionality in search results.
 *
 * @param options - Configuration options for the website schema
 * @returns A JSON-LD WebSite schema object with @context
 *
 * @example
 * ```tsx
 * const schema = createWebSiteSchema({
 *   name: "My Website",
 *   url: "https://example.com",
 *   description: "A great website",
 *   potentialAction: {
 *     target: "https://example.com/search?q={search_term_string}",
 *     queryInput: "required name=search_term_string"
 *   }
 * });
 * ```
 */
export function createWebSiteSchema(
	options: WebSiteSchemaOptions = {},
): WithContext<WebSite> {
	const name = options.name || siteName;
	const url = options.url || siteUrl;
	const description =
		options.description ||
		process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
		"A modern website starter template";

	const schema: WithContext<WebSite> = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name,
		url,
		description,
	};

	// Add search action if provided
	if (options.potentialAction) {
		schema.potentialAction = {
			"@type": "SearchAction",
			target: {
				"@type": "EntryPoint",
				urlTemplate: options.potentialAction.target,
			},
			"query-input": options.potentialAction.queryInput,
		};
	}

	return schema;
}

/**
 * A single breadcrumb item in the navigation hierarchy.
 * @public
 */
export interface BreadcrumbItem {
	/** Display name of the breadcrumb item */
	name: string;
	/** URL of the breadcrumb item */
	url: string;
}

/**
 * Creates a JSON-LD BreadcrumbList schema for structured data.
 *
 * This schema helps search engines understand your site's navigation hierarchy
 * and can display breadcrumbs in search results.
 *
 * @param items - Array of breadcrumb items in hierarchical order
 * @returns A JSON-LD BreadcrumbList schema object with @context
 *
 * @example
 * ```tsx
 * const breadcrumbs = createBreadcrumbListSchema([
 *   { name: "Home", url: "https://example.com" },
 *   { name: "Products", url: "https://example.com/products" },
 *   { name: "Widget", url: "https://example.com/products/widget" }
 * ]);
 * ```
 */
export function createBreadcrumbListSchema(
	items: BreadcrumbItem[],
): WithContext<BreadcrumbList> {
	return {
		"@context": "https://schema.org",
		"@type": "BreadcrumbList",
		itemListElement: items.map((item, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: item.name,
			item: item.url,
		})),
	};
}

/**
 * Options for creating a LocalBusiness schema.
 * @public
 */
export interface LocalBusinessSchemaOptions {
	/** Business name. Falls back to NEXT_PUBLIC_BUSINESS_NAME or NEXT_PUBLIC_SITE_NAME */
	name?: string;
	/** Business image URL */
	image?: string;
	/** Business URL */
	url?: string;
	/** Business phone number */
	telephone?: string;
	/** Price range (e.g., "€€" or "$$") */
	priceRange?: string;
	/** Business address */
	address?: {
		streetAddress?: string;
		addressLocality?: string;
		addressRegion?: string;
		postalCode?: string;
		addressCountry?: string;
	};
	/** Geographic coordinates */
	geo?: {
		latitude?: number;
		longitude?: number;
	};
	/** Opening hours specification */
	openingHoursSpecification?: Array<{
		dayOfWeek: string[];
		opens: string;
		closes: string;
	}>;
	/** Social media profile URLs */
	sameAs?: string[];
}

/**
 * Creates a JSON-LD LocalBusiness schema for structured data.
 *
 * This schema helps search engines understand your local business information,
 * including location, hours, and contact details. Perfect for cafes, restaurants, and other local businesses.
 *
 * @param options - Configuration options for the local business schema
 * @returns A JSON-LD LocalBusiness schema object with @context
 *
 * @example
 * ```tsx
 * const schema = createLocalBusinessSchema({
 *   name: "Cafe Jardim",
 *   address: {
 *     streetAddress: "123 Main St",
 *     addressLocality: "São Lourenço",
 *     addressCountry: "PT"
 *   },
 *   telephone: "+351-XXX-XXX-XXX"
 * });
 * ```
 */
export function createLocalBusinessSchema(
	options: LocalBusinessSchemaOptions = {},
): WithContext<LocalBusiness> {
	const businessName =
		options.name ||
		process.env.NEXT_PUBLIC_BUSINESS_NAME ||
		organizationName;
	const businessUrl = options.url || siteUrl;
	const businessImage = options.image || `${siteUrl}/og-image.jpg`;
	const businessPhone = options.telephone || process.env.NEXT_PUBLIC_BUSINESS_PHONE;
	const businessAddress = options.address || {
		streetAddress: process.env.NEXT_PUBLIC_BUSINESS_ADDRESS,
		addressLocality: "São Lourenço",
		addressRegion: "Lisboa",
		addressCountry: "PT",
	};

	const schema: WithContext<LocalBusiness> = {
		"@context": "https://schema.org",
		"@type": "CafeOrCoffeeShop",
		name: businessName,
		url: businessUrl,
		...(businessImage && { image: businessImage }),
		...(businessPhone && { telephone: businessPhone }),
		...(options.priceRange && { priceRange: options.priceRange }),
	};

	if (Object.values(businessAddress).some((v) => v)) {
		schema.address = {
			"@type": "PostalAddress",
			...(businessAddress.streetAddress && {
				streetAddress: businessAddress.streetAddress,
			}),
			...(businessAddress.addressLocality && {
				addressLocality: businessAddress.addressLocality,
			}),
			...(businessAddress.addressRegion && {
				addressRegion: businessAddress.addressRegion,
			}),
			...(businessAddress.postalCode && {
				postalCode: businessAddress.postalCode,
			}),
			...(businessAddress.addressCountry && {
				addressCountry: businessAddress.addressCountry,
			}),
		};
	}

	if (options.geo?.latitude && options.geo?.longitude) {
		schema.geo = {
			"@type": "GeoCoordinates",
			latitude: options.geo.latitude,
			longitude: options.geo.longitude,
		};
	}

	if (options.openingHoursSpecification && options.openingHoursSpecification.length > 0) {
		schema.openingHoursSpecification = options.openingHoursSpecification.map((hours) => ({
			"@type": "OpeningHoursSpecification",
			dayOfWeek: hours.dayOfWeek,
			opens: hours.opens,
			closes: hours.closes,
		}));
	}

	if (options.sameAs && options.sameAs.length > 0) {
		schema.sameAs = options.sameAs;
	}

	return schema;
}

/**
 * Generates a JSON string from one or more structured data schemas.
 *
 * This function formats schemas for injection into HTML as JSON-LD script tags.
 * If a single schema is provided, it returns just that schema. If multiple are provided,
 * it returns an array of schemas.
 *
 * @param schemas - One or more structured data schemas to serialize
 * @returns A JSON string ready for use in a script tag with type="application/ld+json"
 *
 * @example
 * ```tsx
 * const orgSchema = createOrganizationSchema();
 * const siteSchema = createWebSiteSchema();
 * const json = generateStructuredDataScript([orgSchema, siteSchema]);
 * // Use in: <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
 * ```
 */
export function generateStructuredDataScript(
	schemas: Array<WithContext<Organization | WebSite | BreadcrumbList | LocalBusiness>>,
): string {
	return JSON.stringify(schemas.length === 1 ? schemas[0] : schemas, null, 0);
}
