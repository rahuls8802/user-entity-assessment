-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2024 at 10:42 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_entity_assessment`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `dob`, `contact_no`, `created_at`, `updated_at`) VALUES
(1, 'Rahul Singh', 'rahul@gmail.com', '$2y$10$0k9oIq7BjDJuDBuxotZOYO7ThRHYAZhssBXk1/Ayu0QqPxU5pPNt2', '2014-01-15', '9920716913', '2024-12-14 07:37:53', '2024-12-14 09:11:32'),
(4, 'Raj Singh', 'rajs@gmail.com', '$2y$10$S2f2ZG/Qh5dONowfjgIIceMPxX/CcGXIdGroD51JiQnO/QfQB61qS', '1997-08-15', '9920716914', '2024-12-14 08:02:14', '2024-12-14 09:22:28'),
(5, 'Sanjay Gupta', 'sanjay@gmail.com', '$2y$10$MgWnbO7LLp3/f6PQDtfrbOc3odp.DwQp1txiXkJOENr.z1hP8Y4sW', '1998-08-15', '9920716915', '2024-12-14 08:03:12', '2024-12-14 08:03:12'),
(8, 'Griffin Hutchinson', 'tavamy@mailinator.com', '$2y$10$IlL6jArUT8m1IuXToqwpQez.UYF3paQUqb/hyrQmX/B.Fd1iL8pHO', '2013-07-17', '6352145785', '2024-12-14 09:20:53', '2024-12-14 09:20:53'),
(9, 'Scarlet Powell', 'lydukuq@mailinator.com', '$2y$10$2/WdoTz7sWc0vTmNQZIFneD.l8rI7DKa192d1TGDbW19/uiPE13ZW', '2017-01-25', '9654125478', '2024-12-14 09:21:30', '2024-12-14 09:21:30'),
(10, 'Griffin Mueller', 'firo@mailinator.com', '$2y$10$ARNPLuwhkCBosgq4SQ/QmOK4xwxbtBWGaTi8RtMMPBcnR.wUR0JCK', '1991-07-24', '6352145874', '2024-12-14 09:21:53', '2024-12-14 09:21:53');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
