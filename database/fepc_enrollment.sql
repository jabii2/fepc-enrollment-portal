-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 20, 2026 at 12:26 AM
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
-- Database: `fepc_enrollment`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `full_name` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `username`, `password`, `email`, `full_name`, `created_at`, `updated_at`) VALUES
(1, 'admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@fepc.edu.ph', 'System Administrator', '2026-02-19 12:27:28', '2026-02-19 12:27:28');

-- --------------------------------------------------------

--
-- Table structure for table `enrollments`
--

CREATE TABLE `enrollments` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `middle_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` enum('male','female') NOT NULL,
  `civil_status` enum('single','married','widowed','separated') DEFAULT NULL,
  `nationality` varchar(50) DEFAULT 'Filipino',
  `religion` varchar(50) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `education_level` enum('shs','college') NOT NULL,
  `year_level` varchar(20) NOT NULL,
  `program` varchar(10) NOT NULL,
  `semester` enum('1st','2nd') NOT NULL,
  `previous_school` varchar(200) DEFAULT NULL,
  `enrollee_type` enum('new','cross','transfer','old') NOT NULL,
  `guardian_name` varchar(100) NOT NULL,
  `guardian_relation` enum('mother','father','guardian','spouse','sibling','other') NOT NULL,
  `guardian_phone` varchar(20) NOT NULL,
  `guardian_address` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `selected_subjects` text DEFAULT NULL,
  `documents_submitted` tinyint(1) DEFAULT 0,
  `enrollment_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollments`
--

