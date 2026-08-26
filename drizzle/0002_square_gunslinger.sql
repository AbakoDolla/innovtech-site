ALTER TABLE `catalog_products` ADD `availabilityStatus` enum('available','on_request','unavailable') DEFAULT 'on_request' NOT NULL;--> statement-breakpoint
ALTER TABLE `catalog_products` ADD `availabilityNoteFr` varchar(240) DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE `catalog_products` ADD `availabilityNoteEn` varchar(240) DEFAULT '' NOT NULL;