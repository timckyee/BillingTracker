-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Feb 22, 2022 at 05:59 AM
-- Server version: 5.5.68-MariaDB
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `BillingTracker`
--
CREATE DATABASE IF NOT EXISTS `BillingTracker` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `BillingTracker`;

-- --------------------------------------------------------

--
-- Table structure for table `BillingAccount`
--

CREATE TABLE IF NOT EXISTS `BillingAccount` (
  `BillingAccountId` int(11) NOT NULL,
  `AccountName` varchar(50) NOT NULL,
  `AccountNumber` varchar(50) NOT NULL,
  `AccountUserName` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `BillingAccountUserBills`
--

CREATE TABLE IF NOT EXISTS `BillingAccountUserBills` (
  `BillsId` int(11) NOT NULL,
  `BillingAccountId` int(11) NOT NULL,
  `BillingDate` date DEFAULT NULL,
  `DueDate` date NOT NULL,
  `BillingNumber` varchar(50) DEFAULT NULL,
  `AmountDue` float(10,2) NOT NULL,
  `PaidDate` date DEFAULT NULL,
  `PaymentMethod` int(11) DEFAULT NULL,
  `AmountPaid` float(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `EmailQueue`
--

CREATE TABLE IF NOT EXISTS `EmailQueue` (
  `EmailQueueId` int(11) NOT NULL,
  `Subject` text NOT NULL,
  `Body` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `PaymentMethod`
--

CREATE TABLE IF NOT EXISTS `PaymentMethod` (
  `PaymentMethodId` int(11) NOT NULL,
  `PaymentMethod` varchar(28) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `BillingAccount`
--
ALTER TABLE `BillingAccount`
  ADD PRIMARY KEY (`BillingAccountId`);

--
-- Indexes for table `BillingAccountUserBills`
--
ALTER TABLE `BillingAccountUserBills`
  ADD PRIMARY KEY (`BillsId`);

--
-- Indexes for table `EmailQueue`
--
ALTER TABLE `EmailQueue`
  ADD PRIMARY KEY (`EmailQueueId`);

--
-- Indexes for table `PaymentMethod`
--
ALTER TABLE `PaymentMethod`
  ADD PRIMARY KEY (`PaymentMethodId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `BillingAccount`
--
ALTER TABLE `BillingAccount`
  MODIFY `BillingAccountId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `BillingAccountUserBills`
--
ALTER TABLE `BillingAccountUserBills`
  MODIFY `BillsId` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `EmailQueue`
--
ALTER TABLE `EmailQueue`
  MODIFY `EmailQueueId` int(11) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
