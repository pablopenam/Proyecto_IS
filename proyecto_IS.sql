-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2019 a las 02:17:10
-- Versión del servidor: 10.1.39-MariaDB
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `Rut_Alumno` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `NombreP_Alumno` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `NombreS_Alumno` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ApellidoP_Alumno` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ApellidoM_Alumno` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Email_Alumno` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`Rut_Alumno`, `NombreP_Alumno`, `NombreS_Alumno`, `ApellidoP_Alumno`, `ApellidoM_Alumno`, `Email_Alumno`) VALUES
('123291506', 'isabel', 'del carmen', 'iturra', 'velozo', 'hola@gmail.com'),
('166692946', 'pablo', 'gon', 'pena', 'medina', 'pgpena@ing.ucsc.cl'),
('172470041', 'karen', 'vanessa', 'san martin', 'iturra', 'kvsanmartin@ing.ucsc.cl'),
('7', 'pablo', 'gonzalo', 'pena', 'velozo', 'hola@gmail.com'),
('70232693', 'rosalia', 'rebeca', 'medina', 'medina', 'rebe@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carpeta`
--

CREATE TABLE `carpeta` (
  `Id_Carpeta` int(11) NOT NULL,
  `Nombre_carpeta` varchar(30) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `carpeta`
--

INSERT INTO `carpeta` (`Id_Carpeta`, `Nombre_carpeta`) VALUES
(31, 'casa'),
(33, 'pablo'),
(34, 'UCSC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursando`
--

CREATE TABLE `cursando` (
  `Id_Cursando` int(11) NOT NULL,
  `Id_Curso` int(11) NOT NULL,
  `Rut_Alumno` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cursando`
--

INSERT INTO `cursando` (`Id_Cursando`, `Id_Curso`, `Rut_Alumno`) VALUES
(1, 61, '70232693'),
(2, 61, '166692946'),
(3, 61, '70232693'),
(4, 61, '70232693');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `Id_Curso` int(11) NOT NULL,
  `Nombre_Curso` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Anho_Curso` year(4) NOT NULL,
  `Seccion_Curso` int(11) NOT NULL,
  `Descripcion_Curso` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `Id_Carpeta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`Id_Curso`, `Nombre_Curso`, `Anho_Curso`, `Seccion_Curso`, `Descripcion_Curso`, `Id_Carpeta`) VALUES
(38, 'calculo', 2019, 1, 'gfdgdfg', 0),
(39, 'calculo', 2019, 1, 'sadasdas', 22),
(40, 'eefwefwe', 2019, 1, 'asafas', 22),
(41, 'algebra', 2019, 1, 'sdasd', 22),
(42, 'eefwefwe', 2019, 1, 'dadasddasd', 22),
(43, 'historia', 2019, 1, 'asdasd', 22),
(44, 'calculo', 2019, 1, 'sadasdasd', 2),
(45, 'calculo', 2019, 1, 'sadasdasd', 2),
(46, 'eefwefwe', 2019, 1, 'dsdfsdf', 2),
(47, 'algebra', 2019, 1, '3123123', 2),
(48, 'algebra', 2019, 1, '12312312', 2),
(49, 'calculo', 2019, 1, 'hghhg', 2),
(50, 'calculo', 2019, 1, 'asdasd', 2),
(51, 'calculo', 2019, 1, 'dasdasd', 2),
(52, 'calculo', 2019, 1, 'jhgjhjhgjh', 2),
(53, 'historia', 2019, 1, 'sdasdasdas', 2),
(54, 'sasadasd', 2019, 1, 'asdasd', 29),
(55, 'historia', 2019, 2, 'curso de primero\r\n', 29),
(56, 'calculo', 2019, 2, 'esto es una prueba', 32),
(61, 'calculo', 2019, 1, 'esto es calculo', 33),
(62, 'FACEBOOK', 2019, 2, 'JKSHFKSDFJKLS', 31);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubrica`
--

CREATE TABLE `rubrica` (
  `Id_Rubrica` int(11) NOT NULL,
  `Nombre_Rubrica` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion_Rubrica` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Rut_Usuario` varchar(10) NOT NULL,
  `NombreP_Usuario` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `NombreS_Usuario` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ApellidoP_Usuario` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `ApellidoM_Usuario` varchar(20) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Email_Usuario` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Password_Usuario` varchar(50) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Tipo_Usuario` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `FechaRegistro_Usuario` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Rut_Usuario`, `NombreP_Usuario`, `NombreS_Usuario`, `ApellidoP_Usuario`, `ApellidoM_Usuario`, `Email_Usuario`, `Password_Usuario`, `Tipo_Usuario`, `FechaRegistro_Usuario`) VALUES
('123456789', 'karen', 'vanessa', 'san martin', 'iturra', 'kvsanmartin@ing.ucsc.cl', '$2a$10$3ZBuHrCsgh0wlwjMocnvHuFaGtN6npL9PRCW1xMhT7F', 'Normal', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`Rut_Alumno`);

--
-- Indices de la tabla `carpeta`
--
ALTER TABLE `carpeta`
  ADD PRIMARY KEY (`Id_Carpeta`);

--
-- Indices de la tabla `cursando`
--
ALTER TABLE `cursando`
  ADD PRIMARY KEY (`Id_Cursando`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`Id_Curso`);

--
-- Indices de la tabla `rubrica`
--
ALTER TABLE `rubrica`
  ADD PRIMARY KEY (`Id_Rubrica`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Rut_Usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carpeta`
--
ALTER TABLE `carpeta`
  MODIFY `Id_Carpeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `cursando`
--
ALTER TABLE `cursando`
  MODIFY `Id_Cursando` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `Id_Curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT de la tabla `rubrica`
--
ALTER TABLE `rubrica`
  MODIFY `Id_Rubrica` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
