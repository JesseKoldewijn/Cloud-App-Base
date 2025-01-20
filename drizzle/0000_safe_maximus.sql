CREATE TABLE `cloud-app-base_note` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256),
	`slug` varchar(256) NOT NULL,
	`content` varchar(1500),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `cloud-app-base_note_id` PRIMARY KEY(`id`),
	CONSTRAINT `cloud-app-base_note_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE INDEX `name_idx` ON `cloud-app-base_note` (`name`);