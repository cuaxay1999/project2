﻿--
-- Script was generated by Devart dbForge Studio 2019 for MySQL, Version 8.2.23.0
-- Product home page: http://www.devart.com/dbforge/mysql/studio
-- Script date 11/08/2021 20:53:20
-- Server version: 5.5.5-10.3.28-MariaDB
-- Client version: 4.1
--

-- 
-- Disable foreign keys
-- 
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;

-- 
-- Set SQL mode
-- 
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- 
-- Set character set the client will use to send SQL statements to the server
--
SET NAMES 'utf8';

--
-- Set default database
--
USE bookcar;

--
-- Drop procedure `GetRoute`
--
DROP PROCEDURE IF EXISTS GetRoute;

--
-- Drop procedure `SearchRoute`
--
DROP PROCEDURE IF EXISTS SearchRoute;

--
-- Drop table `routes`
--
DROP TABLE IF EXISTS routes;

--
-- Drop table `places`
--
DROP TABLE IF EXISTS places;

--
-- Drop table `backupcodes`
--
DROP TABLE IF EXISTS backupcodes;

--
-- Drop procedure `GetAllBooking`
--
DROP PROCEDURE IF EXISTS GetAllBooking;

--
-- Drop procedure `GetAllUser`
--
DROP PROCEDURE IF EXISTS GetAllUser;

--
-- Drop procedure `GetBooking`
--
DROP PROCEDURE IF EXISTS GetBooking;

--
-- Drop table `bookings`
--
DROP TABLE IF EXISTS bookings;

--
-- Drop procedure `CreateUser`
--
DROP PROCEDURE IF EXISTS CreateUser;

--
-- Drop table `users`
--
DROP TABLE IF EXISTS users;

--
-- Set default database
--
USE bookcar;

