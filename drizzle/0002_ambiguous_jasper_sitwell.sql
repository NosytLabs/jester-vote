DROP INDEX `idx_votes_user_nominee` ON `votes`;--> statement-breakpoint
ALTER TABLE `votes` ADD CONSTRAINT `uniq_votes_user_nominee` UNIQUE(`userId`,`nomineeId`);