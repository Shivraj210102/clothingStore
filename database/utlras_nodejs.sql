-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 20, 2025 at 09:49 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `utlras_nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `about`
--

CREATE TABLE `about` (
  `about_id` int(11) NOT NULL,
  `about_title` varchar(255) NOT NULL,
  `about_details` text DEFAULT NULL,
  `about_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `about`
--

INSERT INTO `about` (`about_id`, `about_title`, `about_details`, `about_image`, `created_at`) VALUES
(1, 'How was Ultras Store started?', 'Risus augue curabitur diam senectus congue velit et. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Sed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at.\r\nSed vitae metus nibh sit era. Nulla adipiscing pharetra pellentesque maecenas odio eros at. Et libero vulputate amet duis erat volutpat vitae eget. Quam libero etiam et in ac at quis. Risus augue curabitur diam senectus congue velit et.', '1747372746895single-image1.jpg', '2025-05-16 05:17:56');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `admin_name` varchar(100) NOT NULL,
  `admin_email` varchar(150) NOT NULL,
  `admin_password` varchar(255) NOT NULL,
  `admin_role` varchar(50) DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `admin_name`, `admin_email`, `admin_password`, `admin_role`, `created_at`) VALUES
(1, 'Shivraj', 'shivraj9890@gmail.com', 'Shivraj@123', 'admin', '2025-05-13 17:15:10');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `blog_id` int(11) NOT NULL,
  `blog_heading` varchar(255) NOT NULL,
  `blog_details` text NOT NULL,
  `blog_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `cart_id` int(11) NOT NULL,
  `product_id` varchar(11) NOT NULL,
  `product_pricing_id` varchar(11) NOT NULL,
  `customer_id` varchar(11) NOT NULL,
  `qty` varchar(11) NOT NULL DEFAULT '1',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `category_id` int(11) NOT NULL,
  `category_name` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`category_id`, `category_name`, `created_at`) VALUES
(1, 'T-shirt', '2025-05-13 04:03:47'),
(2, 'Pants', '2025-05-13 04:03:52'),
(3, 'Shirt', '2025-05-13 04:03:56'),
(4, 'Pant', '2025-05-13 04:04:00'),
(7, 'Kurti', '2025-05-13 04:04:17'),
(8, 'Jacket', '2025-05-13 04:04:24');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `company_id` int(11) NOT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `company_image` varchar(255) DEFAULT NULL,
  `company_mobile` varchar(20) DEFAULT NULL,
  `company_email` varchar(255) DEFAULT NULL,
  `company_address` text DEFAULT NULL,
  `instagram_link` varchar(255) DEFAULT NULL,
  `telegram_link` varchar(255) DEFAULT NULL,
  `twitter_link` varchar(255) DEFAULT NULL,
  `youtube_link` varchar(255) DEFAULT NULL,
  `whatsapp_no` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`company_id`, `company_name`, `company_image`, `company_mobile`, `company_email`, `company_address`, `instagram_link`, `telegram_link`, `twitter_link`, `youtube_link`, `whatsapp_no`) VALUES
(1, 'Ultras - Clothing Store', '1747109013140main-logo.png', '7620497145', 'a2z@gmail.com', 'sudke mala, balikashram road, Ahilyanagar', 'https://www.instagram.com/', 'https://telegram.org', 'https://twitter.com', 'https://www.youtube.com', '7620497145');

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_email` varchar(255) NOT NULL,
  `customer_mobile` varchar(20) NOT NULL,
  `customer_password` varchar(255) NOT NULL,
  `customer_image` varchar(255) DEFAULT NULL,
  `customer_state` varchar(100) DEFAULT NULL,
  `customer_district` varchar(100) DEFAULT NULL,
  `customer_city` varchar(100) DEFAULT NULL,
  `customer_area` varchar(100) DEFAULT NULL,
  `customer_landmark` varchar(255) DEFAULT NULL,
  `customer_pincode` varchar(20) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`customer_id`, `customer_name`, `customer_email`, `customer_mobile`, `customer_password`, `customer_image`, `customer_state`, `customer_district`, `customer_city`, `customer_area`, `customer_landmark`, `customer_pincode`, `created_at`) VALUES
