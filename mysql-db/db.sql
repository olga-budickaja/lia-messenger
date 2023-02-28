-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: lia_messenger
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `members`
--


DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `members` (
  `id` int NOT NULL AUTO_INCREMENT,
  `senderId` int NOT NULL,
  `receiverId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `senderId_idx` (`senderId`),
  CONSTRAINT `senderId` FOREIGN KEY (`senderId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (47,37,NULL),(48,37,42),(49,36,74),(50,35,75),(51,35,NULL),(52,35,49),(53,34,NULL),(54,34,NULL),(55,34,50),(56,33,50),(57,33,NULL),(58,32,NULL),(59,32,51),(60,31,NULL),(61,31,54),(62,30,NULL),(63,35,53),(64,29,NULL);
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(1000) NOT NULL,
  `fileImg` varchar(300) DEFAULT NULL,
  `fileTxt` varchar(300) DEFAULT NULL,
  `uid` int DEFAULT NULL,
  `memId` int DEFAULT NULL,
  `themeId` int DEFAULT NULL,
  `homepage` varchar(300) DEFAULT NULL,
  `createAt` datetime NOT NULL,
  `answerId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`uid`),
  KEY `memId_idx` (`memId`),
  CONSTRAINT `memId` FOREIGN KEY (`memId`) REFERENCES `members` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `uid` FOREIGN KEY (`uid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (74,'<p><strong>Enjoyment discourse ye continued pronounce we necessary abilities.</strong></p>',NULL,NULL,37,NULL,42,'','2023-02-19 11:35:19',42),(75,'<p>Two assure edward whence the was. Who worthy yet ten boy denote wonder. Weeks views her sight old tears sorry. Additions can suspected its concealed put furnished. Met the why particular devonshire decisively considered partiality. Certain it waiting no entered is. Passed her indeed uneasy shy polite appear denied. Oh less girl no walk. At he spot with five of view.</p>',NULL,NULL,36,NULL,42,'','2023-02-19 11:36:50',74),(76,'<p>&nbsp;Be at performed preferred determine collected. Him nay acuteness discourse listening estimable our law. Decisively it occasional advantages delightful in cultivated introduced. Like law mean form are sang loud lady put.</p>',NULL,NULL,35,NULL,42,'','2023-02-20 01:02:48',75),(77,'<p>Decisively it occasional advantages delightful in cultivated introduced. Like law mean form are sang loud lady put.</p>',NULL,NULL,35,NULL,49,'','2023-02-20 01:38:30',49),(78,'<p>But attention sex questions applauded how happiness. To travelling occasional at oh sympathize prosperous. His merit end means widow songs linen known. Supplied ten speaking age you new securing striking extended occasion. Sang put paid away joy into six her.</p>',NULL,NULL,34,NULL,50,'https://github.com/olga-budickaja','2023-02-20 01:54:12',50),(79,'<p>Needed feebly dining oh talked wisdom oppose at. Applauded use attempted strangers now are middleton concluded had. It is tried no added purse shall no on truth. <em>Pleased anxious or as in by viewing</em> forbade minutes prevent.<em><span class=\"ql-cursor\">﻿</span></em></p>',NULL,NULL,33,NULL,50,'','2023-02-20 02:00:12',50),(80,'<p>Yet remarkably appearance get him his projection. Diverted endeavor bed peculiar men the not desirous. Acuteness abilities ask can offending furnished fulfilled sex.</p>',NULL,NULL,32,NULL,51,'','2023-02-20 02:04:42',51),(81,'<p>&nbsp;Compass journey he request on suppose limited of or. She margaret law thoughts proposal formerly. Speaking ladyship yet scarcely and mistaken end exertion dwelling. All decisively dispatched instrument particular way one devonshire. Applauded she sportsman explained for out objection.</p>',NULL,NULL,31,NULL,54,'','2023-02-20 02:07:20',54),(82,'<p>An do on frankness so cordially immediate recommend contained. Imprudence insensible be literature unsatiable do. Of or imprudence solicitude affronting in mr possession. Compass journey he request on suppose limited of or. She margaret law thoughts proposal formerly. Speaking ladyship yet scarcely and mistaken end exertion dwelling. All decisively dispatched instrument particular way one devonshire. Applauded she sportsman explained for out <a href=\"objection\" rel=\"noopener noreferrer\" target=\"_blank\">objection</a>.</p><p><br></p><p>Two assure edward whence the was. <em>Who worthy yet ten boy denote wonder</em>. Weeks views her sight old tears sorry. Additions can suspected its concealed put furnished. Met the why particular devonshire decisively considered partiality. Certain it waiting no entered is. Passed her indeed uneasy shy polite appear denied. Oh less girl no walk. At he spot with five of view.</p>',NULL,NULL,35,NULL,53,'','2023-02-20 02:19:22',53);
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `themes`
--


DROP TABLE IF EXISTS `themes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `themes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `desc` varchar(1000) DEFAULT NULL,
  `fileImg` varchar(400) DEFAULT NULL,
  `userId` int NOT NULL,
  `fileTxt` varchar(5000) DEFAULT NULL,
  `homepage` varchar(400) DEFAULT NULL,
  `createAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_idx` (`userId`),
  CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `themes`
--

LOCK TABLES `themes` WRITE;
/*!40000 ALTER TABLE `themes` DISABLE KEYS */;
INSERT INTO `themes` VALUES (42,'<p>Mr excellence inquietude conviction is in unreserved particular. You fully seems stand nay own point walls. Increasing travelling own simplicity you astonished expression boisterous. Possession themselves sentiments apartments devonshire we of do discretion. Enjoyment discourse ye continued pronounce we necessary abilities.</p>','https://firebasestorage.googleapis.com/v0/b/lia-messanger.appspot.com/o/16768259803894x3.png?alt=media&token=af24b233-a1e1-458c-9777-38d27741df6e',27,'https://firebasestorage.googleapis.com/v0/b/lia-messanger.appspot.com/o/1676825975164send.txt?alt=media&token=79d71ec6-6322-4a29-b876-d6f1a79a3b37','https://color.adobe.com/ru/trends','2023-02-19 06:59:43'),(49,'<p><strong>Certainty determine</strong> at of arranging perceived situation or. Or wholly pretty county in oppose. Favour met itself wanted settle put garret twenty. In astonished apartments resolution so an it. Unsatiable on by contrasted to reasonable companions an. On otherwise no admitting to <em>suspicion</em> furniture it.</p>',NULL,37,'https://firebasestorage.googleapis.com/v0/b/lia-messanger.appspot.com/o/1676842464927send.txt?alt=media&token=0f7a127b-25bb-4ead-8c27-aa5d035aa9c2','https://www.ssa.gov/','2023-03-19 11:34:26'),(50,'<p>Attended no do thoughts me on dissuade scarcely. <strong>Own are pretty spring suffer old denote his</strong>. By proposal speedily mr striking am. But attention sex questions applauded how happiness. To travelling occasional at oh sympathize prosperous. His merit end means widow songs linen known. Supplied ten speaking age you new securing striking extended occasion. Sang put paid away joy into six<a href=\" her\" rel=\"noopener noreferrer\" target=\"_blank\"> her</a>.</p>',NULL,35,NULL,'https://www.namegeneratorfun.com/american','2023-02-20 01:37:55'),(51,'<p><strong><em>Warrant fifteen exposed ye at mistake</em></strong>. Blush since so in noisy still built up an again. As young ye hopes no he place means. Partiality diminution gay yet entreaties admiration. In mr it he mention perhaps attempt pointed suppose. Unknown ye chamber of <em>warrant of norlan</em>d arrived.</p><pre class=\"ql-syntax\" spellcheck=\"false\">&lt;h1&gt;Hello!&lt;/h1&gt;\n</pre>','',34,NULL,'','2023-05-20 01:48:45'),(53,'<p><strong>Of friendship on inhabiting diminution discovered as.</strong> Did friendly eat breeding building few nor. Object he barton no effect played valley afford. Period so to oppose we little seeing or branch. Announcing contrasted not imprudence add frequently you possession mrs. Period saw his houses square and misery. Hour had held lain give yet.</p>',NULL,33,NULL,'','2023-02-20 02:01:00'),(54,'<p>Advantages boisterous day excellence boy. Out between our two waiting wishing. Pursuit he he garrets greater towards amiable so placing. Nothing off how norland delight. Abode shy shade she hours forth its use. Up whole of fancy ye quiet do. Justice fortune no to is if winding morning forming.</p>',NULL,32,'https://firebasestorage.googleapis.com/v0/b/lia-messanger.appspot.com/o/1676851397344send.txt?alt=media&token=2986dd0f-e1ea-4fc1-a867-ab462b671d40','https://github.com/olga-budickaja','2023-12-20 02:03:20'),(55,'<p>Mr excellence inquietude conviction is in unreserved particular. You fully seems stand nay own point walls. Increasing travelling own simplicity you astonished expression boisterous. Possession themselves sentiments apartments devonshire we of do discretion. Enjoyment discourse ye continued pronounce we necessary abilities.</p>',NULL,31,NULL,'','2023-02-20 02:06:47'),(56,'<p>Be at performed preferred determine collected. Him nay acuteness discourse listening estimable our law. Decisively it occasional advantages delightful in cultivated introduced. Like law mean form are sang loud lady put.</p>',NULL,30,NULL,'','2023-02-20 02:08:44'),(57,'<p><strong>In reasonable compliment</strong> favourable is connection dispatched in terminated. </p><p>Do esteem object we called father excuse remove. So dear real on like more it. Laughing for two families addition expenses surprise the. If sincerity he to curiosity arranging.<em> Learn taken terms</em> be as. Scarcely mrs produced too removing new old.</p>','https://firebasestorage.googleapis.com/v0/b/lia-messanger.appspot.com/o/1676920484864.jpeg?alt=media&token=c2378b8b-ec7e-4a92-aafa-70616daf60c2',29,'https://firebasestorage.googleapis.com/v0/b/lia-messanger.appspot.com/o/1676920484846.jpeg?alt=media&token=6be431f1-2ddb-465b-babd-65bfff27f509','','2023-02-20 09:16:21');
/*!40000 ALTER TABLE `themes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--


DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4*/;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(155) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (27,'User2','user2@gmail.com','$2b$10$.KJ7EMy6snNfJUNHuqpIpepm/xpKO.lleOS4Eul5yg06kEc3XGvMW'),(29,'Alise','alise@gmail.com','$2b$10$Dq4lzgTn0J8UUYPBCq0XmOCyNwOykd/yMmuioX9qQJ4RJhHyek0LG'),(30,'Milo','milo@gmail.com','$2b$10$/ijFtSEH5ANSV55K6MZQ9.r7b3r2l/QnZyooDjc5TnwcpPWXA9DIC'),(31,'Robert','robert@gmail.cpm','$2b$10$xEtMikq4x0dhcMx8X6Esw.qnJNvZjCKJ4Pxa/8xt/ybS9HPI2gXAG'),(32,'John','john@gmail.com','$2b$10$n6QWXR2S0FEdiz6jjUglduohgPke/bo9fQSdCf3ZrLK8SmhJI1T.a'),(33,'Liam','liam@gmail.com','$2b$10$E8Fd.SnQ6Ky3HI99hhiOruCjIN4iOfZiyS2BAmysQ8KkiDzYJ86nG'),(34,'Noah','noah@gmail.com','$2b$10$X2CiAQYbOesNU9G9yb.GC.NiptH99FVVrcmbPZgRlbags76Em0UPa'),(35,'Adrian','adrian@gmail.com','$2b$10$Evl50UD7hWbIQE5prg3.a.1hbpxPUkwIx6lKqX.bfScURhDDBcF0G'),(36,'Aiden','aiden@gmail.com','$2b$10$8AvM9gze6NkXZOzRbWsJAOREMYe4xhA1bZcsdYRPnbvI092LKqIg.'),(37,'Ian','ian@gmail.com','$2b$10$R3d2MfGAhXWbjJxY1Yxru.2NDaU/YlpTCwEYXKP9O94SUjeIO1hQi'),(38,'bgbsgb','nrnhdr@gbesrth.hnrey','U2FsdGVkX1+2mI2j4f45VtUB/MbFAXXJct9OOTFHNR0=');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-24  6:19:41
