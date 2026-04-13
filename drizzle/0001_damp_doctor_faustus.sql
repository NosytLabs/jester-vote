CREATE TABLE `comments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomineeId` int NOT NULL,
	`userId` int NOT NULL,
	`content` text NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `comments_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `nominees` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(128) NOT NULL,
	`description` text,
	`imageUrl` text,
	`status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`submittedByUserId` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `nominees_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `votes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`nomineeId` int NOT NULL,
	`userId` int NOT NULL,
	`voteType` enum('up','down') NOT NULL,
	`weekKey` varchar(10) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `votes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `users` ADD `kickUsername` varchar(128);--> statement-breakpoint
ALTER TABLE `users` ADD `kickAvatarUrl` text;--> statement-breakpoint
CREATE INDEX `idx_comments_nominee` ON `comments` (`nomineeId`);--> statement-breakpoint
CREATE INDEX `idx_nominees_status` ON `nominees` (`status`);--> statement-breakpoint
CREATE INDEX `idx_votes_nominee` ON `votes` (`nomineeId`);--> statement-breakpoint
CREATE INDEX `idx_votes_user_nominee` ON `votes` (`userId`,`nomineeId`);--> statement-breakpoint
CREATE INDEX `idx_votes_weekkey` ON `votes` (`weekKey`);