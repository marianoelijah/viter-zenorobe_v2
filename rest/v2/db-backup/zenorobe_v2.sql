-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 16, 2024 at 02:18 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zenorobe_v2`
--

-- --------------------------------------------------------

--
-- Table structure for table `zenorobe_banner`
--

CREATE TABLE `zenorobe_banner` (
  `banner_aid` int(1) NOT NULL,
  `banner_is_active` tinyint(11) NOT NULL,
  `banner_title` varchar(50) NOT NULL,
  `banner_image` varchar(20) NOT NULL,
  `banner_excerpt` varchar(20) NOT NULL,
  `banner_datetime` varchar(20) NOT NULL,
  `banner_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zenorobe_category`
--

CREATE TABLE `zenorobe_category` (
  `category_aid` int(11) NOT NULL,
  `category_is_active` tinyint(1) NOT NULL,
  `category_title` varchar(50) NOT NULL,
  `category_datetime` varchar(20) NOT NULL,
  `category_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `zenorobe_clothes`
--

CREATE TABLE `zenorobe_clothes` (
  `clothes_aid` int(11) NOT NULL,
  `clothes_is_active` tinyint(1) NOT NULL,
  `clothes_title` varchar(50) NOT NULL,
  `clothes_image` varchar(20) NOT NULL,
  `clothes_price` int(30) NOT NULL,
  `clothes_category_id` int(11) NOT NULL,
  `clothes_datetime` varchar(20) NOT NULL,
  `clothes_created` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `zenorobe_banner`
--
ALTER TABLE `zenorobe_banner`
  ADD PRIMARY KEY (`banner_aid`);

--
-- Indexes for table `zenorobe_category`
--
ALTER TABLE `zenorobe_category`
  ADD PRIMARY KEY (`category_aid`);

--
-- Indexes for table `zenorobe_clothes`
--
ALTER TABLE `zenorobe_clothes`
  ADD PRIMARY KEY (`clothes_aid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `zenorobe_banner`
--
ALTER TABLE `zenorobe_banner`
  MODIFY `banner_aid` int(1) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zenorobe_category`
--
ALTER TABLE `zenorobe_category`
  MODIFY `category_aid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `zenorobe_clothes`
--
ALTER TABLE `zenorobe_clothes`
  MODIFY `clothes_aid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
