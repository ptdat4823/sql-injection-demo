DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(255) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

LOCK TABLES `users` WRITE;

INSERT INTO `users` VALUES (1,'John Doe','johndoe','password123'),(2,'Jane Smith','janesmith','securepass'),(3,'Alice Johnson','alicej','alice2024'),(4,'Bob Brown','bobb','bobsecure'),(5,'Charlie White','charliew','whitecharlie'),(6,'Admin','admin','adminpassword');

UNLOCK TABLES;
