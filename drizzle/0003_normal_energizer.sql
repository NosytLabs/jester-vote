CREATE TABLE `controversies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomineeId` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text NOT NULL,
	`date` varchar(20),
	`severity` enum('minor','moderate','major') DEFAULT 'moderate',
	`sourceUrl` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `controversies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `externalLinks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomineeId` int NOT NULL,
	`label` varchar(128) NOT NULL,
	`url` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `externalLinks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `newsItems` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomineeId` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`content` text NOT NULL,
	`sourceUrl` text,
	`date` varchar(20),
	`submittedByUserId` int,
	`approved` boolean DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `newsItems_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `notableMoments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomineeId` int NOT NULL,
	`title` varchar(256) NOT NULL,
	`description` text,
	`videoUrl` text,
	`timestamp` varchar(20),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `notableMoments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE INDEX `idx_controversies_nominee` ON `controversies` (`nomineeId`);--> statement-breakpoint
CREATE INDEX `idx_links_nominee` ON `externalLinks` (`nomineeId`);--> statement-breakpoint
CREATE INDEX `idx_news_nominee` ON `newsItems` (`nomineeId`);--> statement-breakpoint
CREATE INDEX `idx_moments_nominee` ON `notableMoments` (`nomineeId`);