--
-- Create table `users`
--
CREATE TABLE users (
  phoneNumber char(20) DEFAULT NULL,
  fullName varchar(100) NOT NULL,
  password varchar(255) NOT NULL,
  gender tinyint(4) DEFAULT NULL,
  type tinyint(4) NOT NULL DEFAULT 0,
  status tinyint(4) DEFAULT 0,
  userId char(36) NOT NULL,
  createdAt datetime DEFAULT NULL,
  modifiedAt datetime DEFAULT NULL,
  email varchar(50) DEFAULT NULL,
  note varchar(255) DEFAULT NULL,
  hasTwoFactorAuth tinyint(1) DEFAULT 0,
  secretKey varchar(255) DEFAULT NULL,
  qrCode varchar(255) DEFAULT NULL,
  countWrongPass int(11) DEFAULT 0,
  PRIMARY KEY (userId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 16384,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

DELIMITER $$

--
-- Create procedure `CreateUser`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE CreateUser (IN phoneNumber char(20), IN fullName varchar(100), IN password varchar(255), IN gender tinyint(4), IN type tinyint(4), IN status varchar(50))
BEGIN
  INSERT INTO users (phoneNumber
  , fullName
  , password
  , gender
  , type
  , status
  , userId
  , createdAt)
    VALUES (phoneNumber, fullName, password, gender, type, status, UUID(), NOW());
END
$$

DELIMITER ;

--
-- Create table `bookings`
--
CREATE TABLE bookings (
  bookingId int(11) NOT NULL AUTO_INCREMENT,
  userId char(36) DEFAULT NULL,
  startDate date DEFAULT NULL,
  startTime time DEFAULT NULL,
  price int(11) DEFAULT NULL,
  quantity int(11) DEFAULT NULL,
  total int(11) DEFAULT NULL,
  status tinyint(4) DEFAULT 0,
  startPlace varchar(255) DEFAULT NULL,
  endPlace varchar(255) DEFAULT NULL,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
  modifiedAt timestamp NULL DEFAULT '0000-00-00 00:00:00',
  PRIMARY KEY (bookingId)
)
ENGINE = INNODB,
AUTO_INCREMENT = 62,
AVG_ROW_LENGTH = 5461,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create foreign key
--
ALTER TABLE bookings
ADD CONSTRAINT bookings_ibfk_1 FOREIGN KEY (userId)
REFERENCES users (userId);

DELIMITER $$

--
-- Create procedure `GetBooking`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE GetBooking (IN userId char(36))
BEGIN
  SELECT
    b.*,
    u.fullName
  FROM bookings b,
       users u
  WHERE b.userId = userId
  AND b.userId = u.userId
  ORDER BY b.createdAt DESC;
END
$$

--
-- Create procedure `GetAllUser`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE GetAllUser ()
BEGIN
  SELECT
    u.userId,
    u.phoneNumber,
    u.fullName,
    u.gender,
    u.type,
    u.status,
    u.note,
    COUNT(b.quantity) AS totalBooking,
    SUM(b.total) AS totalMoney
  FROM users u
    LEFT JOIN bookings b
      ON u.userId = b.userId
  GROUP BY u.userId
  ORDER BY totalMoney DESC;
END
$$

--
-- Create procedure `GetAllBooking`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE GetAllBooking ()
BEGIN
  SELECT
    b.*,
    u.fullName,
    u.phoneNumber
  FROM bookings b,
       users u
  WHERE b.userId = u.userId
  ORDER BY b.createdAt DESC;
END
$$

DELIMITER ;

--
-- Create table `backupcodes`
--
CREATE TABLE backupcodes (
  id int(11) NOT NULL AUTO_INCREMENT,
  code varchar(255) DEFAULT NULL,
  hasUsed tinyint(1) DEFAULT 0,
  userId char(36) NOT NULL,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (id)
)
ENGINE = INNODB,
AUTO_INCREMENT = 241,
AVG_ROW_LENGTH = 1638,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create foreign key
--
ALTER TABLE backupcodes
ADD CONSTRAINT `FK_backup-codes_userId` FOREIGN KEY (userId)
REFERENCES users (userId) ON DELETE NO ACTION;

--
-- Create table `places`
--
CREATE TABLE places (
  placeId int(11) NOT NULL AUTO_INCREMENT,
  placeName varchar(255) NOT NULL,
  address varchar(100) DEFAULT NULL,
  commune varchar(20) NOT NULL,
  district varchar(20) NOT NULL,
  province varchar(20) NOT NULL,
  fullAddress varchar(255) DEFAULT NULL,
  PRIMARY KEY (placeId)
)
ENGINE = INNODB,
AUTO_INCREMENT = 13,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create table `routes`
--
CREATE TABLE routes (
  routeId int(11) NOT NULL AUTO_INCREMENT,
  startPlaceId int(11) NOT NULL,
  endPlaceId int(11) NOT NULL,
  startTime time NOT NULL,
  status tinyint(4) NOT NULL DEFAULT 1,
  availableSeat int(11) DEFAULT NULL,
  price int(11) NOT NULL,
  totalBooking int(11) DEFAULT 0,
  distance int(11) DEFAULT 0,
  PRIMARY KEY (routeId)
)
ENGINE = INNODB,
AUTO_INCREMENT = 9,
AVG_ROW_LENGTH = 2730,
CHARACTER SET utf8,
COLLATE utf8_general_ci;

--
-- Create foreign key
--
ALTER TABLE routes
ADD CONSTRAINT routes_ibfk_1 FOREIGN KEY (startPlaceId)
REFERENCES places (placeId) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Create foreign key
--
ALTER TABLE routes
ADD CONSTRAINT routes_ibfk_2 FOREIGN KEY (endPlaceId)
REFERENCES places (placeId) ON DELETE CASCADE ON UPDATE CASCADE;

DELIMITER $$

--
-- Create procedure `SearchRoute`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE SearchRoute (IN start int, IN end int)
BEGIN
  SELECT
    p1.fullAddress AS startAddress,
    p2.fullAddress AS endAddress,
    r.*,
    p1.placeName AS startPlace,
    p2.placeName AS endPlace
  FROM routes r,
       places p1,
       places p2
  WHERE r.startPlaceId = p1.placeId
  AND r.endPlaceId = p2.placeId
  AND r.startPlaceId = start
  AND r.endPlaceId = end;
END
$$

--
-- Create procedure `GetRoute`
--
CREATE DEFINER = 'root'@'localhost'
PROCEDURE GetRoute ()
BEGIN
  SELECT
    p1.fullAddress AS startAddress,
    p2.fullAddress AS endAddress,
    r.*,
    p1.placeName AS startPlace,
    p2.placeName AS endPlace
  FROM routes r,
       places p1,
       places p2
  WHERE r.startPlaceId = p1.placeId
  AND r.endPlaceId = p2.placeId
  ORDER BY r.routeId DESC;
END
$$

DELIMITER ;

-- 
-- Dumping data for table places
--
INSERT INTO places VALUES
(1, 'Làng Thổ Hà', 'Làng Thổ Hà', 'Vân Hà', 'Việt Yên', 'Bắc Giang', 'Làng Thổ Hà xã Vân Hà huyện Việt Yên tỉnh Bắc Giang'),
(2, 'Chùa Tây Yên Tử', 'Số 20 đường Võ Thị Sáu', 'Đông Phú', 'Lục Nam', 'Bắc Giang', 'Số 20 đường Võ Thị Sáu, Đông Phú, Lục Nam, Bắc Giang'),
(3, 'Xã Tiến Thắng', 'Số 130 đường Chiến Thắng', 'Tiến Thắng', 'Yên Thế', 'Bắc Giang', 'Số 130 đường Chiến Thắng, Tiên Thắng, Yên Thế, Bắc Giang'),
(10, 'Đại học Bách Khoa Hà Nội', 'Đại học Bách Khoa Hà Nội', 'Bách Khoa', 'Hai Bà Trưng', 'Hà Nội', 'Số 1 Đại Cồ Việt, Bách Khoa, Hai Bà Trưng, Hà Nội'),
(11, 'Bệnh Viện Bạch Mai', 'Bệnh viện Bạch Mai', 'Phương Đình', 'Đống Đa', 'Hà Nội', 'Số 78 Giải Phóng, Phương Đình, Đống Đa, Hà Nội'),
(12, 'Đại học Y Hà Nội', 'Số 1 Tôn Thất Tùng', 'Kim Liên', 'Đống Đa', 'Hà Nội', 'Số 1 Tôn Thất Tùng, Kim Kiên, Đống Đa, Hà Nội');


-- 
-- Dumping data for table routes
--
INSERT INTO routes VALUES
(3, 12, 1, '10:30:00', 1, 45, 200000, 0, 45),
(4, 11, 3, '00:50:00', 1, 45, 450000, 0, 2121),
(5, 12, 3, '11:30:00', 1, 45000, 450000, 0, 450),
(6, 11, 1, '13:30:00', 1, 45, 450000, 0, 45),
(7, 12, 2, '23:43:00', 1, 45, 45000, 0, 45),
(8, 10, 2, '06:40:00', 1, 60, 100000, 0, 50);


-- 
-- Restore previous SQL mode
-- 
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;

-- 
-- Enable foreign keys
-- 
/*!40014 SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS */;