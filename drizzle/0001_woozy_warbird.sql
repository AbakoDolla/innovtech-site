CREATE TABLE `catalog_products` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(120) NOT NULL,
	`family` varchar(48) NOT NULL,
	`icon` varchar(48) NOT NULL,
	`status` enum('published','hidden') NOT NULL DEFAULT 'published',
	`nameFr` varchar(200) NOT NULL,
	`nameEn` varchar(200) NOT NULL,
	`descriptionFr` text NOT NULL,
	`descriptionEn` text NOT NULL,
	`badgeFr` varchar(120) NOT NULL,
	`badgeEn` varchar(120) NOT NULL,
	`priceFr` varchar(120) NOT NULL,
	`priceEn` varchar(120) NOT NULL,
	`imageUrl` varchar(1024) NOT NULL,
	`searchTermsFr` text NOT NULL,
	`searchTermsEn` text NOT NULL,
	`sortOrder` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `catalog_products_id` PRIMARY KEY(`id`),
	CONSTRAINT `catalog_products_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`settingKey` varchar(120) NOT NULL,
	`settingValue` text NOT NULL,
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `site_settings_settingKey` PRIMARY KEY(`settingKey`)
);
