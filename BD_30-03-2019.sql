-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-06-2019 a las 08:48:54
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
('147', 'dasdas', 'adsasd', 'asdasd', 'asdasd', 'asdasd@gmail.com'),
('166692946', 'pablo', 'gon', 'pena', 'medina', 'pgpena@ing.ucsc.cl'),
('172470041', 'karen', 'vanessa', 'san martin', 'iturra', 'kvsanmartin@ing.ucsc.cl'),
('258', 'pablo', 'gonzalo', 'pena', 'medina', 'hola@gmail.com'),
('7', 'pablo', 'gonzalo', 'pena', 'velozo', 'hola@gmail.com'),
('70232693', 'rosalia', 'rebeca', 'medina', 'medina', 'rebe@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carpeta`
--

CREATE TABLE `carpeta` (
  `Id_Carpeta` int(11) NOT NULL,
  `Nombre_carpeta` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Rut_Usuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `carpeta`
--

INSERT INTO `carpeta` (`Id_Carpeta`, `Nombre_carpeta`, `Rut_Usuario`) VALUES
(54, 'karen', '16669294-6'),
(55, 'karen', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criterios_rubrica`
--

CREATE TABLE `criterios_rubrica` (
  `criterio` varchar(200) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `criterios_rubrica`
--

INSERT INTO `criterios_rubrica` (`criterio`) VALUES
('1'),
('1'),
('q'),
('q'),
('q'),
('a'),
('s'),
('q'),
('q'),
('p'),
('i'),
('ñl'),
('l'),
('k'),
('j'),
('h'),
('g'),
('p'),
('o'),
('i'),
('u'),
('y'),
('t');

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
(6, 63, '70232693'),
(7, 63, '147');

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
(63, 'calculo', 2019, 1, 'ddasfafas', 55);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubrica`
--

CREATE TABLE `rubrica` (
  `Id_Rubrica` int(11) NOT NULL,
  `Nombre_Rubrica` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion_Rubrica` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Nivel_Desempeno_Rubrica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `rubrica`
--

INSERT INTO `rubrica` (`Id_Rubrica`, `Nombre_Rubrica`, `Descripcion_Rubrica`, `Nivel_Desempeno_Rubrica`) VALUES
(1, 'asddasdas', 'adsasdasd', 3),
(2, 'sadasdas', 'adsasdasdas', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('JN2mf407YxNVcIeUKIHmexwvf2oLNTMY', 1561963534, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{}}');

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
  `Password_Usuario` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `Tipo_Usuario` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `FechaRegistro_Usuario` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Rut_Usuario`, `NombreP_Usuario`, `NombreS_Usuario`, `ApellidoP_Usuario`, `ApellidoM_Usuario`, `Email_Usuario`, `Password_Usuario`, `Tipo_Usuario`, `FechaRegistro_Usuario`) VALUES
('1', 'jhjh', 'jhgjh', 'jhgjh', 'jhgj', 'jhgj', '$2a$10$WLYKqQ/Y9ciFlc2TEn1DX.5B38INqcp2b8fIqdKl4bX5x.51zsleq', 'Normal', NULL),
('16669294-6', 'pablo', 'kjhkj', 'kjhjk', 'kjhkj', 'kjh', '$2a$10$3cXtobEMB951bN2.bL7jvuxNGHj1hdhP00G/vcbh5jfeyc7IMYraq', 'Normal', NULL),
('3', 'karen', 'vanessa', 'san martin', 'iturra', 'pgpena@ing.ucsc.cl', '$2a$10$JY1JkWneLPRsGFW5hi8/wORds7wQoi1R4ESOb4hiLiteMZfmFVWoy', 'Normal', NULL),
('5', 'asdas', 'dasdasd', 'asdasd', 'asdasd', 'ds', '$2a$10$TGUOOdMXnV8RARJW18Mc.eUBY0..UKM1iTeLvQ54oRKvya3I0P.k.', 'Normal', NULL);

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
  MODIFY `Id_Carpeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `cursando`
--
ALTER TABLE `cursando`
  MODIFY `Id_Cursando` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `Id_Curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de la tabla `rubrica`
--
ALTER TABLE `rubrica`
  MODIFY `Id_Rubrica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