INSERT INTO `enrollments` (`id`, `first_name`, `middle_name`, `last_name`, `birth_date`, `gender`, `civil_status`, `nationality`, `religion`, `address`, `phone_number`, `email`, `education_level`, `year_level`, `program`, `semester`, `previous_school`, `enrollee_type`, `guardian_name`, `guardian_relation`, `guardian_phone`, `guardian_address`, `status`, `selected_subjects`, `documents_submitted`, `enrollment_date`, `updated_at`, `created_at`) VALUES
(2, 'marvin', 'D', 'Sison', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'shs', '', '', '1st', NULL, 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', NULL, 0, '2026-02-19 10:59:54', '2026-02-19 17:59:54', '2026-02-19 17:59:54'),
(3, 'jayvie', 'p', 'melo', '2001-02-20', 'male', '', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', '', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 18:26:06', '2026-02-19 18:26:06', '2026-02-19 18:26:06'),
(4, 'Clyde', 'D', 'cosep', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 18:50:41', '2026-02-19 18:50:41', '2026-02-19 18:50:41'),
(5, 'Marvin', 'D', 'Sison', '2001-02-20', 'female', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'old', 'dwadawa', 'father', '09223220439', 'QWEQWE', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 19:27:52', '2026-02-19 19:27:52', '2026-02-19 19:27:52'),
(6, 'wew', 'D', 'wew', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 19:41:29', '2026-02-19 19:41:29', '2026-02-19 19:41:29'),
(7, 'wew', 'D', 'wew', '2001-02-20', 'female', 'married', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 19:46:55', '2026-02-19 19:46:55', '2026-02-19 19:46:55'),
(8, 'wwwwwww', 'D', 'asdsadsadsa', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', '', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 19:51:48', '2026-02-19 19:51:48', '2026-02-19 19:51:48'),
(9, 'eeeeeee', 'e', 'eeeeeeeeeeeee', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'approved', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 20:03:21', '2026-02-19 20:24:04', '2026-02-19 20:03:21'),
(11, 'eeeeeee', 'e', 'eeeeeeeeeeeee', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'rejected', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 20:10:42', '2026-02-19 20:24:00', '2026-02-19 20:10:42'),
(12, 'sssssss', 'ssssss', 'sssssss', '2001-02-20', 'male', 'married', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'approved', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 20:16:31', '2026-02-19 20:23:56', '2026-02-19 20:16:31'),
(13, 'chix', '', 'dsa', '2001-02-20', 'female', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'btvted', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[]', 0, '2026-02-19 20:56:17', '2026-02-19 20:56:17', '2026-02-19 20:56:17'),
(14, 'kupal', 'D', 'dsa', '2001-02-20', 'male', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '1', 'bscs', '1st', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[\"4\",\"5\",\"6\",\"1\",\"2\",\"3\",\"8\",\"7\"]', 0, '2026-02-19 21:17:47', '2026-02-19 21:17:47', '2026-02-19 21:17:47'),
(15, 'nahh', 'D', 'dsa', '2001-02-20', 'female', 'single', 'Filipino', 'catholic', 'blk12 l25 oakland st sunshine county', '09229929921', 'nabemasm@rio.odn.ne.jp', 'college', '4', 'bshm', '2nd', 'OLRMS', 'new', 'dwadawa', 'mother', '09223220439', 'QWEQWE', 'pending', '[\"527\",\"526\"]', 0, '2026-02-19 23:18:06', '2026-02-19 23:18:06', '2026-02-19 23:18:06');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment_documents`
--

CREATE TABLE `enrollment_documents` (
  `id` int(11) NOT NULL,
  `enrollment_id` int(11) NOT NULL,
  `document_type` varchar(50) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_size` int(11) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `enrollment_documents`
--

INSERT INTO `enrollment_documents` (`id`, `enrollment_id`, `document_type`, `filename`, `original_filename`, `file_path`, `file_size`, `mime_type`, `uploaded_at`) VALUES
(5, 11, 'form137', '', '', 'api/uploads/doc_69976dbebd5de_1771531710.pdf', 0, '', '2026-02-19 20:10:42'),
(6, 11, 'goodmoral', '', '', 'api/uploads/doc_69976dc1dd370_1771531713.pdf', 0, '', '2026-02-19 20:10:42'),
(7, 11, 'birthcert', '', '', 'api/uploads/doc_69976dc4c5ba6_1771531716.pdf', 0, '', '2026-02-19 20:10:42'),
(8, 11, 'idphoto', '', '', 'api/uploads/doc_69976dc95304c_1771531721.jpg', 0, '', '2026-02-19 20:10:42'),
(9, 11, 'enrollmentform', '', '', 'api/uploads/doc_69976dcd24678_1771531725.jpg', 0, '', '2026-02-19 20:10:42'),
(10, 12, 'form137', '', '', 'api/uploads/doc_69976f8fde7e1_1771532175.jpg', 0, '', '2026-02-19 20:16:31'),
(11, 12, 'goodmoral', '', '', 'api/uploads/doc_69976f93b4a58_1771532179.jpg', 0, '', '2026-02-19 20:16:31'),
(12, 12, 'birthcert', '', '', 'api/uploads/doc_69976f971e0a6_1771532183.png', 0, '', '2026-02-19 20:16:31'),
(13, 12, 'idphoto', '', '', 'api/uploads/doc_69976f99eef2e_1771532185.png', 0, '', '2026-02-19 20:16:31'),
(14, 12, 'enrollmentform', '', '', 'api/uploads/doc_69976f9d2ad7d_1771532189.png', 0, '', '2026-02-19 20:16:31'),
(15, 14, 'form137', '', '', 'api/uploads/doc_69977dcaa981d_1771535818.jpg', 0, '', '2026-02-19 21:17:47'),
(16, 14, 'goodmoral', '', '', 'api/uploads/doc_69977dceb44d5_1771535822.pdf', 0, '', '2026-02-19 21:17:47'),
(17, 14, 'birthcert', '', '', 'api/uploads/doc_69977dd1b1780_1771535825.pdf', 0, '', '2026-02-19 21:17:47'),
(18, 14, 'idphoto', '', '', 'api/uploads/doc_69977dd526a19_1771535829.pdf', 0, '', '2026-02-19 21:17:47'),
(19, 14, 'enrollmentform', '', '', 'api/uploads/doc_69977dd9231b9_1771535833.pdf', 0, '', '2026-02-19 21:17:47');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment_subjects`
--

CREATE TABLE `enrollment_subjects` (
  `id` int(11) NOT NULL,
  `enrollment_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_filename` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL,
  `file_size` int(11) NOT NULL,
  `mime_type` varchar(100) NOT NULL,
  `image_type` enum('logo','banner','program','general') DEFAULT 'general',
  `is_active` tinyint(1) DEFAULT 1,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `filename`, `original_filename`, `file_path`, `file_size`, `mime_type`, `image_type`, `is_active`, `uploaded_at`) VALUES
(1, 'fepc_logo.png', 'fepc_logo.png', '/backend/uploads/fepc_logo.png', 25600, 'image/png', 'logo', 1, '2026-02-19 12:27:28'),
(2, 'fepc_logo.png', 'fepc_logo.png', '/backend/uploads/fepc_logo.png', 25600, 'image/png', 'logo', 1, '2026-02-19 12:33:01');

-- --------------------------------------------------------

--
-- Table structure for table `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `code` varchar(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text DEFAULT NULL,
  `education_level` enum('shs','college') NOT NULL,
  `duration` varchar(50) DEFAULT NULL,
  `requirements` text DEFAULT NULL,
  `career_prospects` text DEFAULT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `programs`
--

INSERT INTO `programs` (`id`, `code`, `name`, `description`, `education_level`, `duration`, `requirements`, `career_prospects`, `is_active`, `created_at`) VALUES
(11, 'ABM', 'Accountancy, Business and Management', 'This strand is designed for students who plan to take up business-related courses in college. It covers fundamental concepts in business operations, accounting principles, financial literacy, and marketing strategies. Students will develop analytical thinking, problem-solving skills, and business acumen essential for entrepreneurship and corporate management.', 'shs', '2 Years', 'Grade 10 completion with satisfactory grades, Basic Math proficiency, Interest in business and finance', 'Business Manager, Accountant, Financial Analyst, Marketing Specialist, Entrepreneur, Banking Officer, Sales Manager', 1, '2026-02-19 12:33:01'),
(12, 'IA', 'Industrial Arts', 'This strand focuses on developing technical skills in various industrial trades and crafts. Students learn practical skills in carpentry, welding, electrical work, plumbing, automotive mechanics, and other technical fields. The program emphasizes hands-on learning, safety procedures, and technical drawing to prepare students for skilled trades and technical careers.', 'shs', '2 Years', 'Grade 10 completion, Physical fitness for hands-on work, Interest in technical and mechanical work, Basic understanding of tools and equipment', 'Skilled Tradesperson, Technical Supervisor, Manufacturing Technician, Maintenance Specialist, Construction Worker, Automotive Mechanic, Equipment Operator', 1, '2026-02-19 12:33:01'),
(13, 'HE', 'Home Economics', 'This strand prepares students for careers in hospitality, culinary arts, fashion design, and home management. It emphasizes practical life skills, food preparation, nutrition, textile arts, and entrepreneurship in home-based businesses. Students develop creativity, attention to detail, and service-oriented mindset essential for the hospitality and fashion industries.', 'shs', '2 Years', 'Grade 10 completion, Creativity and artistic sense, Interest in culinary arts and fashion, Basic knowledge of nutrition and food safety', 'Chef, Fashion Designer, Hotel Manager, Caterer, Nutritionist, Interior Designer, Restaurant Owner, Event Planner', 1, '2026-02-19 12:33:01'),
(14, 'HUMSS', 'Humanities and Social Sciences', 'This strand is perfect for students interested in social sciences, literature, philosophy, and human behavior. It develops critical thinking, communication skills, and cultural awareness. Students explore history, psychology, sociology, and creative writing, preparing them for careers in education, media, social work, and public service.', 'shs', '2 Years', 'Grade 10 completion with good grades in English and Social Studies, Strong reading and writing skills, Interest in human behavior and society', 'Teacher, Journalist, Social Worker, Psychologist, Lawyer, Government Employee, Writer, Communications Specialist', 1, '2026-02-19 12:33:01'),
(15, 'ICT', 'Information and Communications Technology', 'This strand introduces students to the world of technology, covering computer programming, web development, digital graphics, and network administration. Students learn various programming languages, database management, and digital communication tools. The program prepares students for the rapidly growing technology sector.', 'shs', '2 Years', 'Grade 10 completion with good grades in Math and Science, Basic computer literacy, Logical thinking and problem-solving skills, Interest in technology', 'Software Developer, Web Designer, IT Support Specialist, Network Administrator, Database Administrator, Digital Marketing Specialist, Systems Analyst', 1, '2026-02-19 12:33:01'),
(16, 'BSCS', 'Bachelor of Science in Computer Science', 'A comprehensive program covering advanced software development, algorithms, data structures, artificial intelligence, and emerging technologies. Students learn multiple programming languages, software engineering principles, and system design. The program includes hands-on projects, internships, and exposure to cutting-edge technologies in the IT industry.', 'college', '4 Years', 'SHS Diploma or equivalent, Strong foundation in Mathematics and Logic, Programming aptitude test, Interview with department head', 'Software Engineer, Systems Analyst, Database Administrator, AI Specialist, Cybersecurity Expert, Mobile App Developer, IT Consultant, Research Scientist', 1, '2026-02-19 12:33:01'),
(17, 'BTVTED', 'Bachelor of Technical-Vocational Teacher Education', 'This program prepares graduates to become competent technical-vocational education teachers in various specializations. Students learn pedagogical methods, curriculum development, assessment techniques, and hands-on technical skills. The program combines theoretical knowledge with practical teaching experience through practicum and student teaching.', 'college', '4 Years', 'SHS Diploma with good academic standing, Teaching aptitude and communication skills, Technical background preferred, Passing score in admission test', 'Technical Education Teacher, Training Specialist, Curriculum Developer, Vocational Counselor, Corporate Trainer, Skills Assessment Officer, Educational Administrator', 1, '2026-02-19 12:33:01'),
(18, 'BSTM', 'Bachelor of Science in Tourism Management', 'Comprehensive training in tourism operations, destination management, hospitality services, and sustainable tourism development. Students learn about travel planning, tour guiding, hotel operations, and tourism marketing. The program includes field trips, internships in hotels and travel agencies, and exposure to international tourism standards.', 'college', '4 Years', 'SHS Diploma, Good communication and interpersonal skills, Service orientation, Physical fitness for travel, Basic knowledge of geography and culture', 'Tourism Officer, Travel Agent, Hotel Manager, Tour Guide, Event Coordinator, Resort Manager, Airline Staff, Destination Marketing Manager', 1, '2026-02-19 12:33:01'),
(19, 'BSHM', 'Bachelor of Science in Hospitality Management', 'Focuses on hotel operations, restaurant management, food service excellence, and customer service in the hospitality industry. Students learn front office operations, housekeeping management, food and beverage service, and financial management in hospitality businesses. The program includes internships in leading hotels and restaurants.', 'college', '4 Years', 'SHS Diploma, Service-oriented personality, Good grooming and presentation, Communication skills, Willingness to work in shifts and weekends', 'Hotel Manager, Restaurant Manager, Food Service Director, Catering Manager, Resort Operations Manager, Guest Relations Manager, Hospitality Consultant, Event Planner', 1, '2026-02-19 12:33:01'),
(20, 'BSBA', 'Bachelor of Science in Business Administration', 'Comprehensive business education covering management principles, marketing strategies, financial management, human resources, and entrepreneurship. Students develop leadership skills, strategic thinking, and business analysis capabilities. The program includes case studies, business simulations, and internships in various industries.', 'college', '4 Years', 'SHS Diploma with good academic record, Leadership potential, Analytical and critical thinking skills, Basic mathematics proficiency, Interest in business and management', 'Business Manager, Marketing Manager, Financial Analyst, Human Resources Specialist, Operations Manager, Business Consultant, Entrepreneur, Project Manager', 1, '2026-02-19 12:33:01');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `id` int(11) NOT NULL,
  `subject_code` varchar(20) NOT NULL,
  `subject_title` varchar(200) NOT NULL,
  `units` int(11) NOT NULL DEFAULT 0,
  `program` varchar(20) NOT NULL,
  `major` varchar(100) DEFAULT NULL,
  `year_level` int(11) NOT NULL DEFAULT 1,
  `semester` enum('1st','2nd') NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`id`, `subject_code`, `subject_title`, `units`, `program`, `major`, `year_level`, `semester`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'GE 111', 'Reading in the Phil. History', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(2, 'GE 112', 'Understanding the Self', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(3, 'GE 113', 'Intro to Computing', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(4, 'CS 111', 'Computer Programming 1', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(5, 'CS 112', 'Discrete Structure 1', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(6, 'CS 113', 'Computer System Servicing', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(7, 'PE 1', 'Physical Education 1', 2, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(8, 'NSTP 1', 'NSTP - CWTS', 3, 'bscs', NULL, 1, '1st', 1, '2026-02-19 14:12:28', '2026-02-19 14:12:28'),
(9, 'GE 211', 'Mathematics in Modern World', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(10, 'GE 212', 'Filipino 1 Malayunin sa Komunikasyon', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(11, 'CS 211', 'Data Structure and Algorithms', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(12, 'CS 212', 'Object Oriented Prog. 1 VB/C++', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(13, 'CS 213', 'Information Assurance and Security', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(14, 'CS 214', 'Social Issues and Professional', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(15, 'PE 3', 'Physical Education 3', 2, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(16, 'CS 215', 'Web Development Java Script/PHP', 3, 'bscs', NULL, 2, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(17, 'GE 311', 'Filipino 3 Retorika', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(18, 'CS 311', 'Appli. Development & Emerging Tech.', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(19, 'CS 312', 'Algorithms and Complexity', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(20, 'CS 313', 'Network & Communication 1', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(21, 'CS 314', 'Operating System 1 (Windows)', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(22, 'CS 315', 'Programming Language 1 (Java)', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(23, 'CS 316', 'Software Engineering 2', 3, 'bscs', NULL, 3, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(24, 'GE 411', 'Arts Appreciation', 3, 'bscs', NULL, 4, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(25, 'GE 412', 'Philippine Literature', 3, 'bscs', NULL, 4, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(26, 'CS 411', 'Graphics and Visual Computing', 3, 'bscs', NULL, 4, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(27, 'CS 412', 'IT Professional Ethics', 3, 'bscs', NULL, 4, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(28, 'CS 413', 'RDBMS', 3, 'bscs', NULL, 4, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(29, 'CS 414', 'CS - THESIS', 3, 'bscs', NULL, 4, '1st', 1, '2026-02-19 21:33:52', '2026-02-19 21:33:52'),
(86, 'GE 111', 'The Contemporary World', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(87, 'GE 112', 'Living in the I.T. Era', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(88, 'GE 113', 'Computer Programming 2 (C#)', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(89, 'CS 111', 'Discrete Structure 2', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(90, 'CS 112', 'Human Computer Interaction', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(91, 'CS 113', 'Visual Graphics Designing', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(92, 'PE 2', 'Physical Education 2', 2, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(93, 'NSTP 2', 'NSTP - CWTS', 3, 'bscs', NULL, 1, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(94, 'GE 211', 'Filipino 2 Panitikan', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(95, 'CS 211', 'Information Management', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(96, 'CS 212', 'Object Oriented Prog. 2 VB.NET', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(97, 'CS 213', 'Architecture and Organization', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(98, 'CS 214', 'System Development', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(99, 'CS 215', 'CCTV Wired and Wireless Technology', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(100, 'CS 216', 'Software Engineering 1', 3, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(101, 'PE 4', 'Physical Education 4', 2, 'bscs', NULL, 2, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(102, 'CS 321', 'Algorithms and Complexity (SAD)', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(103, 'CS 322', 'Automata Theory & Formal Languages', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(104, 'CS 323', 'Network Communication 2 (NET ADMIN)', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(105, 'CS 324', 'Operating Systems 2 (Ubuntu)', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(106, 'CS 325', 'Programming Language 2 (PHP)', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(107, 'CS 326', 'Intelligence Systems', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(108, 'MATH', 'Probability Statistics', 3, 'bscs', NULL, 3, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(109, 'GE 421', 'Gender and Society', 3, 'bscs', NULL, 4, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(110, 'GE 422', 'Life and Works of Rizal', 3, 'bscs', NULL, 4, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(111, 'CS 421', 'Practicum (OJT)', 3, 'bscs', NULL, 4, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(112, 'CS 422', 'Entrepreneurship For I.T.', 3, 'bscs', NULL, 4, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(113, 'CS 423', 'CS - THESIS 2', 3, 'bscs', NULL, 4, '2nd', 1, '2026-02-19 21:45:40', '2026-02-19 21:45:40'),
(114, 'GE 111', 'Reading in the Philippine History', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(115, 'GE 112', 'The Contemporary World', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(116, 'GE 113', 'Life and Works of Rizal', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(117, 'TLE 111', 'Introduction to Industrial Arts', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(118, 'TLE 112', 'Home Economics Literacy', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(119, 'TLE 113', 'Entrepreneurship', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(120, 'ED 111', 'Foundation of Special and Inclusive Education', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(121, 'PE 1', 'Physical Education 1', 2, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(122, 'NSTP 1', 'NSTP 1', 3, 'btvted', 'Computer Hardware Servicing', 1, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(123, 'GE 211', 'Arts Appreciation', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(124, 'GE 212', 'Ethics', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(125, 'GE 213', 'Environmental Science', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(126, 'GE 214', 'Philippine Literature', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(127, 'TLE 211', 'Teaching the Common Competencies in IA', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(128, 'TLE 212', 'Teaching the Common Competencies in HE', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(129, 'PCK 111', 'Facilitating Learner-Centered Approaches...', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(130, 'TECH 211', 'Intro To Computer Network', 3, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(131, 'PE 3', 'Physical Education 3', 2, 'btvted', 'Computer Hardware Servicing', 2, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(132, 'GE 311', 'Filipino 1 (Malayunin sa Komunikasyon)', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(133, 'PCK 311', 'Technology 1 for Teaching and Learning 1', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(134, 'PCK 312', 'Principles of Teaching', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(135, 'PCK 313', 'Curriculum Development and Evaluation...', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(136, 'PCK 314', 'Assessment of Student Learning 1', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(137, 'TECH 311', 'Data Communications', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(138, 'TECH 312', 'Basic Electronics', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(139, 'TECH 313', 'Operating System', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(140, 'TECH 314', 'Computer Programming (C++)', 3, 'btvted', 'Computer Hardware Servicing', 3, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(141, 'AS 325', 'Supervised Industry Training', 3, 'btvted', 'Computer Hardware Servicing', 3, '', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(142, 'TR 411', 'Technology Research 1 (Methods of Research)', 6, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(143, 'FS 412', 'Field Study 1', 3, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(144, 'GE 411', 'Filipino 3 (Retorika)', 3, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(145, 'TECH 411', 'Network Design Development', 3, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(146, 'TEACH 412', 'Artificial Intelligence', 3, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(147, 'ED 412', 'Teaching Profession', 3, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(148, 'WBL 412', 'Work-Based Learning with Emphasis on Trainer', 3, 'btvted', 'Computer Hardware Servicing', 4, '1st', 1, '2026-02-19 22:03:50', '2026-02-19 22:50:25'),
(149, 'GE 121', 'Understanding The Self', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(150, 'GE 122', 'Mathematics in the Modern World', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(151, 'GE 123', 'Living in the IT Era', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(152, 'TLE 121', 'Teaching ICT as an Exploratory Course', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(153, 'TLE 122', 'Introduction to Agriculture and Fisheries', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(154, 'ED 123', 'The Child and Adolescent Learner and Learning Principles', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(155, 'ED 124', 'The Teacher and Community, School Culture & Organizational Leadership...', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(156, 'PE 2', 'Physical Education 2', 2, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(157, 'NSTP 2', 'NSTP 2', 3, 'btvted', 'Computer Hardware Servicing', 1, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(158, 'GE 221', 'Purposive Communication', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(159, 'GE 222', 'Science, Technology and Society', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(160, 'GE 223', 'Gender and Society', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(161, 'GE 224', 'World Literature', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(162, 'TLE 221', 'Teaching the Common Competencies in IC', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(163, 'TLE 222', 'Teaching the Common Competencies in AF', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(164, 'PCK 221', 'The Andragogy of Learning Including Principles of Trainers Methodology I', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(165, 'TECH 221', 'PC Maintenance and Troubleshooting', 3, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(166, 'PE 4', 'Physical Education 4', 2, 'btvted', 'Computer Hardware Servicing', 2, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(167, 'GE 321', 'Filipino 2 (Panitikan)', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(168, 'TLE 321', 'Technology for Teaching and Learning 2 (TLE)', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(169, 'PCK 321', 'Strategies of Teaching', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(170, 'PCK 322', 'Building & Enhancing New Literacies Across the Curriculum...', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(171, 'PCK 323', 'Assessment of Student Learning 2 w/ focus on Trainers Methodology I and II', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(172, 'TECH 321', 'Computer System Servicing', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(173, 'TECH 322', 'Broadband Networking', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(174, 'TECH 323', 'Java Programming', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(175, 'TECH 324', 'Network Administration', 3, 'btvted', 'Computer Hardware Servicing', 3, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(176, 'PT 421', 'Practice Teaching', 6, 'btvted', 'Computer Hardware Servicing', 4, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(177, 'TR 421', 'Tech Research 2 (Undergrad Thesis/Research)', 6, 'btvted', 'Computer Hardware Servicing', 4, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(178, 'FS 421', 'Field Study 2', 3, 'btvted', 'Computer Hardware Servicing', 4, '2nd', 1, '2026-02-19 22:06:03', '2026-02-19 22:50:25'),
(179, 'GE 111', 'Reading in the Philippine History', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(180, 'GE 112', 'The Contemporary World', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(181, 'GE 113', 'Life and Works of Rizal', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(182, 'TLE 111', 'Introduction to Industrial Arts', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(183, 'TLE 112', 'Home Economics Literacy', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(184, 'TLE 113', 'Entrepreneurship', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(185, 'ED 111', 'Foundation of Special and Inclusive Education', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(186, 'PE 1', 'Physical Education 1', 2, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(187, 'NSTP 1', 'NSTP 1', 3, 'btvted', 'Computer Programming', 1, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(188, 'GE 211', 'Arts Appreciation', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(189, 'GE 212', 'Ethics', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(190, 'GE 213', 'Environmental Science', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(191, 'GE 214', 'Philippine Literature', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(192, 'TLE 211', 'Teaching the Common Competencies in IA', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(193, 'TLE 212', 'Teaching the Common Competencies in HE', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(194, 'PCK 111', 'Facilitating Learner – Centered Approaches with Emphasis on Trainers Methodology I', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(195, 'TECH 211', 'Programming C++', 3, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(196, 'PE 3', 'Physical Education 3', 2, 'btvted', 'Computer Programming', 2, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(197, 'GE 311', 'Filipino 1 (Malayunin sa Komunikasyon)', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(198, 'PCK 311', 'Technology 1 for Teaching and Learning 1', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(199, 'PCK 312', 'Principles of Teaching', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(200, 'PCK 313', 'Curriculum Development and Evalution with Emphasis on Trainers Methodology II', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(201, 'PCK 314', 'Assessment of Student Learning 1', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(202, 'TECH 311', 'Data Communications', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(203, 'TECH 312', 'Programming Language', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(204, 'TECH 313', 'Application Software', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(205, 'TECH 314', 'Database Management', 3, 'btvted', 'Computer Programming', 3, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(206, 'AS 325', 'Supervised Industry Training', 3, 'btvted', 'Computer Programming', 3, '', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(207, 'TR 411', 'Technology Research 1 (Methods of Research)', 6, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(208, 'FS 412', 'Field Study 1', 3, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(209, 'GE 411', 'Retorika', 3, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(210, 'TECH 411', 'Software Engineering 2', 3, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(211, 'TECH 412', 'Human Computer Interaction', 3, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(212, 'ED 412', 'Teaching Profession', 3, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(213, 'WBL 412', 'Work – Based Learning with Emphasis on Trainer', 3, 'btvted', 'Computer Programming', 4, '1st', 1, '2026-02-19 22:44:09', '2026-02-19 22:44:09'),
(214, 'GE 121', 'Understanding The Self', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(215, 'GE 122', 'Mathematics in the Modern World', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(216, 'GE 123', 'Living in the IT Era', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(217, 'TLE 121', 'Teaching ICT as an Exploratory Course', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(218, 'TLE 122', 'Introduction to Agriculture and Fisheries', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(219, 'ED 123', 'The Child and Adolescent Learner and Learning Principles', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(220, 'ED 124', 'The Teacher and Community, School Culture & Organizational Leadership with the focus on Phil TVET System', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(221, 'PE 2', 'Physical Education 2', 2, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(222, 'NSTP 2', 'NSTP 2', 3, 'btvted', 'Computer Programming', 1, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(223, 'GE 221', 'Purposive Communication', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(224, 'GE 222', 'Science, Technology and Society', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(225, 'GE 223', 'Gender and Society', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(226, 'GE 224', 'World Literature', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(227, 'TLE 221', 'Teaching the Common Competencies in IC', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(228, 'TLE 222', 'Teaching the Common Competencies in AF', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(229, 'PCK 221', 'The Andragogy of Learning Including Principles of Trainers Methodology I', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(230, 'TECH 221', 'Java Programming', 3, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(231, 'PE 4', 'Physical Education 4', 2, 'btvted', 'Computer Programming', 2, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(232, 'GE 321', 'Filipino 2 (Panitikan)', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(233, 'TLE 321', 'Technology for Teaching and Learning 2 (TLE)', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(234, 'PCK 321', 'Strategies of Teaching', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(235, 'PCK 322', 'Building & Enhancing New Literacies Across the Curriculum w/ Emphasis on the 21st Century', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(236, 'PCK 323', 'Assessment of Student Learning 2 w/ focus on Trainers Methodology I and II', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(237, 'TECH 321', 'Software Engineering 1', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(238, 'TECH 322', 'Visual Graphics', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(239, 'TECH 323', 'Operating System', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(240, 'TECH 324', 'Computer Organization', 3, 'btvted', 'Computer Programming', 3, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(241, 'PT 421', 'Practice Teaching', 6, 'btvted', 'Computer Programming', 4, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(242, 'TR 421', 'Tech Research 2 (Undergrad Thesis/ Research)', 6, 'btvted', 'Computer Programming', 4, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(243, 'FS 421', 'Field Study 2', 3, 'btvted', 'Computer Programming', 4, '2nd', 1, '2026-02-19 22:55:22', '2026-02-19 22:55:22'),
(244, 'GE 111', 'Reading in the Philippine History', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(245, 'GE 112', 'The Contemporary World', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(246, 'GE 113', 'Life and Works of Rizal', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(247, 'TLE 111', 'Introduction to Industrial Arts', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(248, 'TLE 112', 'Home Economics Literacy', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(249, 'TLE 113', 'Entrepreneurship', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(250, 'ED 111', 'Foundation of Special and Inclusive Education', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(251, 'PE 1', 'Physical Education 1', 2, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(252, 'NSTP 1', 'NSTP 1', 3, 'btvted', 'Automotive Technology', 1, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(253, 'GE 211', 'Arts Appreciation', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(254, 'GE 212', 'Ethics', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(255, 'GE 213', 'Environmental Science', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(256, 'GE 214', 'Philippine Literature', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(257, 'TLE 211', 'Teaching the Common Competencies in IA', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(258, 'TLE 212', 'Teaching the Common Competencies in HE', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(259, 'PCK 111', 'Facilitating Learner – Centered Approaches with Emphasis on Trainers Methodology I', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(260, 'TECH 211', 'Basic Power Conversion System Servicing', 3, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(261, 'PE 3', 'Physical Education 3', 2, 'btvted', 'Automotive Technology', 2, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(262, 'GE 311', 'Filipino 1 (Malayunin sa Komunikasyon)', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(263, 'PCK 311', 'Technology 1 for Teaching and Learning 1', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(264, 'PCK 312', 'Principles of Teaching', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(265, 'PCK 313', 'Curriculum Development and Evalution with Emphasis on Trainers Methodology II', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(266, 'PCK 314', 'Assessment of Student Learning 1', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(267, 'TECH 311', 'Metallic and Solid Color Painting Application', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(268, 'TECH 312', 'Internal Combustion Engine Servicing Repairs and Maintenance', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(269, 'TECH 313', 'Preventive Maintenance & Gas/Diesel Engine', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(270, 'TECH 314', 'Powertrain & Underchassis Servicing, Repairing and Maintenance', 3, 'btvted', 'Automotive Technology', 3, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(271, 'AS 325', 'Supervised Industry Training', 3, 'btvted', 'Automotive Technology', 3, '', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(272, 'TR 411', 'Technology Research 1 (Methods of Research)', 6, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(273, 'FS 412', 'Field Study 1', 3, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(274, 'GE 411', 'Retorika', 3, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(275, 'TECH 411', 'Automotive Body Repair & Substrate Preparation', 3, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(276, 'TECH 412', 'Automotive Service Shop Management', 3, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(277, 'ED 412', 'Teaching Profession', 3, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(278, 'WBL 412', 'Work – Based Learning with Emphasis on Trainers', 3, 'btvted', 'Automotive Technology', 4, '1st', 1, '2026-02-19 22:58:51', '2026-02-19 22:58:51'),
(279, 'GE 121', 'Understanding The Self', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(280, 'GE 122', 'Mathematics in the Modern World', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(281, 'GE 123', 'Living in the IT Era', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(282, 'TLE 121', 'Teaching ICT as an Exploratory Course', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(283, 'TLE 122', 'Introduction to Agriculture and Fisheries', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(284, 'ED 123', 'The Child and Adolescent Learner and Learning Principles', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(285, 'ED 124', 'The Teacher and Community, School Culture & Organizational Leadership with the focus on Phil TVET System', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(286, 'PE 2', 'Physical Education 2', 2, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(287, 'NSTP 2', 'NSTP 2', 3, 'btvted', 'Automotive Technology', 1, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(288, 'GE 221', 'Purposive Communication', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(289, 'GE 222', 'Science, Technology and Society', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(290, 'GE 223', 'Gender and Society', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(291, 'GE 224', 'World Literature', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(292, 'TLE 221', 'Teaching the Common Competencies in IC', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(293, 'TLE 222', 'Teaching the Common Competencies in AF', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(294, 'PCK 221', 'The Andragogy of Learning Including Principles of Trainers Methodology I', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(295, 'TECH 221', 'Motorcycle and Small Engine Servicing', 3, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(296, 'PE 4', 'Physical Education 4', 2, 'btvted', 'Automotive Technology', 2, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(297, 'GE 321', 'Filipino 2 (Panitikan)', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(298, 'TLE 321', 'Technology for Teaching and Learning 2 (TLE)', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(299, 'PCK 321', 'Strategies of Teaching', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(300, 'PCK 322', 'Building & Enhancing New Literacies Across the Curriculum w/ Emphasis on the 21st Century', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(301, 'PCK 323', 'Assessment of Student Learning 2 w/ focus on Trainers Methodology I and II', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(302, 'TECH 321', 'Engine Overhauling and Rebuilding', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(303, 'TECH 322', 'Basic Auto Aircon Servicing, Repairing and Maintenance', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(304, 'TECH 323', 'Automotive Electrical System Servicing, Repairing and Maintenance', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(305, 'TECH 324', 'Basic Electronic Engine Management System Operation and Service', 3, 'btvted', 'Automotive Technology', 3, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(306, 'PT 421', 'Practice Teaching', 6, 'btvted', 'Automotive Technology', 4, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(307, 'TR 421', 'Tech Research 2 (Undergrad Thesis/ Research)', 6, 'btvted', 'Automotive Technology', 4, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(308, 'FS 421', 'Field Study 2', 3, 'btvted', 'Automotive Technology', 4, '2nd', 1, '2026-02-19 23:00:09', '2026-02-19 23:00:09'),
(309, 'GE 111', 'Readings in the Philippine History', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(310, 'GE 112', 'The Contemporary World', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(311, 'GE 113', 'Life and Works of Rizal', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(312, 'TLE 111', 'Introduction to Industrial Arts', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(313, 'TLE 112', 'Home Economics Literacy', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(314, 'TLE 113', 'Entrepreneurship', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(315, 'ED 111', 'Foundation of Special and Inclusive Education', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(316, 'PE 1', 'Physical Education 1', 2, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(317, 'NSTP 1', 'NSTP 1', 3, 'btvted', 'Food Service Management', 1, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(318, 'GE 211', 'Arts Appreciation', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(319, 'GE 212', 'Ethics', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(320, 'GE 213', 'Environmental Science', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(321, 'GE 214', 'Philippine Literature', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(322, 'TLE 211', 'Teaching the Common Competencies in IA', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(323, 'TLE 212', 'Teaching the Common Competencies in HE', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(324, 'PCK 211', 'Facilitating Learner – Centered Approaches with Emphasis on Trainers Methodology I', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(325, 'FSM 211', 'Occupational Safety and Health Practices', 3, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(326, 'PE 3', 'Physical Education 3', 2, 'btvted', 'Food Service Management', 2, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(327, 'GE 311', 'Filipino 1 (Malayunin sa Komunikasyon)', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(328, 'PCK 311', 'Technology 1 for Teaching and Learning 1', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(329, 'PCK 312', 'Principles of Teaching', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(330, 'PCK 313', 'Curriculum Development and Evalution with Emphasis on Trainers Methodology II', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(331, 'PCK 314', 'Assessment of Student Learning 1', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(332, 'FSM 311', 'Meal Management', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(333, 'FSM 312', 'Basic Baking', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(334, 'FSM 313', 'Food Processing Packaging and Labelling', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(335, 'FSM 314', 'International Cuisine', 3, 'btvted', 'Food Service Management', 3, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(336, 'AS 325', 'Supervised Industry Training', 3, 'btvted', 'Food Service Management', 3, '', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(337, 'TR 411', 'Technology Research 1 (Methods of Research)', 6, 'btvted', 'Food Service Management', 4, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(338, 'FS 412', 'Field Study 1', 3, 'btvted', 'Food Service Management', 4, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(339, 'GE 411', 'Filipino 3 (Retorika)', 3, 'btvted', 'Food Service Management', 4, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(340, 'ED 412', 'Teaching Profession', 3, 'btvted', 'Food Service Management', 4, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(341, 'WBL 412', 'Work – Based Learning with Emphasis on Trainers', 3, 'btvted', 'Food Service Management', 4, '1st', 1, '2026-02-19 23:04:06', '2026-02-19 23:04:06'),
(342, 'GE 121', 'Understanding The Self', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(343, 'GE 122', 'Mathematics in the Modern World', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(344, 'GE 123', 'Living in the IT Era', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(345, 'TLE 121', 'Teaching ICT as an Exploratory Course', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(346, 'TLE 122', 'Introduction to Agriculture and Fisheries', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(347, 'ED 123', 'The Child and Adolescent Learner and Learning Principles', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(348, 'ED 124', 'The Teacher and Community, School Culture & Organizational Leadership with the focus on Phil TVET System', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(349, 'PE 2', 'Physical Education 2', 2, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(350, 'NSTP 2', 'NSTP 2', 3, 'btvted', 'Food Service Management', 1, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(351, 'GE 221', 'Purposive Communication', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(352, 'GE 222', 'Science, Technology and Society', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(353, 'GE 223', 'Gender and Society', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(354, 'GE 224', 'World Literature', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(355, 'TLE 221', 'Teaching the Common Competencies in IC', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(356, 'TLE 222', 'Teaching the Common Competencies in AF', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(357, 'PCK 221', 'The Andragogy of Learning Including Principles of Trainers Methodology I', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(358, 'FSM 221', 'Food Selection, Preparation', 3, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(359, 'PE 4', 'Physical Education 4', 2, 'btvted', 'Food Service Management', 2, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(360, 'GE 321', 'Filipino 2 (Panitikan)', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(361, 'TLE 321', 'Technology for Teaching and Learning 2 (TLE)', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(362, 'PCK 321', 'Strategies of Teaching', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(363, 'PCK 322', 'Building & Enhancing New Literacies Across the Curriculum w/ Emphasis on the 21st Century', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(364, 'PCK 323', 'Assessment of Student Learning 2 w/ focus on Trainers Methodology I and II', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(365, 'FSM 321', 'Advance Baking', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(366, 'FSM 322', 'Quantity Cookery', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(367, 'FSM 323', 'Cafeteria and Catering Management', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(368, 'FSM 324', 'Bartending and Bar Management', 3, 'btvted', 'Food Service Management', 3, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(369, 'PT 421', 'Practice Teaching', 6, 'btvted', 'Food Service Management', 4, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(370, 'TR 421', 'Tech Research 2 (Undergrad Thesis/ Research)', 6, 'btvted', 'Food Service Management', 4, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(371, 'FS 421', 'Field Study 2', 3, 'btvted', 'Food Service Management', 4, '2nd', 1, '2026-02-19 23:06:36', '2026-02-19 23:06:36'),
(372, 'GE 111', 'Understanding the Self', 3, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(373, 'GE 112', 'Mathematics in the Modern World', 3, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(374, 'BAC 111', 'Basic Microeconomics (Eco)', 3, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(375, 'CBME 111', 'Principles of Accounting 1', 3, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(376, 'ITE 111', 'Computer Productivity Tools', 3, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(377, 'PE 11', 'Physical Education 1 (Physical Fitness)', 2, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(378, 'NSTP 1', 'NSTP – CWTS 1', 3, 'bsba', 'BSBA', 1, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(379, 'GE 121', 'Reading in the Philippine History', 3, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(380, 'GE 122', 'The Contemporary World', 3, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(381, 'GE 123', 'Living in the I.T. Era', 3, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(382, 'CBME 121', 'Principles of Accounting 2', 6, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(383, 'BAC 122', 'Good Governance and Social Responsibility', 3, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(384, 'PE 2', 'Physical Education 2 (Rhythmic Dance)', 2, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(385, 'NSTP 2', 'NSTP – CWTS 2', 3, 'bsba', 'BSBA', 1, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(386, 'GE 211', 'Purposive Communication', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(387, 'GE 212', 'Science, Technology and Society', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(388, 'GE 213', 'Gender and Society', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(389, 'CBME 211', 'Strategic Management', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(390, 'PROF 211', 'Distribution Management', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(391, 'BAC 211', 'Human Resource Management', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(392, 'ITE 211', 'Fundamentals of BPO 1', 3, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(393, 'PE 2', 'Physical Education 3 (Individual/Dual Sport)', 2, 'bsba', 'BSBA', 2, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(394, 'GE 221', 'Art Appreciation', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(395, 'GE 222', 'Ethics', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(396, 'PROF 221', 'Advertising', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(397, 'PROF 222', 'Professional Salesmanship', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(398, 'CBME 221', 'Operations Management (TQM)', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(399, 'BAC 221', 'Obligation and Contract', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(400, 'ITE 221', 'Fundamentals of BPO 2', 3, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(401, 'PE 2', 'Physical Education 4 (Team Sports)', 2, 'bsba', 'BSBA', 2, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(402, 'GE 311', 'Malayunin na Komunikasyon', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(403, 'GE 312', 'Life and Works of Rizal', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(404, 'ITE 311', 'Fundamentals of Enterprise Data Management', 2, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(405, 'ELEC 311', 'Entrepreneurial Management', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(406, 'ELEC 312', 'Strategic Marketing Management', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22');
INSERT INTO `subjects` (`id`, `subject_code`, `subject_title`, `units`, `program`, `major`, `year_level`, `semester`, `is_active`, `created_at`, `updated_at`) VALUES
(407, 'BAC 311', 'International Business and Trade', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(408, 'PROF 311', 'Retail Management', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(409, 'PROF 312', 'Pricing Strategy', 3, 'bsba', 'BSBA', 3, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(410, 'GE 321', 'Panitikan', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(411, 'GE 322', 'Entrepreneurial Mind', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(412, 'ITE 321', 'Fundamentals of Business Analytics', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(413, 'BAC 321', 'Income Taxation', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(414, 'PROF 321', 'Marketing Management', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(415, 'PROF 322', 'Product Management', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(416, 'ELEC 321', 'Sales Management', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(417, 'ELEC 322', 'Cooperative Management', 3, 'bsba', 'BSBA', 3, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(418, 'PROF 411', 'Marketing Research', 3, 'bsba', 'BSBA', 4, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(419, 'BAC 411', 'Business Research', 3, 'bsba', 'BSBA', 4, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(420, 'ITE 411', 'Fundamentals of Analytics Modelling', 3, 'bsba', 'BSBA', 4, '1st', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(421, 'BAC 421', 'Feasibility Study', 3, 'bsba', 'BSBA', 4, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(422, 'PRAC 421', 'Practicum (OJT 400hours)', 6, 'bsba', 'BSBA', 4, '2nd', 1, '2026-02-19 23:10:22', '2026-02-19 23:10:22'),
(423, 'GEEUT 101 – 1', 'Euthenics', 1, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(424, 'GEMMW 101', 'Mathematics in the Modern World', 3, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(425, 'GESM 101', 'Strategic Management and Total Quality Management', 3, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(426, 'GEUS 101', 'Understanding Self', 3, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(427, 'THC 101', 'Macro Perspective of Tourism and Hospitality', 3, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(428, 'THC 102', 'Risk Management as Applied to Safety, Security and Sanitation', 3, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(429, 'PE 1', 'Physical Fitness', 2, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(430, 'NSTP 1', 'NSTP-CWTS 1', 3, 'bstm', 'Tourism Management', 1, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(431, 'GEPC 102 - A', 'Purposive Communication 1', 3, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(432, 'MIS 101', 'Computer Productivity Tools', 2, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(433, 'TPC 102', 'Global Culture and Tourism Geography', 3, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(434, 'TPC 102 -1', 'Sustainable Tourism', 3, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(435, 'THC 103', 'Philippine Culture and Tourism Geography', 3, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(436, 'THC 104', 'Micro Perspective of Tourism and Hospitality', 3, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(437, 'PE 2', 'Rhythmic Activities', 2, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(438, 'NSTP 2', 'NSTP – CWTS 2', 3, 'bstm', 'Tourism Management', 1, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(439, 'GEPC 201-B', 'Purposive Communication 2', 3, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(440, 'TME 201', 'Cruise Tourism', 3, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(441, 'TME 201 - 1', 'Accommodation Operation and Management', 3, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(442, 'TPC 201', 'Transportation Management', 3, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(443, 'TPC 201 - 1', 'Foreign Language 1', 3, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(444, 'THC 201', 'Quality Service Management in Tourism and Hospitality', 3, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(445, 'PE 3', 'Individual/ Dual Sports', 2, 'bstm', 'Tourism Management', 2, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(446, 'GEAA 202', 'Art Appreciation', 3, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(447, 'GERPH 202', 'Readings in Philippine History', 3, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(448, 'TME 202', 'Environmental and Conservation Tourism', 3, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(449, 'TPC 202 - 1', 'Foreign Language 2', 3, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(450, 'TPC 202 - 2', 'Introduction to Meeting, Incentives Conference and Events Management', 3, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(451, 'TPC 202 - 3', 'Tourism Policy Planning and Development', 3, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(452, 'PE 4', 'Team Sports', 2, 'bstm', 'Tourism Management', 2, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(453, 'GESTS 301', 'Science, Technology and Society', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(454, 'GECW 301', 'The Contemporary World', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(455, 'GEF 301', 'Filipino 1:Instrukturang Wikang Pilipino', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(456, 'TME 301', 'Corporate Travel Management', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(457, 'TPC 301', 'Applied Business Tools and Technologies in Tourism', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(458, 'THC 301', 'Tourism and Hospitality Marketing', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(459, 'THC 301 - 1', 'Multicultural Diversity in Workplace for Tourism Professional', 3, 'bstm', 'Tourism Management', 3, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(460, 'CBOM 302', 'Operations Management', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(461, 'GEF 302', 'Filipino 2: Introduksyon sa Pamamahayag', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(462, 'GEM 302', 'The Entrepreneurial Mind', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(463, 'TME 302', 'Travel Writing and Photography', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(464, 'TPC 302', 'Tour and Travel Management', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(465, 'THC 302', 'Professional Development and Applied Ethics', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(466, 'THC 302 - 1', 'Legal Aspects in Tourism and Hospitality', 3, 'bstm', 'Tourism Management', 3, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(467, 'THC 401', 'Entrepreneurship in Tourism And Hospitality', 3, 'bstm', 'Tourism Management', 4, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(468, 'BPO 401', 'Fundamentals of BPO', 3, 'bstm', 'Tourism Management', 4, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(469, 'GERLW 401', 'Rizal’s Life and Works', 3, 'bstm', 'Tourism Management', 4, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(470, 'GEPP 401', 'Panitikang Pilipino', 3, 'bstm', 'Tourism Management', 4, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(471, 'TPC 401', 'Research in Tourism (Methods of Research)', 3, 'bstm', 'Tourism Management', 4, '1st', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(472, 'OJTPR 402', 'BSTM Practicum (600hrs)', 6, 'bstm', 'Tourism Management', 4, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(473, 'TPC', 'Research in Tourism 2: Thesis Writing)', 6, 'bstm', 'Tourism Management', 4, '2nd', 1, '2026-02-19 23:13:25', '2026-02-19 23:13:25'),
(474, 'GEEUT 101-1', 'Euthenics', 1, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(475, 'GEMMW 101', 'Mathematics in the Modern World', 3, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(476, 'GENSTP 101', 'National Service Training Program 1', 3, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(477, 'GEPE 101', 'Physical Fitness 1', 3, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(478, 'GESM 101', 'Strategic Management and Total Quality Management', 2, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(479, 'GEUS', 'Understanding the Self', 3, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(480, 'THC 101', 'Macro Perspective of Tourism and Hospitality', 3, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(481, 'THC 102', 'Risk Management as Applied to Safety, Security and Sanitation', 3, 'bshm', 'Hospitality Management', 1, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(482, 'GENSTP 102', 'National Service Training Program 2', 3, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(483, 'GEPE 102', 'Physical Fitness 2', 2, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(484, 'GEPC 102 - A', 'Purposive Communication 2', 3, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(485, 'HPC 101', 'Kitchen Essentials and Basic Food Preparation', 3, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(486, 'MIS 101', 'Computer Productivity Tools', 2, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(487, 'THC 103', 'Philippine Culture and Tourism Geography', 3, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(488, 'THC 104', 'Micro Perspective of Tourism and Hospitality', 3, 'bshm', 'Hospitality Management', 1, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(489, 'GEPC 201 - B', 'Purposive Communication 2', 3, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(490, 'GEPE 201', 'Physical Education 3', 2, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(491, 'HMPE 101', 'Hotel Front Office Operations Management', 3, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(492, 'HMPE 102', 'Philippine Regional Cuisines with Food Styling and Design', 2, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(493, 'HPC 102', 'Fundamentals in Lodging Operations', 3, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(494, 'HPC 103', 'Foreign Language 1', 3, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(495, 'HPC 105', 'Quality Service Management in Tourism and Hospitality', 3, 'bshm', 'Hospitality Management', 2, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(496, 'GEAA 202', 'Art Appreciation', 3, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(497, 'GEPE 202', 'Physical Education 4', 2, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(498, 'GEPRH 202', 'Reading in Philippine History', 3, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(499, 'HMPE 103', 'International Cuisines with Food Styling and Design', 2, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(500, 'HPC 104', 'Supply Chain Management in Hospitality Industry', 3, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(501, 'HPC 104', 'Fundamentals in Food Service Operations', 3, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(502, 'HPC 106', 'Introduction to Meetings, Incentives, Conferences, and Events Management (MICE)', 3, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(503, 'HPC 107', 'Foreign Language', 3, 'bshm', 'Hospitality Management', 2, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(504, 'GESTS 301', 'Science, Technology and Society', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(505, 'GECW 301', 'The Contemporary World', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(506, 'GEF 301 - A', 'Filipino 2: Instrukturang Wikang Pilipino', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(507, 'HMPE 104', 'Pastry Arts and Bakery Management', 2, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(508, 'HPC 108', 'Applied Business Tools and Technologies in Hospitality', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(509, 'GEET 301', 'Ethics', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(510, 'THC 106', 'Tourism and Hospitality Marketing', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(511, 'THC 107', 'Multicultural Diversity in Workplace for the Tourism Professional', 3, 'bshm', 'Hospitality Management', 3, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(512, 'CBOM302', 'Operations Management', 3, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(513, 'THC 108', 'Professional Development and Applied Ethics', 3, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(514, 'GEF 302-B', 'Filipino 2: Introduksyon sa Pamamahayag', 3, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(515, 'HMPE 105', 'Catering Operations Management', 2, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(516, 'HMPE 106', 'Modern Gastronomy with Fusion of Cuisines', 2, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(517, 'HPC 109', 'Ergonomics and Facilities Planning for the Hospitality Industry', 3, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(518, 'THC 109', 'Legal Aspects in Tourism and Hospitality', 3, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(519, 'GEEM 302', 'The Entrepreneurial Mind', 3, 'bshm', 'Hospitality Management', 3, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(520, 'THC 110', 'Entrepreneurship in Tourism and Hospitality', 3, 'bshm', 'Hospitality Management', 4, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(521, 'BPO 101', 'Fundamentals of BPO', 3, 'bshm', 'Hospitality Management', 4, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(522, 'GERWL 401', 'Rizal’s Life and Works', 3, 'bshm', 'Hospitality Management', 4, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(523, 'GEPP 300', 'Panitikang Pilipino', 3, 'bshm', 'Hospitality Management', 4, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(524, 'HMPE 107', 'Specialty Cuisine with Food Exhibit', 2, 'bshm', 'Hospitality Management', 4, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(525, 'HPC 110', 'Research in Hospitality 1: Methods Of Research', 3, 'bshm', 'Hospitality Management', 4, '1st', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(526, 'OJTPR402', 'BSHM Practicum (600 hours)', 6, 'bshm', 'Hospitality Management', 4, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19'),
(527, 'HPC111', 'Research in Hospitality 2: Thesis Writing', 3, 'bshm', 'Hospitality Management', 4, '2nd', 1, '2026-02-19 23:16:19', '2026-02-19 23:16:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `enrollments`
--
ALTER TABLE `enrollments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_enrollments_status` (`status`),
  ADD KEY `idx_enrollments_education_level` (`education_level`),
  ADD KEY `idx_enrollments_enrollee_type` (`enrollee_type`);

--
-- Indexes for table `enrollment_documents`
--
ALTER TABLE `enrollment_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_enrollment_documents_enrollment_id` (`enrollment_id`),
  ADD KEY `idx_enrollment_documents_type` (`document_type`);

--
-- Indexes for table `enrollment_subjects`
--
ALTER TABLE `enrollment_subjects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_enrollment_subject` (`enrollment_id`,`subject_id`),
  ADD KEY `idx_enrollment_subjects_enrollment` (`enrollment_id`),
  ADD KEY `idx_enrollment_subjects_subject` (`subject_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `idx_programs_education_level` (`education_level`),
  ADD KEY `idx_programs_active` (`is_active`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_subjects_program` (`program`),
  ADD KEY `idx_subjects_year_level` (`year_level`),
  ADD KEY `idx_subjects_semester` (`semester`),
  ADD KEY `idx_subjects_active` (`is_active`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrollments`
--
ALTER TABLE `enrollments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `enrollment_documents`
--
ALTER TABLE `enrollment_documents`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `enrollment_subjects`
--
ALTER TABLE `enrollment_subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=528;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `enrollment_documents`
--
ALTER TABLE `enrollment_documents`
  ADD CONSTRAINT `enrollment_documents_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `enrollment_subjects`
--
ALTER TABLE `enrollment_subjects`
  ADD CONSTRAINT `enrollment_subjects_ibfk_1` FOREIGN KEY (`enrollment_id`) REFERENCES `enrollments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `enrollment_subjects_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
