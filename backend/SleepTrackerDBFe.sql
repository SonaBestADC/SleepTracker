-- Create table

CREATE TABLE IF NOT EXISTS `users` (
  `email` VARCHAR(255) PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL);


CREATE TABLE IF NOT EXISTS `sleep_items` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  "email" VARCHAR(255) NOT NULL,
  `desp` VARCHAR(255) NOT NULL,
  `start_date` DATETIME(255) NOT NULL,
  `end_date` DATETIME(255) NOT NULL,
  `variant` VARCHAR(255) NOT NULL,
  'progress' INT NOT NULL,
  FOREIGN KEY ("email") REFERENCES "users"("email"));


-- CREATE TABLE IF NOT EXISTS `friends` (
--   `id` INT NOT NULL,
--   `title` VARCHAR(255) NOT NULL,
--   `event_date` DATETIME(255) NOT NULL,
--   `location` VARCHAR(255) NOT NULL,
--   `img` VARCHAR(255) NULL,
--   PRIMARY KEY (`id`));