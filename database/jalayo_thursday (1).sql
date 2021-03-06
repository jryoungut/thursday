-- phpMyAdmin SQL Dump
-- version 4.0.4
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 31, 2014 at 03:26 AM
-- Server version: 5.5.32
-- PHP Version: 5.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `jalayo_thursday`
--
CREATE DATABASE IF NOT EXISTS `jalayo_thursday` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `jalayo_thursday`;

-- --------------------------------------------------------

--
-- Table structure for table `apparatus`
--

CREATE TABLE IF NOT EXISTS `apparatus` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Apparatus` text NOT NULL,
  `FleetNum` text NOT NULL,
  `StationEmail` varchar(255) DEFAULT NULL,
  `TireCnt` int(11) NOT NULL,
  `MotorTracking` text NOT NULL,
  `NextServiceDue` int(11) NOT NULL,
  `DryPrime` tinyint(1) NOT NULL DEFAULT '0',
  `AirTank` tinyint(1) NOT NULL DEFAULT '0',
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  `ModifiedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=102 ;

--
-- Dumping data for table `apparatus`
--

INSERT INTO `apparatus` (`ID`, `Apparatus`, `FleetNum`, `StationEmail`, `TireCnt`, `MotorTracking`, `NextServiceDue`, `DryPrime`, `AirTank`, `Active`, `ModifiedDate`) VALUES
(1, 'Engine', 'SP0606', '1', 6, 'hr', 1500, 1, 1, 1, '0000-00-00 00:00:00'),
(2, 'Ambulance', 'FA1405', '1', 6, 'mi', 12345, 0, 0, 1, '0000-00-00 00:00:00'),
(3, 'Reserve Ambulance ', 'CA0805', '1', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(4, 'B/C Surb', 'CM1301', '1', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(5, 'Transport Engine', 'SP1401', '2', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(6, 'Reserve Ambulance', 'CA0808', '2', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(7, 'Engine', 'SP0603', '3', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(8, 'Wildland', 'DW0901', '3', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(9, 'Wildland', 'DW0902', '3', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(10, 'Reserve Engine', 'SP0801', '4', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(11, 'Ambulance', 'CA0906', '4', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(12, 'Reserve Quint', 'PQ0002', '4', 10, 'hr', 0, 1, 1, 1, '0000-00-00 00:00:00'),
(13, 'Reserve Quint', 'PQ9901', '5', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(14, 'Ambulance', 'CA0901', '5', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(15, 'Tower', 'ST0801', '6', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(16, 'Ambulance', 'CA0907', '6', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(17, 'Aux', 'FW0810', '6', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(18, 'Transport Engine', 'Wjordan', '7', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(19, 'Reserve Ambulance', 'Wjordan', '7', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(20, 'Type III', 'IW0601', '8', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(21, 'Ambulance', 'CA0912', '8', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(22, 'Aux', 'FW0602', '8', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(23, ' Reserve Engine', 'SP0602', '9', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(24, 'Ambulance', 'FA1403', '9', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(25, 'HM', 'PZ0601E', '9', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(26, 'Heavy RS', 'SR0901', '10', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(27, 'Ambulance', 'CA0905', '10', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(28, 'Reserve Engine', 'SP0612', '10', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(29, 'Quint', 'SQ0602', '11', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(30, 'Ambulance', 'CA0802', '11', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(31, 'Aux', 'FW0205', '11', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(32, 'Wildland', 'IW0602', '11', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(33, 'Water Tanker', 'IU9201', '11', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(34, 'Engine', 'SP0802', '12', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(35, 'Ambulance', 'FA1401', '12', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(36, 'Engine', 'SP0803', '13', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(37, 'Reserve Ambulance', 'FA0401', '13', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(38, 'Engine', 'SP0605', '14', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(39, 'Ambulance', 'CA0807', '14', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(40, 'Aux', 'FW0204', '14', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(41, 'Reserve Engine', 'PP0301', '14', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(42, 'Engine', 'SP0607', '15', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(43, 'Ambulance', 'CA0801', '15', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(44, 'Air & Light', 'IU9301', '15', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(45, 'Reserve Engine', 'SP0608', '16', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(46, 'Ambulance', 'CA0909', '16', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(47, 'Water Tender', 'IU9601', '16', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(48, 'Water Rescue', 'CM0512', '16', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(49, 'Toyota Truck', 'TL0813', '16', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(50, 'Engine', 'SP0604', '17', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(51, 'Ambulance', 'CA0809', '17', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(52, 'Engine', 'SQ0701', '18', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(53, 'Ambulance', 'FA1402', '18', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(54, 'B/C Surb', 'CM1303', '18', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(55, 'Engine', 'SP0901', '19', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(56, 'Ambulance', 'FA9901', '19', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(57, 'Aux', 'FW0201', '19', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(58, 'Quint', 'SQ0801', '20', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(59, 'Water Tender', 'KU1401', '20', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(60, 'Reserve Ambulance', 'FA9601', '20', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(61, 'Reserve Ambulance', 'FA0201', '20', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(62, 'Engine', 'SP0613', '21', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(63, 'Ambulance', 'CA0904', '21', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(64, 'Heavy RS', 'SR0601', '21', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(65, 'Aux', 'FW0401', '21', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(66, 'Engine', 'SP0610', '22', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(67, 'Ambulance', 'CA0903', '22', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(68, 'Aux', 'FW0811', '22', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(69, 'Engine', 'SP0614', '23', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(70, 'Ambulance', 'CA0910', '23', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(71, 'Aux', 'FW0603', '23', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(72, 'Crew Carrier', 'FW9901', '23', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(73, 'B/C Surb', 'CM1302', '23', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(74, 'Engine', 'SP0611', '24', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(75, 'Ambulance', 'FA1404', '24', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(76, 'Tractor', 'KZ0801E', '24', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(77, 'HM', 'PZ9101E', '24', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(78, 'Box Truck', 'IZ0301E', '24', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(79, ' Reserve Engine', 'SP0902', '25', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(80, 'Ambulance', 'CA0902', '25', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(81, 'Com Trailer', 'TU0201', '25', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(82, 'Aux', 'FW0101', '25', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(83, 'Ladder', 'KME0801', '26', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(84, 'Ambulance', 'DA1101', '26', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(85, 'B/C Surb', 'CM1304', '26', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(86, 'Engine', 'CP0701', '27', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(87, 'Aux', 'CL9701', '27', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(88, 'Ambulance', 'CA0908', '27', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(89, 'Quint', 'PQ9902', '28', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(90, 'Ambulance', 'FA9701', '28', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(91, 'Aux', 'FW0203', '28', 6, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(92, 'Wildland', 'FW0901', '28', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(93, 'Water Tender', 'KU1101', '28', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(94, 'Reserve Engine', 'PP9502', '29', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(95, 'Truck', 'PT9401', '29', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(96, 'Air & Light', 'PU9301', '29', 10, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(97, 'Engine', 'PP9501', '29', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(98, ' Reserve Engine', 'PQ0001', '29', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(99, ' Reserve Engine', 'SP0601', '29', 6, 'hr', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(100, 'Buggy', 'IW0801', '30', 4, 'mi', 0, 0, 0, 1, '0000-00-00 00:00:00'),
(101, 'apparatus', 'fleetNum', '0', 0, 'motorTracking', 0, 0, 0, 1, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `apparatuslocations`
--

CREATE TABLE IF NOT EXISTS `apparatuslocations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `StationID` int(11) NOT NULL,
  `ApparatusID` int(11) NOT NULL,
  `AsOfDate` date NOT NULL,
  `ModifiedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=103 ;

--
-- Dumping data for table `apparatuslocations`
--

INSERT INTO `apparatuslocations` (`ID`, `StationID`, `ApparatusID`, `AsOfDate`, `ModifiedDate`) VALUES
(1, 1, 1, '2014-12-13', '2014-12-13 19:34:56'),
(2, 1, 2, '2014-12-13', '2014-12-13 19:34:56'),
(3, 1, 3, '2014-12-13', '2014-12-13 19:34:56'),
(4, 1, 4, '2014-12-13', '2014-12-13 19:34:56'),
(5, 2, 5, '2014-12-13', '2014-12-13 19:34:56'),
(6, 2, 6, '2014-12-13', '2014-12-13 19:34:56'),
(7, 3, 7, '2014-12-13', '2014-12-13 19:34:56'),
(8, 3, 8, '2014-12-13', '2014-12-13 19:34:56'),
(9, 3, 9, '2014-12-13', '2014-12-13 19:34:56'),
(10, 4, 10, '2014-12-13', '2014-12-13 19:34:56'),
(11, 4, 11, '2014-12-13', '2014-12-13 19:34:56'),
(12, 4, 12, '2014-12-13', '2014-12-13 19:34:56'),
(13, 5, 13, '2014-12-13', '2014-12-13 19:34:56'),
(14, 5, 14, '2014-12-13', '2014-12-13 19:34:56'),
(15, 6, 15, '2014-12-13', '2014-12-13 19:34:56'),
(16, 6, 16, '2014-12-13', '2014-12-13 19:34:56'),
(17, 6, 17, '2014-12-13', '2014-12-13 19:34:56'),
(18, 7, 18, '2014-12-13', '2014-12-13 19:34:56'),
(19, 7, 19, '2014-12-13', '2014-12-13 19:34:56'),
(20, 8, 20, '2014-12-13', '2014-12-13 19:34:56'),
(21, 8, 21, '2014-12-13', '2014-12-13 19:34:56'),
(22, 8, 22, '2014-12-13', '2014-12-13 19:34:56'),
(23, 9, 23, '2014-12-13', '2014-12-13 19:34:56'),
(24, 9, 24, '2014-12-13', '2014-12-13 19:34:56'),
(25, 9, 25, '2014-12-13', '2014-12-13 19:34:56'),
(26, 10, 26, '2014-12-13', '2014-12-13 19:34:56'),
(27, 10, 27, '2014-12-13', '2014-12-13 19:34:56'),
(28, 10, 28, '2014-12-13', '2014-12-13 19:34:56'),
(29, 11, 29, '2014-12-13', '2014-12-13 19:34:56'),
(30, 11, 30, '2014-12-13', '2014-12-13 19:34:56'),
(31, 11, 31, '2014-12-13', '2014-12-13 19:34:56'),
(32, 11, 32, '2014-12-13', '2014-12-13 19:34:56'),
(33, 11, 33, '2014-12-13', '2014-12-13 19:34:56'),
(34, 12, 34, '2014-12-13', '2014-12-13 19:34:56'),
(35, 12, 35, '2014-12-13', '2014-12-13 19:34:56'),
(36, 13, 36, '2014-12-13', '2014-12-13 19:34:56'),
(37, 13, 37, '2014-12-13', '2014-12-13 19:34:56'),
(38, 14, 38, '2014-12-13', '2014-12-13 19:34:56'),
(39, 14, 39, '2014-12-13', '2014-12-13 19:34:56'),
(40, 14, 40, '2014-12-13', '2014-12-13 19:34:56'),
(41, 14, 41, '2014-12-13', '2014-12-13 19:34:56'),
(42, 15, 42, '2014-12-13', '2014-12-13 19:34:56'),
(43, 15, 43, '2014-12-13', '2014-12-13 19:34:56'),
(44, 15, 44, '2014-12-13', '2014-12-13 19:34:56'),
(45, 16, 45, '2014-12-13', '2014-12-13 19:34:56'),
(46, 16, 46, '2014-12-13', '2014-12-13 19:34:56'),
(47, 16, 47, '2014-12-13', '2014-12-13 19:34:56'),
(48, 16, 48, '2014-12-13', '2014-12-13 19:34:56'),
(49, 16, 49, '2014-12-13', '2014-12-13 19:34:56'),
(50, 17, 50, '2014-12-13', '2014-12-13 19:34:56'),
(51, 17, 51, '2014-12-13', '2014-12-13 19:34:56'),
(52, 18, 52, '2014-12-13', '2014-12-13 19:34:56'),
(53, 18, 53, '2014-12-13', '2014-12-13 19:34:56'),
(54, 18, 54, '2014-12-13', '2014-12-13 19:34:56'),
(55, 19, 55, '2014-12-13', '2014-12-13 19:34:56'),
(56, 19, 56, '2014-12-13', '2014-12-13 19:34:56'),
(57, 19, 57, '2014-12-13', '2014-12-13 19:34:56'),
(58, 20, 58, '2014-12-13', '2014-12-13 19:34:56'),
(59, 20, 59, '2014-12-13', '2014-12-13 19:34:56'),
(60, 20, 60, '2014-12-13', '2014-12-13 19:34:56'),
(61, 20, 61, '2014-12-13', '2014-12-13 19:34:56'),
(62, 21, 62, '2014-12-13', '2014-12-13 19:34:56'),
(63, 21, 63, '2014-12-13', '2014-12-13 19:34:56'),
(64, 21, 64, '2014-12-13', '2014-12-13 19:34:56'),
(65, 21, 65, '2014-12-13', '2014-12-13 19:34:56'),
(66, 22, 66, '2014-12-13', '2014-12-13 19:34:56'),
(67, 22, 67, '2014-12-13', '2014-12-13 19:34:56'),
(68, 22, 68, '2014-12-13', '2014-12-13 19:34:56'),
(69, 23, 69, '2014-12-13', '2014-12-13 19:34:56'),
(70, 23, 70, '2014-12-13', '2014-12-13 19:34:56'),
(71, 23, 71, '2014-12-13', '2014-12-13 19:34:56'),
(72, 23, 72, '2014-12-13', '2014-12-13 19:34:56'),
(73, 23, 73, '2014-12-13', '2014-12-13 19:34:56'),
(74, 24, 74, '2014-12-13', '2014-12-13 19:34:56'),
(75, 24, 75, '2014-12-13', '2014-12-13 19:34:56'),
(76, 24, 76, '2014-12-13', '2014-12-13 19:34:56'),
(77, 24, 77, '2014-12-13', '2014-12-13 19:34:56'),
(78, 24, 78, '2014-12-13', '2014-12-13 19:34:56'),
(79, 25, 79, '2014-12-13', '2014-12-13 19:34:56'),
(80, 25, 80, '2014-12-13', '2014-12-13 19:34:56'),
(81, 25, 81, '2014-12-13', '2014-12-13 19:34:56'),
(82, 25, 82, '2014-12-13', '2014-12-13 19:34:56'),
(83, 26, 83, '2014-12-13', '2014-12-13 19:34:56'),
(84, 26, 84, '2014-12-13', '2014-12-13 19:34:56'),
(85, 26, 85, '2014-12-13', '2014-12-13 19:34:56'),
(86, 27, 86, '2014-12-13', '2014-12-13 19:34:56'),
(87, 27, 87, '2014-12-13', '2014-12-13 19:34:56'),
(88, 27, 88, '2014-12-13', '2014-12-13 19:34:56'),
(89, 28, 89, '2014-12-13', '2014-12-13 19:34:56'),
(90, 28, 90, '2014-12-13', '2014-12-13 19:34:56'),
(91, 28, 91, '2014-12-13', '2014-12-13 19:34:56'),
(92, 28, 92, '2014-12-13', '2014-12-13 19:34:56'),
(93, 28, 93, '2014-12-13', '2014-12-13 19:34:56'),
(94, 29, 94, '2014-12-13', '2014-12-13 19:34:56'),
(95, 29, 95, '2014-12-13', '2014-12-13 19:34:56'),
(96, 29, 96, '2014-12-13', '2014-12-13 19:34:56'),
(97, 29, 97, '2014-12-13', '2014-12-13 19:34:56'),
(98, 29, 98, '2014-12-13', '2014-12-13 19:34:56'),
(99, 29, 99, '2014-12-13', '2014-12-13 19:34:56'),
(100, 30, 100, '2014-12-13', '2014-12-13 19:34:56'),
(101, 0, 101, '2014-12-13', '2014-12-13 19:34:56'),
(102, 1, 1, '2014-12-13', '2014-12-13 22:11:14');

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE IF NOT EXISTS `stations` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` text NOT NULL,
  `Number` varchar(11) NOT NULL,
  `StationEmail` varchar(255) NOT NULL,
  `ModifiedDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `Active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`),
  UNIQUE KEY `ID` (`ID`),
  UNIQUE KEY `ID_2` (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=31 ;

--
-- Dumping data for table `stations`
--

INSERT INTO `stations` (`ID`, `Name`, `Number`, `StationEmail`, `ModifiedDate`, `Active`) VALUES
(1, 'Millcreek', '101', 'station101@ufa-slco.org', '2014-12-31 02:20:17', 1),
(2, 'Magna', '102', 'station102@ufa-slco.org', '2014-12-31 02:18:31', 1),
(3, 'Herriman', '103', 'station103@ufa-slco.org', '2014-12-31 02:18:31', 1),
(4, 'Holliday', '104', 'station104@ufa-slco.org', '2014-12-31 02:18:32', 1),
(5, 'Draper', '105', 'station105@ufa-slco.org', '2014-12-31 02:18:32', 1),
(6, 'Millcreek', '106', 'station106@ufa-slco.org', '2014-12-31 02:18:32', 1),
(7, 'Kearns', '107', 'station107@ufa-slco.org', '2014-12-31 02:18:32', 1),
(8, 'Brighton', '108', 'station108@ufa-slco.org', '2014-12-31 02:18:32', 1),
(9, 'Kearns', '109', 'station109@ufa-slco.org', '2014-12-31 02:18:32', 1),
(10, 'Cottonwood Hights', '110', 'station110@ufa-slco.org', '2014-12-31 02:18:32', 1),
(11, 'Magna', '111', 'station111@ufa-slco.org', '2014-12-31 02:18:32', 1),
(12, 'Olympus', '112', 'station112@ufa-slco.org', '2014-12-31 02:18:32', 1),
(13, 'Snowbird', '113', 'station113@ufa-slco.org', '2014-12-31 02:18:32', 1),
(14, 'Draper', '114', 'station114@ufa-slco.org', '2014-12-31 02:18:32', 1),
(15, 'Copperton', '115', 'station115@ufa-slco.org', '2014-12-31 02:18:32', 1),
(16, 'Cottonwood Hights', '116', 'station116@ufa-slco.org', '2014-12-31 02:18:32', 1),
(17, 'Taylorsville', '117', 'station117@ufa-slco.org', '2014-12-31 02:18:32', 1),
(18, 'Taylorsville', '118', 'station118@ufa-slco.org', '2014-12-31 02:18:32', 1),
(19, 'Emigration', '119', 'station119@ufa-slco.org', '2014-12-31 02:18:32', 1),
(20, 'Riverton', '120', 'station120@ufa-slco.org', '2014-12-31 02:18:32', 1),
(21, 'Riverton', '121', 'station121@ufa-slco.org', '2014-12-31 02:18:32', 1),
(22, 'Draper', '122', 'station122@ufa-slco.org', '2014-12-31 02:18:32', 1),
(23, 'Herriman', '123', 'station123@ufa-slco.org', '2014-12-31 02:18:32', 1),
(24, 'Riverton', '124', 'station124@ufa-slco.org', '2014-12-31 02:18:32', 1),
(25, 'Midvale', '125', 'station125@ufa-slco.org', '2014-12-31 02:18:32', 1),
(26, 'Midvale', '126', 'station126@ufa-slco.org', '2014-12-31 02:18:32', 1),
(27, 'Eagle Mt', '251', 'station251@ufa-slco.org', '2014-12-31 02:18:32', 1),
(28, 'Eagle Mt', '252', 'station252@ufa-slco.org', '2014-12-31 02:18:32', 1),
(29, 'Fire Training', 'FT', 'firetraining@ufa-slco.org', '2014-12-31 02:18:32', 1),
(30, 'Camp Williams', 'CW', 'campwilliams2@ufa-slco.org', '2014-12-31 02:18:32', 1);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
