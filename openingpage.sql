-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jun 19, 2018 at 09:54 PM
-- Server version: 5.7.19-log
-- PHP Version: 5.6.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `openingpage`
--

-- --------------------------------------------------------

--
-- Table structure for table `created_list`
--

CREATE TABLE `created_list` (
  `indx` int(11) NOT NULL,
  `ModelID` varchar(500) NOT NULL,
  `ImageID` varchar(500) NOT NULL,
  `ListID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `created_list`
--

INSERT INTO `created_list` (`indx`, `ModelID`, `ImageID`, `ListID`) VALUES
(1, 'model-11-22', 'img-00-11', 1),
(2, 'model-00-11', 'img-00-11', 10),
(3, 'model-00-11', 'img-00-11', 16466),
(4, 'model-00-11', 'img-00-11', 39225);

-- --------------------------------------------------------

--
-- Table structure for table `lists`
--

CREATE TABLE `lists` (
  `indx` int(11) NOT NULL,
  `List_Name` varchar(300) NOT NULL,
  `Created_Date` date NOT NULL,
  `Created_By` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `lists`
--

INSERT INTO `lists` (`indx`, `List_Name`, `Created_Date`, `Created_By`) VALUES
(1, 'asd Lista', '2019-06-20', 'Petar Opacic'),
(2, 'Proba Lista', '2018-06-19', 'Petar Opacic'),
(3, 'Proba Lista', '2018-06-19', 'Petar Opacic');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `created_list`
--
ALTER TABLE `created_list`
  ADD PRIMARY KEY (`indx`);

--
-- Indexes for table `lists`
--
ALTER TABLE `lists`
  ADD PRIMARY KEY (`indx`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `created_list`
--
ALTER TABLE `created_list`
  MODIFY `indx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `lists`
--
ALTER TABLE `lists`
  MODIFY `indx` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
