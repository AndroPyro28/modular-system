-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 12, 2022 at 04:11 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `modulardb`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `courseName` varchar(255) NOT NULL,
  `schoolYear` int(11) NOT NULL,
  `section` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TeacherId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `courseName`, `schoolYear`, `section`, `createdAt`, `updatedAt`, `TeacherId`) VALUES
(1, 'BSCS', 1, 'A', '2022-01-10 15:40:19', '2022-01-10 15:40:19', NULL),
(2, 'BSIT', 2, 'A', '2022-01-10 15:40:19', '2022-01-10 15:40:19', NULL),
(3, 'BSOM', 3, 'A', '2022-01-10 15:40:22', '2022-01-10 15:40:22', NULL),
(4, 'BSIS', 4, 'A', '2022-01-10 15:40:24', '2022-01-10 15:40:24', NULL),
(5, 'BSIS', 1, 'B', '2022-01-10 15:40:26', '2022-01-10 15:40:26', NULL),
(6, 'BSIS', 2, 'B', '2022-01-10 15:40:35', '2022-01-10 15:40:35', NULL),
(7, 'BSIS', 3, 'B', '2022-01-10 15:40:37', '2022-01-10 15:40:37', NULL),
(8, 'BSIS', 4, 'B', '2022-01-10 15:40:38', '2022-01-10 15:40:38', NULL),
(9, 'BSIS', 1, 'C', '2022-01-10 15:40:40', '2022-01-10 15:40:40', NULL),
(10, 'BSIS', 2, 'C', '2022-01-10 15:40:45', '2022-01-10 15:40:45', NULL),
(11, 'BSIS', 3, 'C', '2022-01-10 15:40:47', '2022-01-10 15:40:47', NULL),
(12, 'BSIS', 4, 'C', '2022-01-10 15:40:49', '2022-01-10 15:40:49', NULL),
(13, 'BSIS', 1, 'D', '2022-01-10 15:40:51', '2022-01-10 15:40:51', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

CREATE TABLE `students` (
  `id` int(11) NOT NULL,
  `studentId` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `year` int(11) NOT NULL,
  `course` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CourseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`id`, `studentId`, `password`, `firstname`, `lastname`, `section`, `year`, `course`, `createdAt`, `updatedAt`, `CourseId`) VALUES
(1, 'student1', '123123', 'Andro', 'Eugenio', 'A', 1, 'BSCS', '2022-01-14 09:21:34', '2022-01-14 09:21:34', 1),
(2, 'student2', '123123', 'Jean', 'Correa', 'A', 2, 'BSIT', '2022-01-14 09:22:13', '2022-01-14 09:22:13', 2),
(3, 'student3', '123123', 'jhondel', 'Caranay', 'A', 3, 'BSOM', '2022-01-14 09:22:26', '2022-01-14 09:22:26', 3),
(4, 'student4', '123123', 'hans', 'domingo', 'A', 4, 'BSIS', '2022-01-14 09:22:49', '2022-01-14 09:22:49', 4),
(5, 'student5', '123123', 'roi', 'santos', 'B', 1, 'BSIS', '2022-01-14 09:23:09', '2022-01-14 09:23:09', 5),
(6, 'student6', '123123', 'Jonathan', 'Plana', 'A', 1, 'BSCS', '2022-01-14 09:21:34', '2022-01-14 09:21:34', 1),
(7, 'student7', '123123', 'James', 'pormento', 'A', 2, 'BSIT', '2022-01-14 09:22:13', '2022-01-14 09:22:13', 2),
(8, 'student8', '123123', 'Kyojoru', 'Rengoku', 'A', 3, 'BSOM', '2022-01-14 09:22:26', '2022-01-14 09:22:26', 3),
(9, 'student9', '123123', 'Tanjiro', 'kamado', 'A', 4, 'BSIS', '2022-01-14 09:22:49', '2022-01-14 09:22:49', 4),
(10, 'student10', '123123', 'inosoke', 'beast', 'B', 1, 'BSIS', '2022-01-14 09:23:09', '2022-01-14 09:23:09', 5),
(11, 'student1', '123123', 'uzui', 'Tengen', 'A', 1, 'BSCS', '2022-01-14 09:21:34', '2022-01-14 09:21:34', 1),
(12, 'student2', '123123', 'muzan', 'kikubutsi', 'A', 2, 'BSIT', '2022-01-14 09:22:13', '2022-01-14 09:22:13', 2),
(13, 'student3', '123123', 'nezuko', 'kamado', 'A', 3, 'BSOM', '2022-01-14 09:22:26', '2022-01-14 09:22:26', 3),
(14, 'student4', '123123', 'Zenitsu', 'thunderclap', 'A', 4, 'BSIS', '2022-01-14 09:22:49', '2022-01-14 09:22:49', 4),
(15, 'student5', '123123', 'Allan', 'Maglalang', 'B', 1, 'BSIS', '2022-01-14 09:23:09', '2022-01-14 09:23:09', 5),
(16, 'student6', '123123', 'Yoriichi', 'sunBreather', 'A', 1, 'BSCS', '2022-01-14 09:21:34', '2022-01-14 09:21:34', 1),
(17, 'student7', '123123', 'lady', 'tamayo', 'A', 2, 'BSIT', '2022-01-14 09:22:13', '2022-01-14 09:22:13', 2),
(18, 'student8', '123123', 'Brenan', 'valentine', 'A', 3, 'BSOM', '2022-01-14 09:22:26', '2022-01-14 09:22:26', 3),
(19, 'student9', '123123', 'Lester', 'Edianel', 'A', 4, 'BSIS', '2022-01-14 09:22:49', '2022-01-14 09:22:49', 4),
(20, 'student10', '123123', 'Jeffrey', 'Regidor', 'B', 1, 'BSIS', '2022-01-14 09:23:09', '2022-01-14 09:23:09', 5);

-- --------------------------------------------------------

--
-- Table structure for table `studentsansweredquestionaires`
--

CREATE TABLE `studentsansweredquestionaires` (
  `id` int(11) NOT NULL,
  `questionNumber` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `studentAnswer` varchar(255) DEFAULT NULL,
  `dedicatedAnswer` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `StudentsQuizeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentsansweredquestionaires`
--

INSERT INTO `studentsansweredquestionaires` (`id`, `questionNumber`, `question`, `studentAnswer`, `dedicatedAnswer`, `createdAt`, `updatedAt`, `StudentsQuizeId`) VALUES
(1, 1, '1 + 1?', '', '2', '2022-01-27 19:09:12', '2022-01-29 17:00:20', 41),
(2, 2, 'when covid starts to manifest?', '2013', '2019', '2022-01-27 19:09:15', '2022-01-27 19:20:32', 41),
(3, 3, 'How old is our earth now?', '4.543 billion years', '4.543 billion years', '2022-01-27 19:09:18', '2022-01-27 19:20:41', 41),
(4, 4, 'What is the largest planet in solar system?', 'jupiter', 'Jupiter', '2022-01-27 19:09:27', '2022-01-27 19:09:27', 41),
(5, 5, 'how many planets in solar system?', '5', '8', '2022-01-27 19:09:31', '2022-01-27 19:09:31', 41),
(6, 1, '1 + 1?', '', '2', '2022-01-27 19:12:55', '2022-01-29 17:00:20', 42),
(7, 2, 'when covid starts to manifest?', '2013', '2019', '2022-01-27 19:12:58', '2022-01-27 19:20:32', 42),
(8, 3, 'How old is our earth now?', '4.543 billion years', '4.543 billion years', '2022-01-27 19:13:01', '2022-01-27 19:20:41', 42),
(9, 4, 'What is the largest planet in solar system?', 'jupiter', 'Jupiter', '2022-01-27 19:13:07', '2022-01-27 19:13:07', 42),
(10, 5, 'how many planets in solar system?', '8', '8', '2022-01-27 19:13:16', '2022-01-27 19:13:16', 42),
(11, 6, '5 + 5', '12', '10', '2022-01-27 19:20:17', '2022-01-27 19:20:17', 41),
(12, 7, 'put true to correct', 'True', 'True', '2022-01-27 19:21:15', '2022-01-27 19:21:15', 41),
(13, 1, 'aaaaaaaaa', '', 'aaaaaaaaa', '2022-01-29 17:00:12', '2022-01-29 17:00:20', 45),
(14, 2, 'aaaa', 'True', 'True', '2022-01-29 17:00:23', '2022-01-29 17:00:23', 45),
(15, 1, 'si jeff ba ay gwapo?', 'True', 'True', '2022-02-04 16:14:42', '2022-02-04 16:14:42', 49),
(16, 2, 'malaki ba ang hotdog ni andro?', 'oo', 'oo', '2022-02-04 16:14:51', '2022-02-04 16:14:51', 49);

-- --------------------------------------------------------

--
-- Table structure for table `studentsquizes`
--

CREATE TABLE `studentsquizes` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `isSubmitted` tinyint(1) NOT NULL,
  `startDate` varchar(255) DEFAULT NULL,
  `expectedEnd` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `StudentId` int(11) DEFAULT NULL,
  `TeachersQuizeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `studentsquizes`
--

INSERT INTO `studentsquizes` (`id`, `score`, `fullname`, `section`, `isSubmitted`, `startDate`, `expectedEnd`, `createdAt`, `updatedAt`, `StudentId`, `TeachersQuizeId`) VALUES
(1, 0, 'jhondel Caranay', 'BSOM-3A', 1, NULL, NULL, '2022-01-26 04:44:31', '2022-02-04 16:14:52', 3, 3),
(2, 0, 'Kyojoru Rengoku', 'BSOM-3A', 1, NULL, NULL, '2022-01-26 04:44:31', '2022-02-04 16:14:52', 8, 3),
(3, 0, 'nezuko kamado', 'BSOM-3A', 1, NULL, NULL, '2022-01-26 04:44:31', '2022-02-04 16:14:52', 13, 3),
(4, 0, 'Brenan valentine', 'BSOM-3A', 1, NULL, NULL, '2022-01-26 04:44:31', '2022-02-04 16:14:52', 18, 3),
(5, 0, 'Andro Eugenio', 'BSCS-1A', 1, NULL, NULL, '2022-01-26 04:47:19', '2022-02-04 16:14:52', 1, 4),
(6, 0, 'Jonathan Plana', 'BSCS-1A', 1, NULL, NULL, '2022-01-26 04:47:19', '2022-02-04 16:14:52', 6, 4),
(7, 0, 'uzui Tengen', 'BSCS-1A', 1, NULL, NULL, '2022-01-26 04:47:19', '2022-02-04 16:14:52', 11, 4),
(8, 0, 'Yoriichi sunBreather', 'BSCS-1A', 1, NULL, NULL, '2022-01-26 04:47:19', '2022-02-04 16:14:52', 16, 4),
(9, 0, 'Jean Correa', 'BSIT-2A', 1, '2022-01-28', '02:18:05 am', '2022-01-26 08:08:49', '2022-02-04 16:14:52', 2, 6),
(10, 0, 'James pormento', 'BSIT-2A', 1, NULL, NULL, '2022-01-26 08:08:49', '2022-02-04 16:14:52', 7, 6),
(11, 0, 'muzan kikubutsi', 'BSIT-2A', 1, NULL, NULL, '2022-01-26 08:08:49', '2022-02-04 16:14:52', 12, 6),
(12, 0, 'lady tamayo', 'BSIT-2A', 1, NULL, NULL, '2022-01-26 08:08:49', '2022-02-04 16:14:52', 17, 6),
(13, 0, 'Jean Correa', 'BSIT-2A', 1, '2022-01-28', '02:37:05 am', '2022-01-26 11:06:51', '2022-02-04 16:14:52', 2, 7),
(14, 0, 'James pormento', 'BSIT-2A', 1, NULL, NULL, '2022-01-26 11:06:51', '2022-02-04 16:14:52', 7, 7),
(15, 0, 'muzan kikubutsi', 'BSIT-2A', 1, NULL, NULL, '2022-01-26 11:06:51', '2022-02-04 16:14:52', 12, 7),
(16, 0, 'lady tamayo', 'BSIT-2A', 1, NULL, NULL, '2022-01-26 11:06:51', '2022-02-04 16:14:52', 17, 7),
(41, 3, 'Andro Eugenio', 'BSCS-1A', 1, '2022-01-28', '03:30:07 am', '2022-01-27 19:03:36', '2022-02-04 16:14:52', 1, 1),
(42, 4, 'Jonathan Plana', 'BSCS-1A', 1, '2022-01-28', NULL, '2022-01-27 19:03:36', '2022-02-04 16:14:52', 6, 1),
(43, 0, 'uzui Tengen', 'BSCS-1A', 1, NULL, NULL, '2022-01-27 19:03:36', '2022-02-04 16:14:52', 11, 1),
(44, 0, 'Yoriichi sunBreather', 'BSCS-1A', 1, NULL, NULL, '2022-01-27 19:03:36', '2022-02-04 16:14:52', 16, 1),
(45, 1, 'Andro Eugenio', 'BSCS-1A', 1, '2022-01-30', '01:51:38 am', '2022-01-29 16:51:06', '2022-02-04 16:14:52', 1, 8),
(46, 0, 'Jonathan Plana', 'BSCS-1A', 1, NULL, NULL, '2022-01-29 16:51:06', '2022-02-04 16:14:52', 6, 8),
(47, 0, 'uzui Tengen', 'BSCS-1A', 1, NULL, NULL, '2022-01-29 16:51:06', '2022-02-04 16:14:52', 11, 8),
(48, 0, 'Yoriichi sunBreather', 'BSCS-1A', 1, NULL, NULL, '2022-01-29 16:51:06', '2022-02-04 16:14:52', 16, 8),
(49, 2, 'Andro Eugenio', 'BSCS-1A', 1, '2022-02-05', '00:24:12 am', '2022-02-04 16:13:50', '2022-02-04 16:14:51', 1, 9),
(50, 0, 'Jonathan Plana', 'BSCS-1A', 0, NULL, NULL, '2022-02-04 16:13:50', '2022-02-04 16:13:50', 6, 9),
(51, 0, 'uzui Tengen', 'BSCS-1A', 0, NULL, NULL, '2022-02-04 16:13:50', '2022-02-04 16:13:50', 11, 9),
(52, 0, 'Yoriichi sunBreather', 'BSCS-1A', 0, NULL, NULL, '2022-02-04 16:13:50', '2022-02-04 16:13:50', 16, 9);

-- --------------------------------------------------------

--
-- Table structure for table `teachers`
--

CREATE TABLE `teachers` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `teacherId` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachers`
--

INSERT INTO `teachers` (`id`, `firstname`, `lastname`, `subject`, `teacherId`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'minet', 'magbitang', 'programming', 'teacher1', '123123', '2022-01-10 15:36:16', '2022-01-10 15:36:16'),
(2, 'paulo', 'victoria', 'data structure algorithm', 'teacher2', '123123', '2022-01-10 15:36:36', '2022-01-10 15:36:36'),
(3, 'lynzel', 'benedita', 'Web Dev', 'teacher3', '123123', '2022-01-10 15:37:10', '2022-01-10 15:37:10'),
(4, 'abel', 'palero', 'dotnet', 'teacher4', '123123', '2022-01-10 15:37:28', '2022-01-10 15:37:28');

-- --------------------------------------------------------

--
-- Table structure for table `teachersquestionaires`
--

CREATE TABLE `teachersquestionaires` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `dedicatedAnswer` varchar(255) NOT NULL,
  `questionNumber` varchar(255) NOT NULL,
  `questionType` varchar(255) NOT NULL,
  `choice1` varchar(255) DEFAULT NULL,
  `choice2` varchar(255) DEFAULT NULL,
  `choice3` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TeacherId` int(11) DEFAULT NULL,
  `TeachersQuizeId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachersquestionaires`
--

INSERT INTO `teachersquestionaires` (`id`, `question`, `dedicatedAnswer`, `questionNumber`, `questionType`, `choice1`, `choice2`, `choice3`, `createdAt`, `updatedAt`, `TeacherId`, `TeachersQuizeId`) VALUES
(2, 'hehehe', 'True', '1', 'True/False', NULL, NULL, NULL, '2022-01-26 04:16:44', '2022-01-26 04:16:44', 1, 2),
(3, 'si jean ay pinakamaganda sa balat ng lupa', 'True', '1', 'True/False', NULL, NULL, NULL, '2022-01-26 04:18:01', '2022-01-26 04:18:01', 2, 3),
(4, '1', '1', '1', 'Single Select', '2', '3', '4', '2022-01-26 04:18:31', '2022-01-26 04:18:31', 2, 4),
(7, '1 + 1 ?', '2', '1', 'Single Select', '3', '4', '5', '2022-01-26 07:03:25', '2022-01-26 07:03:25', 2, 6),
(8, 'asd', 'True', '1', 'True/False', NULL, NULL, NULL, '2022-01-26 11:06:47', '2022-01-26 11:06:47', 2, 7),
(9, 'Si jean ba ay maganda?', 'True', '2', 'True/False', NULL, NULL, NULL, '2022-01-27 17:15:15', '2022-01-27 17:15:15', 2, 6),
(10, 'ano ang buong pangalan ni jean?', 'Jean Correa Eugenio', '3', 'Enumeration', NULL, NULL, NULL, '2022-01-27 17:15:36', '2022-01-27 17:15:36', 2, 6),
(11, 'binigyan si juan ng 20 pesos at bumili sya ng 15 pesos na kamatis tapos binigyan nya ng 3pesos ang pulebe, ang tanong magkano nalang ang natirang pera sa kamay nya?', '2', '4', 'Single Select', '1', '3', '4', '2022-01-27 17:47:30', '2022-01-27 17:47:30', 2, 6),
(12, '1 + 1?', '2', '1', 'Single Select', '3', '4', '5', '2022-01-27 18:53:46', '2022-01-27 18:53:46', 1, 1),
(13, 'when covid starts to manifest?', '2019', '2', 'Single Select', '2012', '2015', '2013', '2022-01-27 18:55:56', '2022-01-27 18:55:56', 1, 1),
(14, 'How old is our earth now?', '4.543 billion years', '3', 'Single Select', '4.542 billion years', '4.541 billion years', '4.540 billion years', '2022-01-27 18:58:13', '2022-01-27 18:58:13', 1, 1),
(15, 'What is the largest planet in solar system?', 'Jupiter', '4', 'Enumeration', NULL, NULL, NULL, '2022-01-27 19:01:26', '2022-01-27 19:01:26', 1, 1),
(16, 'how many planets in solar system?', '8', '5', 'Enumeration', NULL, NULL, NULL, '2022-01-27 19:02:05', '2022-01-27 19:02:05', 1, 1),
(17, '5 + 5', '10', '6', 'Single Select', '11', '12', '13', '2022-01-27 19:19:26', '2022-01-27 19:19:26', 1, 1),
(18, 'put true to correct', 'True', '7', 'True/False', NULL, NULL, NULL, '2022-01-27 19:19:42', '2022-01-27 19:19:42', 1, 1),
(19, 'aaaaaaaaa', 'aaaaaaaaa', '1', 'Enumeration', NULL, NULL, NULL, '2022-01-29 16:50:57', '2022-01-29 16:50:57', 1, 8),
(20, 'aaaa', 'True', '2', 'True/False', NULL, NULL, NULL, '2022-01-29 16:51:00', '2022-01-29 16:51:00', 1, 8),
(21, 'si jeff ba ay gwapo?', 'True', '1', 'True/False', NULL, NULL, NULL, '2022-02-04 16:13:21', '2022-02-04 16:13:21', 1, 9),
(22, 'malaki ba ang hotdog ni andro?', 'oo', '2', 'Single Select', 'hindi', 'yes at oo', 'no', '2022-02-04 16:13:44', '2022-02-04 16:13:44', 1, 9);

-- --------------------------------------------------------

--
-- Table structure for table `teachersquizes`
--

CREATE TABLE `teachersquizes` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `timeDuration` varchar(255) NOT NULL,
  `posted` tinyint(1) NOT NULL,
  `dateSubmission` varchar(255) DEFAULT NULL,
  `perfectScore` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `TeacherId` int(11) DEFAULT NULL,
  `TeachersSectionId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teachersquizes`
--

INSERT INTO `teachersquizes` (`id`, `title`, `timeDuration`, `posted`, `dateSubmission`, `perfectScore`, `createdAt`, `updatedAt`, `TeacherId`, `TeachersSectionId`) VALUES
(1, 'Assessment 1', '10min', 1, '2022-01-29', 7, '2022-01-26 04:16:18', '2022-01-27 19:19:47', 1, 1),
(2, 'hahaha', '30min', 0, '2022-01-27', 1, '2022-01-26 04:16:37', '2022-01-26 04:16:49', 1, 2),
(3, 'hotdog', '10min', 1, '2022-01-27', 1, '2022-01-26 04:17:45', '2022-01-26 04:44:31', 2, 3),
(4, 'hotdog123', '10min', 1, '2022-01-26', 1, '2022-01-26 04:18:21', '2022-01-26 04:47:19', 2, 13),
(6, 'HAHHH', '30min', 1, '2022-01-29', 4, '2022-01-26 07:03:13', '2022-01-27 17:47:34', 2, 8),
(7, 'aaaaaaa', '10min', 1, '2022-01-28', 1, '2022-01-26 11:06:42', '2022-01-26 15:35:58', 2, 8),
(8, 'aaaaaaaaa', '1hour', 1, '2022-01-31', 2, '2022-01-29 16:50:51', '2022-01-29 16:51:16', 1, 1),
(9, 'hotdog1', '10min', 1, '2022-02-05', 2, '2022-02-04 16:13:03', '2022-02-04 16:13:50', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `teacherssections`
--

CREATE TABLE `teacherssections` (
  `id` int(11) NOT NULL,
  `course` varchar(255) DEFAULT NULL,
  `year` int(11) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `CourseId` int(11) DEFAULT NULL,
  `TeacherId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacherssections`
--

INSERT INTO `teacherssections` (`id`, `course`, `year`, `subject`, `section`, `createdAt`, `updatedAt`, `CourseId`, `TeacherId`) VALUES
(1, 'BSCS', 1, 'WebD113', 'A', '2022-01-14 13:57:32', '2022-01-14 13:57:32', 1, 1),
(2, 'BSIT', 2, 'Crim113', 'A', '2022-01-14 13:58:20', '2022-01-14 13:58:20', 2, 1),
(3, 'BSOM', 3, 'ICT113', 'A', '2022-01-14 13:59:02', '2022-01-14 13:59:02', 3, 2),
(4, 'BSIS', 4, 'WebD113', 'A', '2022-01-14 13:59:21', '2022-01-14 13:59:21', 4, 3),
(5, 'BSIS', 1, 'DBMS113', 'B', '2022-01-14 13:59:45', '2022-01-14 13:59:45', 5, 2),
(6, 'BSIS', 1, 'WebD113', 'D', '2022-01-14 14:00:53', '2022-01-14 14:00:53', 13, 1),
(7, 'BSIS', 1, 'WebD113', 'C', '2022-01-14 14:01:07', '2022-01-14 14:01:07', 9, 1),
(8, 'BSIT', 2, 'ICT113', 'A', '2022-01-14 14:02:42', '2022-01-14 14:02:42', 2, 2),
(11, 'BSCS', 1, 'sex education', 'A', '2022-01-14 15:11:26', '2022-01-14 15:11:26', 1, 2),
(12, 'BSCS', 1, 'CRIM113', 'A', '2022-01-14 15:11:41', '2022-01-14 15:11:41', 1, 2),
(13, 'BSCS', 1, 'NSTP', 'A', '2022-01-14 15:12:23', '2022-01-14 15:12:23', 1, 2),
(14, 'BSIT', 2, 'NSTP', 'A', '2022-01-14 15:14:58', '2022-01-14 15:14:58', 2, 1),
(15, 'BSIT', 2, 'Sex Education', 'A', '2022-01-14 15:15:05', '2022-01-14 15:15:05', 2, 1),
(16, 'BSOM', 3, 'ICT113', 'A', '2022-01-14 15:15:16', '2022-01-14 15:15:16', 3, 3),
(17, 'BSCS', 1, 'ICT113', 'A', '2022-01-14 15:15:25', '2022-01-14 15:15:25', 1, 3);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeacherId` (`TeacherId`);

--
-- Indexes for table `students`
--
ALTER TABLE `students`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CourseId` (`CourseId`);

--
-- Indexes for table `studentsansweredquestionaires`
--
ALTER TABLE `studentsansweredquestionaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StudentsQuizeId` (`StudentsQuizeId`);

--
-- Indexes for table `studentsquizes`
--
ALTER TABLE `studentsquizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `StudentId` (`StudentId`),
  ADD KEY `TeachersQuizeId` (`TeachersQuizeId`);

--
-- Indexes for table `teachers`
--
ALTER TABLE `teachers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `teachersquestionaires`
--
ALTER TABLE `teachersquestionaires`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeacherId` (`TeacherId`),
  ADD KEY `TeachersQuizeId` (`TeachersQuizeId`);

--
-- Indexes for table `teachersquizes`
--
ALTER TABLE `teachersquizes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `TeacherId` (`TeacherId`),
  ADD KEY `TeachersSectionId` (`TeachersSectionId`);

--
-- Indexes for table `teacherssections`
--
ALTER TABLE `teacherssections`
  ADD PRIMARY KEY (`id`),
  ADD KEY `CourseId` (`CourseId`),
  ADD KEY `TeacherId` (`TeacherId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `students`
--
ALTER TABLE `students`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `studentsansweredquestionaires`
--
ALTER TABLE `studentsansweredquestionaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `studentsquizes`
--
ALTER TABLE `studentsquizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `teachers`
--
ALTER TABLE `teachers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `teachersquestionaires`
--
ALTER TABLE `teachersquestionaires`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `teachersquizes`
--
ALTER TABLE `teachersquizes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `teacherssections`
--
ALTER TABLE `teacherssections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`TeacherId`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `students`
--
ALTER TABLE `students`
  ADD CONSTRAINT `students_ibfk_1` FOREIGN KEY (`CourseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentsansweredquestionaires`
--
ALTER TABLE `studentsansweredquestionaires`
  ADD CONSTRAINT `studentsansweredquestionaires_ibfk_1` FOREIGN KEY (`StudentsQuizeId`) REFERENCES `studentsquizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `studentsquizes`
--
ALTER TABLE `studentsquizes`
  ADD CONSTRAINT `studentsquizes_ibfk_1` FOREIGN KEY (`StudentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `studentsquizes_ibfk_2` FOREIGN KEY (`TeachersQuizeId`) REFERENCES `teachersquizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachersquestionaires`
--
ALTER TABLE `teachersquestionaires`
  ADD CONSTRAINT `teachersquestionaires_ibfk_1` FOREIGN KEY (`TeacherId`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teachersquestionaires_ibfk_2` FOREIGN KEY (`TeachersQuizeId`) REFERENCES `teachersquizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teachersquizes`
--
ALTER TABLE `teachersquizes`
  ADD CONSTRAINT `teachersquizes_ibfk_1` FOREIGN KEY (`TeacherId`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teachersquizes_ibfk_2` FOREIGN KEY (`TeachersSectionId`) REFERENCES `teacherssections` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `teacherssections`
--
ALTER TABLE `teacherssections`
  ADD CONSTRAINT `teacherssections_ibfk_1` FOREIGN KEY (`CourseId`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `teacherssections_ibfk_2` FOREIGN KEY (`TeacherId`) REFERENCES `teachers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
