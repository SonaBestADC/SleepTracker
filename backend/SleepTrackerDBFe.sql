-- Create table

CREATE TABLE IF NOT EXISTS `users` (
  `email` VARCHAR(255) PRIMARY KEY,
  `username` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) NOT NULL);


CREATE TABLE IF NOT EXISTS `sleep_items` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  "email" VARCHAR(255) NOT NULL,
  `desp` VARCHAR(255) NOT NULL,
  "hours_slept" INTEGER NOT NULL,
  `date` DATETIME(255) NOT NULL,
  `variant` VARCHAR(255) NOT NULL,
  'progress' INT NOT NULL,
  FOREIGN KEY ("email") REFERENCES "users"("email"));


CREATE TABLE IF NOT EXISTS `friends` (
  `id` INTEGER PRIMARY KEY AUTOINCREMENT,
  `user_email` VARCHAR(255) NOT NULL,
  `user_username` VARCHAR(255) NOT NULL,
  `friend_email` VARCHAR(255) NOT NULL,
  `friend_username` VARCHAR(255) NOT NULL,
  FOREIGN KEY (`user_email`) REFERENCES `users`(`email`),
  FOREIGN KEY (`friend_email`) REFERENCES `users`(`email`),
  UNIQUE (`user_email`, `friend_email`) 
);