(1, 'Shivraj Nalla', 'shivraj123@gmail.com', '9890117611', 'Shivraj@123', '1747203569585shivraj.jpg', 'Maharashtra', 'Ahilyanagar', 'Ahmednagar', 'Balikashram Road', 'Aryn gardan', '414001', '2025-05-13 04:08:51'),
(2, 'Ganesh Ambekar', 'ganesh@123gmail.com', '7620497145', 'Ganesh@123', NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2025-05-14 09:03:11');

-- --------------------------------------------------------

--
-- Table structure for table `order_det`
--

CREATE TABLE `order_det` (
  `order_det_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `product_pricing_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_colors` varchar(100) DEFAULT NULL,
  `product_size` varchar(50) DEFAULT NULL,
  `product_image1` varchar(255) DEFAULT NULL,
  `product_company` varchar(255) DEFAULT NULL,
  `product_qty` int(11) NOT NULL,
  `product_total` decimal(10,2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_det`
--

INSERT INTO `order_det` (`order_det_id`, `order_id`, `product_id`, `customer_id`, `product_pricing_id`, `product_name`, `product_price`, `product_colors`, `product_size`, `product_image1`, `product_company`, `product_qty`, `product_total`, `created_at`) VALUES
(1, 1, 3, 1, 17, 'T-shirt', 180.00, 'whites', 'XL', '1747109938963cat-item2.jpg', 'Cotton Candy', 1, 180.00, '2025-05-13 14:04:58'),
(2, 1, 2, 1, 12, 'T-shirt', 230.00, 'whites', 'XXL', '1747109916805cat-item2.jpg', 'Cotton Candy', 1, 230.00, '2025-05-13 14:04:58'),
(3, 2, 2, 1, 10, 'T-shirt', 160.00, 'whites', 'L', '1747109916805cat-item2.jpg', 'Cotton Candy', 1, 160.00, '2025-05-14 05:10:37'),
(4, 2, 2, 1, 11, 'T-shirt', 180.00, 'whites', 'XL', '1747109916805cat-item2.jpg', 'Cotton Candy', 1, 180.00, '2025-05-14 05:10:37'),
(5, 2, 3, 1, 15, 'T-shirt', 140.00, 'whites', 'M', '1747109938963cat-item2.jpg', 'Cotton Candy', 1, 140.00, '2025-05-14 05:10:37'),
(6, 3, 2, 1, 10, 'T-shirt', 160.00, 'whites', 'L', '1747109916805cat-item2.jpg', 'Cotton Candy', 2, 320.00, '2025-05-15 11:29:02'),
(7, 3, 6, 1, 35, 'Pants', 500.00, 'Black', '34', '1747204269979single-image1.jpg', 'Peter England', 2, 1000.00, '2025-05-15 11:29:02'),
(8, 4, 11, 1, 65, 'Jacket', 4000.00, 'Black', 'XL', '1747491089820insta-image4.jpg', 'Peter England', 2, 8000.00, '2025-05-17 14:19:42');

-- --------------------------------------------------------

--
-- Table structure for table `order_tbl`
--

CREATE TABLE `order_tbl` (
  `order_id` int(11) NOT NULL,
  `customer_name` varchar(255) NOT NULL,
  `customer_mobile` varchar(20) NOT NULL,
  `customer_state` varchar(100) DEFAULT NULL,
  `customer_district` varchar(100) DEFAULT NULL,
  `customer_city` varchar(100) DEFAULT NULL,
  `customer_area` varchar(100) DEFAULT NULL,
  `customer_landmark` varchar(255) DEFAULT NULL,
  `customer_address_pincode` varchar(20) DEFAULT NULL,
  `payment_mode` varchar(50) NOT NULL,
  `order_date` varchar(100) DEFAULT NULL,
  `order_amount` decimal(10,2) NOT NULL,
  `payment_status` varchar(50) DEFAULT 'pending',
  `order_status` varchar(50) DEFAULT 'pending',
  `transaction_id` varchar(100) NOT NULL,
  `dispatched_date` varchar(100) NOT NULL,
  `delivered_date` varchar(100) NOT NULL,
  `rejected_date` varchar(100) NOT NULL,
  `returned_date` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_tbl`
--

INSERT INTO `order_tbl` (`order_id`, `customer_name`, `customer_mobile`, `customer_state`, `customer_district`, `customer_city`, `customer_area`, `customer_landmark`, `customer_address_pincode`, `payment_mode`, `order_date`, `order_amount`, `payment_status`, `order_status`, `transaction_id`, `dispatched_date`, `delivered_date`, `rejected_date`, `returned_date`, `created_at`) VALUES
(1, 'Shivraj Nalla', '9890117611', '', '', '', '', '', '', 'Online', '2025-05-13', 410.00, 'Complete', 'returned', 'pay_QURKzQF0w9Y0Gl', '', '', '', '2025-05-17', '2025-05-13 14:04:58'),
(2, 'Shivraj Nalla', '9890117611', 'Maharashtra', 'Ahmednagar', 'Ahmednagar', 'MarketAdd', 'sarsnagar', '414001', 'Online', '2025-05-14', 480.00, 'Complete', 'dispatch', 'pay_QUglPUgt5VxO8x', '2025-05-16', '', '', '', '2025-05-14 05:10:37'),
(3, 'Shivraj Nalla', '9890117611', 'Maharashtra', 'Ahilyanagar', 'Ahmednagar', 'Balikashram Road', 'Aryn gardan', '414001', 'Online', '2025-05-15', 1320.00, 'Complete', 'reject', 'pay_QVBlAYpVyytK5m', '', '2025-05-16', '2025-05-16', '', '2025-05-15 11:29:02'),
(4, 'Shivraj Nalla', '9890117611', 'Maharashtra', 'Ahilyanagar', 'Ahmednagar', 'Balikashram Road', 'Aryn gardan', '414001', 'Cash On Delivery', '2025-05-17', 8000.00, 'pending', 'delivered', '', '', '2025-05-17', '', '', '2025-05-17 14:19:42');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `product_company` varchar(255) DEFAULT NULL,
  `product_colors` varchar(255) DEFAULT NULL,
  `product_label` varchar(100) DEFAULT NULL,
  `product_image1` varchar(255) DEFAULT NULL,
  `product_image2` varchar(255) DEFAULT NULL,
  `product_image3` varchar(255) DEFAULT NULL,
  `product_image4` varchar(255) DEFAULT NULL,
  `product_details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `category_id`, `product_name`, `product_company`, `product_colors`, `product_label`, `product_image1`, `product_image2`, `product_image3`, `product_image4`, `product_details`, `created_at`) VALUES
(1, 1, 'T-shirt', 'Cotton Candy', 'whites', 'Featured', '1747109654861cat-item2.jpg', '1747109654861hero-image.jpg', '1747109654861selling-products3.jpg', '1747109654861selling-products8.jpg', '<p>A <strong>T-shirt</strong> (also spelled <strong>tee shirt</strong>, or <strong>tee</strong> for short) is a style of fabric <a href=\"https://en.wikipedia.org/wiki/Shirt\">shirt</a> named after the T shape of its body and sleeves. Traditionally, it has short sleeves and a round neckline, known as a <a href=\"https://en.wikipedia.org/wiki/Crew_neck\"><i>crew neck</i></a>, which lacks a collar. T-shirts are generally made of stretchy, light, and inexpensive fabric and are easy to clean. The T-shirt evolved from <a href=\"https://en.wikipedia.org/wiki/Undergarment\">undergarments</a> used in the 19th century and, in the mid-20th century, transitioned from undergarments to general-use casual clothing.</p><p>T-shirts are typically made of <a href=\"https://en.wikipedia.org/wiki/Cotton\">cotton</a> textile in a <a href=\"https://en.wikipedia.org/wiki/Jersey_(fabric)\">stockinette or jersey knit</a>, which has a distinctively <a href=\"https://en.wikipedia.org/wiki/Pliable\">pliable</a> texture compared to shirts made of woven cloth. Some modern versions have a body made from a continuously knitted tube, produced on a <a href=\"https://en.wikipedia.org/wiki/Knitting_machine\">circular knitting machine</a>, such that the torso has no side seams. The manufacture of T-shirts has become highly automated and may include cutting fabric with a <a href=\"https://en.wikipedia.org/wiki/Laser_cutting\">laser</a> or a <a href=\"https://en.wikipedia.org/wiki/Water_jet_cutter\">water jet</a>.</p>', '2025-05-13 04:14:14'),
(2, 1, 'T-shirt', 'Cotton Candy', 'whites', 'Featured', '1747109916805cat-item2.jpg', '1747109916805hero-image.jpg', '1747109916805selling-products3.jpg', '1747109916806selling-products8.jpg', '<p>A <strong>T-shirt</strong> (also spelled <strong>tee shirt</strong>, or <strong>tee</strong> for short) is a style of fabric <a href=\"https://en.wikipedia.org/wiki/Shirt\">shirt</a> named after the T shape of its body and sleeves. Traditionally, it has short sleeves and a round neckline, known as a <a href=\"https://en.wikipedia.org/wiki/Crew_neck\"><i>crew neck</i></a>, which lacks a collar. T-shirts are generally made of stretchy, light, and inexpensive fabric and are easy to clean. The T-shirt evolved from <a href=\"https://en.wikipedia.org/wiki/Undergarment\">undergarments</a> used in the 19th century and, in the mid-20th century, transitioned from undergarments to general-use casual clothing.</p><p>T-shirts are typically made of <a href=\"https://en.wikipedia.org/wiki/Cotton\">cotton</a> textile in a <a href=\"https://en.wikipedia.org/wiki/Jersey_(fabric)\">stockinette or jersey knit</a>, which has a distinctively <a href=\"https://en.wikipedia.org/wiki/Pliable\">pliable</a> texture compared to shirts made of woven cloth. Some modern versions have a body made from a continuously knitted tube, produced on a <a href=\"https://en.wikipedia.org/wiki/Knitting_machine\">circular knitting machine</a>, such that the torso has no side seams. The manufacture of T-shirts has become highly automated and may include cutting fabric with a <a href=\"https://en.wikipedia.org/wiki/Laser_cutting\">laser</a> or a <a href=\"https://en.wikipedia.org/wiki/Water_jet_cutter\">water jet</a>.</p>', '2025-05-13 04:18:36'),
(4, 1, 'T-shirt', 'Cotton Candy', 'whites', 'Featured', '1747109975743cat-item2.jpg', '1747109975743hero-image.jpg', '1747109975743selling-products3.jpg', '1747109975743selling-products8.jpg', '<p>lorem t-shirt</p>', '2025-05-13 04:19:35'),
(6, 2, 'Pants', 'Peter England', 'Black', 'Trending', '1747204269979single-image1.jpg', '1747204269979cat-item1.jpg', '1747204269979single-image1.jpg', '1747204269979product-image.jpg', '         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sapien suscipit molestie sagittis. Donec sed nulla et urna suscipit cursus. Nam commodo, velit eu iaculis sagittis, metus quam suscipit nisl, sit amet aliquam nunc erat a ante. Cras vitae tortor efficitur, luctus nisl eget, imperdiet sapien. Quisque consectetur nisi nec elit ullamcorper, et tincidunt velit dictum. Vestibulum malesuada metus non blandit mollis. Curabitur varius ligula eu vulputate sollicitudin. Nullam non vulputate lectus. Praesent dapibus est dolor, ullamcorper egestas arcu fringilla id. Donec posuere, tortor vitae sodales maximus, ipsum nisl maximus enim, vel consectetur ex leo eu urna. Nam non dignissim purus, vel tincidunt odio.', '2025-05-14 06:31:09'),
(7, 2, 'Pants', 'Peter England', 'Black', 'Trending', '1747204411206single-image1.jpg', '1747204411208cat-item1.jpg', '1747204411208single-image1.jpg', '1747204411209product-image.jpg', '         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sapien suscipit molestie sagittis. Donec sed nulla et urna suscipit cursus. Nam commodo, velit eu iaculis sagittis, metus quam suscipit nisl, sit amet aliquam nunc erat a ante. Cras vitae tortor efficitur, luctus nisl eget, imperdiet sapien. Quisque consectetur nisi nec elit ullamcorper, et tincidunt velit dictum. Vestibulum malesuada metus non blandit mollis. Curabitur varius ligula eu vulputate sollicitudin. Nullam non vulputate lectus. Praesent dapibus est dolor, ullamcorper egestas arcu fringilla id. Donec posuere, tortor vitae sodales maximus, ipsum nisl maximus enim, vel consectetur ex leo eu urna. Nam non dignissim purus, vel tincidunt odio.', '2025-05-14 06:33:31'),
(8, 2, 'Pants', 'Peter England', 'Black', 'Trending', '1747204584513single-image1.jpg', '1747204584519cat-item1.jpg', '1747204584520single-image1.jpg', '1747204584520product-image.jpg', '         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sapien suscipit molestie sagittis. Donec sed nulla et urna suscipit cursus. Nam commodo, velit eu iaculis sagittis, metus quam suscipit nisl, sit amet aliquam nunc erat a ante. Cras vitae tortor efficitur, luctus nisl eget, imperdiet sapien. Quisque consectetur nisi nec elit ullamcorper, et tincidunt velit dictum. Vestibulum malesuada metus non blandit mollis. Curabitur varius ligula eu vulputate sollicitudin. Nullam non vulputate lectus. Praesent dapibus est dolor, ullamcorper egestas arcu fringilla id. Donec posuere, tortor vitae sodales maximus, ipsum nisl maximus enim, vel consectetur ex leo eu urna. Nam non dignissim purus, vel tincidunt odio.', '2025-05-14 06:36:24'),
(9, 2, 'Pants', 'Peter England', 'Black', 'Trending', '1747204607243single-image1.jpg', '1747204607244cat-item1.jpg', '1747204607244single-image1.jpg', '1747204607244product-image.jpg', '         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sapien suscipit molestie sagittis. Donec sed nulla et urna suscipit cursus. Nam commodo, velit eu iaculis sagittis, metus quam suscipit nisl, sit amet aliquam nunc erat a ante. Cras vitae tortor efficitur, luctus nisl eget, imperdiet sapien. Quisque consectetur nisi nec elit ullamcorper, et tincidunt velit dictum. Vestibulum malesuada metus non blandit mollis. Curabitur varius ligula eu vulputate sollicitudin. Nullam non vulputate lectus. Praesent dapibus est dolor, ullamcorper egestas arcu fringilla id. Donec posuere, tortor vitae sodales maximus, ipsum nisl maximus enim, vel consectetur ex leo eu urna. Nam non dignissim purus, vel tincidunt odio.', '2025-05-14 06:36:47'),
(10, 2, 'Pants', 'Peter England', 'Black', 'Trending', '1747204638481single-image1.jpg', '1747204638482cat-item1.jpg', '1747204638483single-image1.jpg', '1747204638483product-image.jpg', '         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend sapien suscipit molestie sagittis. Donec sed nulla et urna suscipit cursus. Nam commodo, velit eu iaculis sagittis, metus quam suscipit nisl, sit amet aliquam nunc erat a ante. Cras vitae tortor efficitur, luctus nisl eget, imperdiet sapien. Quisque consectetur nisi nec elit ullamcorper, et tincidunt velit dictum. Vestibulum malesuada metus non blandit mollis. Curabitur varius ligula eu vulputate sollicitudin. Nullam non vulputate lectus. Praesent dapibus est dolor, ullamcorper egestas arcu fringilla id. Donec posuere, tortor vitae sodales maximus, ipsum nisl maximus enim, vel consectetur ex leo eu urna. Nam non dignissim purus, vel tincidunt odio.', '2025-05-14 06:37:18'),
(11, 8, 'Jacket', 'Peter England', 'Black', 'Featured', '1747491089820insta-image4.jpg', '1747491089822selling-products5.jpg', '1747491089822selling-products4.jpg', '1747491089822selling-products18.jpg', 'Could you please clarify what you mean by \"jacket detail\"? Are you looking for:\r\n\r\nProduct details for a specific jacket (e.g. material, size, color)?\r\n\r\nHow to describe a jacket for an e-commerce website?\r\n\r\nCode to display jacket details on a website?\r\n\r\nA description for a jacket in a fashion project?', '2025-05-17 14:11:29');

-- --------------------------------------------------------

--
-- Table structure for table `product_pricing`
--

CREATE TABLE `product_pricing` (
  `product_pricing_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_size` varchar(50) NOT NULL,
  `product_price` decimal(10,2) NOT NULL,
  `product_duplicate_price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_pricing`
--

INSERT INTO `product_pricing` (`product_pricing_id`, `product_id`, `product_size`, `product_price`, `product_duplicate_price`, `created_at`) VALUES
(1, 1, 'XS', 100.00, 120.00, '2025-05-13 04:14:14'),
(2, 1, 'S', 120.00, 140.00, '2025-05-13 04:14:14'),
(3, 1, 'M', 140.00, 160.00, '2025-05-13 04:14:14'),
(4, 1, 'L', 160.00, 180.00, '2025-05-13 04:14:14'),
(5, 1, 'XL', 180.00, 200.00, '2025-05-13 04:14:14'),
(6, 1, 'XXL', 230.00, 250.00, '2025-05-13 04:14:14'),
(7, 2, 'XS', 100.00, 120.00, '2025-05-13 04:18:36'),
(8, 2, 'S', 120.00, 140.00, '2025-05-13 04:18:36'),
(9, 2, 'M', 140.00, 160.00, '2025-05-13 04:18:36'),
(10, 2, 'L', 160.00, 180.00, '2025-05-13 04:18:36'),
(11, 2, 'XL', 180.00, 200.00, '2025-05-13 04:18:36'),
(12, 2, 'XXL', 230.00, 250.00, '2025-05-13 04:18:36'),
(13, 3, 'XS', 100.00, 120.00, '2025-05-13 04:18:58'),
(14, 3, 'S', 120.00, 140.00, '2025-05-13 04:18:58'),
(15, 3, 'M', 140.00, 160.00, '2025-05-13 04:18:58'),
(16, 3, 'L', 160.00, 180.00, '2025-05-13 04:18:58'),
(17, 3, 'XL', 180.00, 200.00, '2025-05-13 04:18:58'),
(18, 3, 'XXL', 230.00, 250.00, '2025-05-13 04:18:58'),
(19, 4, 'XS', 100.00, 120.00, '2025-05-13 04:19:35'),
(20, 4, 'S', 120.00, 140.00, '2025-05-13 04:19:35'),
(21, 4, 'M', 140.00, 160.00, '2025-05-13 04:19:35'),
(22, 4, 'L', 160.00, 180.00, '2025-05-13 04:19:35'),
(23, 4, 'XL', 180.00, 200.00, '2025-05-13 04:19:35'),
(24, 4, 'XXL', 230.00, 250.00, '2025-05-13 04:19:35'),
(25, 5, 'XS', 100.00, 120.00, '2025-05-13 04:21:21'),
(26, 5, 'S', 120.00, 140.00, '2025-05-13 04:21:21'),
(27, 5, 'M', 140.00, 160.00, '2025-05-13 04:21:21'),
(28, 5, 'L', 160.00, 180.00, '2025-05-13 04:21:21'),
(29, 5, 'XL', 180.00, 200.00, '2025-05-13 04:21:21'),
(30, 5, 'XXL', 230.00, 250.00, '2025-05-13 04:21:21'),
(31, 6, '26', 350.00, 380.00, '2025-05-14 06:31:10'),
(32, 6, '28', 380.00, 400.00, '2025-05-14 06:31:10'),
(33, 6, '30', 420.00, 450.00, '2025-05-14 06:31:10'),
(34, 6, '32', 450.00, 480.00, '2025-05-14 06:31:10'),
(35, 6, '34', 500.00, 550.00, '2025-05-14 06:31:10'),
(36, 6, '36', 600.00, 650.00, '2025-05-14 06:31:10'),
(37, 7, '26', 350.00, 380.00, '2025-05-14 06:33:31'),
(38, 7, '28', 380.00, 400.00, '2025-05-14 06:33:31'),
(39, 7, '30', 420.00, 450.00, '2025-05-14 06:33:31'),
(40, 7, '32', 450.00, 480.00, '2025-05-14 06:33:31'),
(41, 7, '34', 500.00, 550.00, '2025-05-14 06:33:31'),
(42, 7, '36', 600.00, 650.00, '2025-05-14 06:33:31'),
(43, 8, '26', 350.00, 380.00, '2025-05-14 06:36:24'),
(44, 8, '28', 380.00, 400.00, '2025-05-14 06:36:24'),
(45, 8, '30', 420.00, 450.00, '2025-05-14 06:36:24'),
(46, 8, '32', 450.00, 480.00, '2025-05-14 06:36:24'),
(47, 8, '34', 500.00, 550.00, '2025-05-14 06:36:24'),
(48, 8, '36', 600.00, 650.00, '2025-05-14 06:36:24'),
(49, 9, '26', 350.00, 380.00, '2025-05-14 06:36:47'),
(50, 9, '28', 380.00, 400.00, '2025-05-14 06:36:47'),
(51, 9, '30', 420.00, 450.00, '2025-05-14 06:36:47'),
(52, 9, '32', 450.00, 480.00, '2025-05-14 06:36:47'),
(53, 9, '34', 500.00, 550.00, '2025-05-14 06:36:47'),
(54, 9, '36', 600.00, 650.00, '2025-05-14 06:36:47'),
(55, 10, '26', 350.00, 380.00, '2025-05-14 06:37:18'),
(56, 10, '28', 380.00, 400.00, '2025-05-14 06:37:18'),
(57, 10, '30', 420.00, 450.00, '2025-05-14 06:37:18'),
(58, 10, '32', 450.00, 480.00, '2025-05-14 06:37:18'),
(59, 10, '34', 500.00, 550.00, '2025-05-14 06:37:18'),
(60, 10, '36', 600.00, 650.00, '2025-05-14 06:37:18'),
(61, 11, 'XS', 1000.00, 1090.00, '2025-05-17 14:11:29'),
(62, 11, 'S', 2000.00, 2200.00, '2025-05-17 14:11:29'),
(63, 11, 'M', 2800.00, 3000.00, '2025-05-17 14:11:29'),
(64, 11, 'L', 3000.00, 3800.00, '2025-05-17 14:11:29'),
(65, 11, 'XL', 4000.00, 4500.00, '2025-05-17 14:11:29'),
(66, 11, 'XXL', 5000.00, 5500.00, '2025-05-17 14:11:29');

-- --------------------------------------------------------

--
-- Table structure for table `service`
--

CREATE TABLE `service` (
  `service_id` int(11) NOT NULL,
  `service_font` varchar(100) DEFAULT NULL,
  `service_title` varchar(255) NOT NULL,
  `service_details` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `service`
--

INSERT INTO `service` (`service_id`, `service_font`, `service_title`, `service_details`, `created_at`) VALUES
(1, 'icon icon-truck', 'Free shipping', 'Over ₹ 300', '2025-05-16 05:13:43'),
(2, 'icon icon-return', 'Money back', 'Return within 7 days', '2025-05-16 05:14:40'),
(3, 'icon icon-tags1', 'Buy 4 get 5th', '50% off', '2025-05-16 05:15:10'),
(4, 'icon icon-help_outline', 'Any questions? ', 'experts are ready', '2025-05-16 05:15:33');

-- --------------------------------------------------------

--
-- Table structure for table `slider`
--

CREATE TABLE `slider` (
  `slider_id` int(11) NOT NULL,
  `slider_title` varchar(255) NOT NULL,
  `slider_details` text DEFAULT NULL,
  `slider_image` varchar(255) DEFAULT NULL,
  `button_link` varchar(255) DEFAULT NULL,
  `button_text` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `slider`
--

INSERT INTO `slider` (`slider_id`, `slider_title`, `slider_details`, `slider_image`, `button_link`, `button_text`, `created_at`) VALUES
(1, 'Summer Collection', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst amet, metus, sit massa posuere maecenas.</p>', '1747109200383banner1.jpg', 'https://a2zithub.org/', 'Get Started', '2025-05-13 04:06:40'),
(2, 'Casual Collection', '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictumst amet, metus, sit massa posuere maecenas.</p>', '1747109236030banner2.jpg', 'https://a2zithub.org/', 'Get Started', '2025-05-13 04:07:16');

-- --------------------------------------------------------

--
-- Table structure for table `testimonials`
--

CREATE TABLE `testimonials` (
  `testimonials_id` int(11) NOT NULL,
  `testimonials_name` varchar(255) NOT NULL,
  `testimonials_details` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`about_id`);

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `admin_email` (`admin_email`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`cart_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`category_id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`company_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`),
  ADD UNIQUE KEY `customer_email` (`customer_email`);

--
-- Indexes for table `order_det`
--
ALTER TABLE `order_det`
  ADD PRIMARY KEY (`order_det_id`);

--
-- Indexes for table `order_tbl`
--
ALTER TABLE `order_tbl`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_pricing`
--
ALTER TABLE `product_pricing`
  ADD PRIMARY KEY (`product_pricing_id`);

--
-- Indexes for table `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`service_id`);

--
-- Indexes for table `slider`
--
ALTER TABLE `slider`
  ADD PRIMARY KEY (`slider_id`);

--
-- Indexes for table `testimonials`
--
ALTER TABLE `testimonials`
  ADD PRIMARY KEY (`testimonials_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `about_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `cart_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `category_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `company`
--
ALTER TABLE `company`
  MODIFY `company_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `order_det`
--
ALTER TABLE `order_det`
  MODIFY `order_det_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_tbl`
--
ALTER TABLE `order_tbl`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product_pricing`
--
ALTER TABLE `product_pricing`
  MODIFY `product_pricing_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `service`
--
ALTER TABLE `service`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `slider`
--
ALTER TABLE `slider`
  MODIFY `slider_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `testimonials`
--
ALTER TABLE `testimonials`
  MODIFY `testimonials_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
