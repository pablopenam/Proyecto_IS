-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-07-2019 a las 23:30:53
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
('25', 'ismael', 'emiliano', 'peña', 'quilapi', 'ismael@gmail.com'),
('258', 'pablo', 'gonzalo', 'pena', 'medina', 'hola@gmail.com'),
('7', 'pablo', 'gonzalo', 'pena', 'velozo', 'hola@gmail.com'),
('70232693', 'rosalia', 'rebeca', 'medina', 'medina', 'rebe@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `archivo`
--

CREATE TABLE `archivo` (
  `Id_Archivo` int(11) NOT NULL,
  `Nombre_Archivo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Tipo_Archivo` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `Id_Evaluacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `archivo`
--

INSERT INTO `archivo` (`Id_Archivo`, `Nombre_Archivo`, `Tipo_Archivo`, `Id_Evaluacion`) VALUES
(6, 'bono.jpeg', 'image/jpeg', 1),
(7, 'Fiabilidad.pdf', 'application/pdf', 9);

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
(55, 'karen', '1'),
(56, 'pablo', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criterioslistacotejo`
--

CREATE TABLE `criterioslistacotejo` (
  `Id_CriterioListaCotejo` int(11) NOT NULL,
  `Descripcion_CriterioListaCotejo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Puntuacion_CriterioListaCotejo` int(11) NOT NULL,
  `Id_ListaCotejo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `criterioslistacotejo`
--

INSERT INTO `criterioslistacotejo` (`Id_CriterioListaCotejo`, `Descripcion_CriterioListaCotejo`, `Puntuacion_CriterioListaCotejo`, `Id_ListaCotejo`) VALUES
(3, 'pablo', 0, 14),
(4, 'hola 1', 0, 15),
(5, 'prueba2', 0, 15),
(6, 'qwer', 0, 2),
(7, 'qweqwe', 0, 1),
(8, 'a', 1, 19),
(9, 'b', 2, 19),
(10, 'a', 1, 19),
(11, 'b', 2, 19),
(12, 'c', 3, 19),
(13, 'a', 1, 19),
(14, 'b', 2, 19),
(15, 'c', 3, 19),
(16, 'hola1', 1, 20),
(17, 'hola2', 2, 20),
(18, 'hola3', 3, 20);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `criteriosrubrica`
--

CREATE TABLE `criteriosrubrica` (
  `Id_Criterio` int(11) NOT NULL,
  `Descripcion_Criterio` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Id_Rubrica` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `criteriosrubrica`
--

INSERT INTO `criteriosrubrica` (`Id_Criterio`, `Descripcion_Criterio`, `Id_Rubrica`) VALUES
(130, '1', 26),
(131, '2', 26),
(132, '3', 26),
(135, '1', 32),
(137, '1', 33),
(138, '6', 33);

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
(9, 64, '7'),
(10, 63, '7'),
(11, 63, '25'),
(12, 63, '147');

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
(63, 'cal', 2019, 1, 'ddasfafas', 55),
(64, 'historia', 2019, 1, 'sdasdas', 56),
(65, 'algebra', 2019, 1, 'sdsadasd', 55),
(66, 'fisica', 2019, 1, 'dasdasdasd', 56);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `Id_Evaluacion` int(11) NOT NULL,
  `Nombre_Evaluacion` varchar(20) COLLATE utf8_spanish_ci NOT NULL,
  `Ponderacion_Evaluacion` int(11) NOT NULL,
  `Id_Curso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`Id_Evaluacion`, `Nombre_Evaluacion`, `Ponderacion_Evaluacion`, `Id_Curso`) VALUES
(1, 'certamen 1', 0, 63),
(2, 'certamen 2', 0, 63),
(3, 'certamen 3', 0, 63),
(4, 'certamen4', 0, 63),
(6, 'Test1', 0, 65),
(8, 'Test1', 0, 63),
(9, 'Certamen 1', 50, 64),
(10, 'Test 1', 0, 64),
(11, 'Test2', 25, 64),
(12, 'certamen 3', 25, 66);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluado`
--

CREATE TABLE `evaluado` (
  `Id_Evaluado` int(11) NOT NULL,
  `Rut` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluar`
--

CREATE TABLE `evaluar` (
  `Id_Evaluar` int(11) NOT NULL,
  `Rut_Alumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listacotejo`
--

CREATE TABLE `listacotejo` (
  `Id_ListaCotejo` int(11) NOT NULL,
  `Nombre_ListaCotejo` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion_ListaCotejo` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Rut_Usuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `listacotejo`
--

INSERT INTO `listacotejo` (`Id_ListaCotejo`, `Nombre_ListaCotejo`, `Descripcion_ListaCotejo`, `Rut_Usuario`) VALUES
(8, 'qwe', 'qwe', ''),
(9, 'qwe', 'qwe', ''),
(10, 'asd', 'asd', ''),
(11, 'zxc', 'zxc', ''),
(12, 'fgh', 'fgh', ''),
(14, 'prueba', 'esto es una prueba', '1'),
(15, 'hola', 'asdsadas', '1'),
(17, 'sdasdsad', 'asdasdasd', '1'),
(18, 'sdasdasd', 'asdasdasda', '1'),
(19, 'asdasd', 'asdasd', '1'),
(20, 'prueba1', 'sdasda', '1');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_desempeno`
--

CREATE TABLE `nivel_desempeno` (
  `Id_Desempeno` int(11) NOT NULL,
  `Descripcion_Desempeno` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Nivel_Desempeno` int(11) NOT NULL,
  `Id_Criterio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `nivel_desempeno`
--

INSERT INTO `nivel_desempeno` (`Id_Desempeno`, `Descripcion_Desempeno`, `Nivel_Desempeno`, `Id_Criterio`) VALUES
(49, 'a', 0, 130),
(50, 'b', 1, 130),
(51, 'c', 2, 130),
(52, 'e', 3, 131),
(53, 'f', 4, 131),
(54, 'g', 5, 131),
(55, 'h', 6, 132),
(56, 'i', 7, 132),
(57, 'j', 8, 132),
(72, '2', 0, 137),
(73, '3', 1, 137),
(74, '4', 2, 137),
(75, '5', 3, 137),
(76, '7', 4, 138),
(77, '8', 5, 138),
(78, '9', 6, 138),
(79, '10', 7, 138);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `observacion`
--

CREATE TABLE `observacion` (
  `Id_Observacion` int(11) NOT NULL,
  `Descripcion_Observacion` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Id_Criterio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubrica`
--

CREATE TABLE `rubrica` (
  `Id_Rubrica` int(11) NOT NULL,
  `Nombre_Rubrica` varchar(30) COLLATE utf8_spanish_ci NOT NULL,
  `Descripcion_Rubrica` varchar(200) COLLATE utf8_spanish_ci NOT NULL,
  `Nivel_Desempeno_Rubrica` int(11) NOT NULL,
  `Rut_Usuario` varchar(10) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `rubrica`
--

INSERT INTO `rubrica` (`Id_Rubrica`, `Nombre_Rubrica`, `Descripcion_Rubrica`, `Nivel_Desempeno_Rubrica`, `Rut_Usuario`) VALUES
(26, 'prueba1', 'jhshdashdasdhkasj', 3, '1'),
(30, 'dsfdsfds', 'sdfsdfdsf', 4, '1'),
(31, 'dsfdsfds', 'sdfsdfdsf', 3, '1'),
(32, 'q', 'q', 4, '1'),
(33, '1', '1', 4, '1'),
(34, 'd1', 'ASDASDASD', 3, '1');

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
('78IlWqY37aHp19ey-g7jtBsKd2cqWitw', 1563484231, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"1\"}}'),
('_Yk0bU1Lobm7sEp5pn4zFH2skimwLDW7', 1563431483, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"flash\":{},\"passport\":{\"user\":\"1\"}}');

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
  `FechaRegistro_Usuario` date DEFAULT NULL,
  `Estado_Usuario` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Rut_Usuario`, `NombreP_Usuario`, `NombreS_Usuario`, `ApellidoP_Usuario`, `ApellidoM_Usuario`, `Email_Usuario`, `Password_Usuario`, `Tipo_Usuario`, `FechaRegistro_Usuario`, `Estado_Usuario`) VALUES
('1', 'karencilla', 'vanessa', 'san martin', 'iturra', 'kvsanmartin@ing.ucsc.cl', '$2a$10$WLYKqQ/Y9ciFlc2TEn1DX.5B38INqcp2b8fIqdKl4bX5x.51zsleq', 'true', NULL, 'Activado'),
('10', 'karen', 'askjd', 'kjdasdaskjd', 'asdasdas', 'kvsanmartin@ing.ucsc.cl', '$2a$10$sjBQ6L/MXAc8lkcYDzH6EeBg3U4RAIz7HaOVRjRcmW5Quy2.DQ3r2', 'Normal', NULL, 'activado'),
('16669294-6', 'pablo', 'kjhkj', 'kjhjk', 'kjhkj', 'kjh', '$2a$10$3cXtobEMB951bN2.bL7jvuxNGHj1hdhP00G/vcbh5jfeyc7IMYraq', 'true', NULL, 'Desactivado'),
('3', 'karen', 'vanessa', 'san martin', 'iturra', 'pgpena@ing.ucsc.cl', '$2a$10$JY1JkWneLPRsGFW5hi8/wORds7wQoi1R4ESOb4hiLiteMZfmFVWoy', 'Normal', NULL, 'Activado'),
('5', 'asdas', 'dasdasd', 'asdasd', 'asdasd', 'ds', '$2a$10$TGUOOdMXnV8RARJW18Mc.eUBY0..UKM1iTeLvQ54oRKvya3I0P.k.', 'Normaltru', NULL, 'Activado'),
('7', 'asdas', 'asdasd', 'asdasdad', 'sadas', 'asdas', '$2a$10$yPAW3yABZL20nVAxBiR7rOa3DJyBGbyX3DIcepSxwqfDXtCRc/1Ty', 'Normal', NULL, 'Activado'),
('7895123', 'rebeca', 'gonzalo', 'san martin', 'medina', 'pgpena@ing.ucsc.cl', '$2a$10$JdQ7xecpm0brgvHV.57YResMP1cVQcfGKnjp6g2z/4pkTYITzANku', 'Normal', NULL, 'Activado'),
('9', 'karen', 'vanessa', 'san martin', 'iturra', 'kvsanmartin@ing.ucsc.cl', '$2a$10$R/s7YgPJwZGih.HsnNlMtO1pfwxN2NQ7XKLX2.Kqi/tn7jbKSg3Wa', 'Normal', NULL, 'Desactivado');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`Rut_Alumno`);

--
-- Indices de la tabla `archivo`
--
ALTER TABLE `archivo`
  ADD PRIMARY KEY (`Id_Archivo`);

--
-- Indices de la tabla `carpeta`
--
ALTER TABLE `carpeta`
  ADD PRIMARY KEY (`Id_Carpeta`);

--
-- Indices de la tabla `criterioslistacotejo`
--
ALTER TABLE `criterioslistacotejo`
  ADD PRIMARY KEY (`Id_CriterioListaCotejo`);

--
-- Indices de la tabla `criteriosrubrica`
--
ALTER TABLE `criteriosrubrica`
  ADD PRIMARY KEY (`Id_Criterio`);

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
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`Id_Evaluacion`);

--
-- Indices de la tabla `evaluado`
--
ALTER TABLE `evaluado`
  ADD PRIMARY KEY (`Id_Evaluado`);

--
-- Indices de la tabla `evaluar`
--
ALTER TABLE `evaluar`
  ADD PRIMARY KEY (`Id_Evaluar`);

--
-- Indices de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  ADD PRIMARY KEY (`Id_ListaCotejo`);

--
-- Indices de la tabla `nivel_desempeno`
--
ALTER TABLE `nivel_desempeno`
  ADD PRIMARY KEY (`Id_Desempeno`);

--
-- Indices de la tabla `observacion`
--
ALTER TABLE `observacion`
  ADD PRIMARY KEY (`Id_Observacion`);

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
-- AUTO_INCREMENT de la tabla `archivo`
--
ALTER TABLE `archivo`
  MODIFY `Id_Archivo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `carpeta`
--
ALTER TABLE `carpeta`
  MODIFY `Id_Carpeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT de la tabla `criterioslistacotejo`
--
ALTER TABLE `criterioslistacotejo`
  MODIFY `Id_CriterioListaCotejo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `criteriosrubrica`
--
ALTER TABLE `criteriosrubrica`
  MODIFY `Id_Criterio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=139;

--
-- AUTO_INCREMENT de la tabla `cursando`
--
ALTER TABLE `cursando`
  MODIFY `Id_Cursando` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `Id_Curso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `Id_Evaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `evaluado`
--
ALTER TABLE `evaluado`
  MODIFY `Id_Evaluado` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `evaluar`
--
ALTER TABLE `evaluar`
  MODIFY `Id_Evaluar` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `listacotejo`
--
ALTER TABLE `listacotejo`
  MODIFY `Id_ListaCotejo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `nivel_desempeno`
--
ALTER TABLE `nivel_desempeno`
  MODIFY `Id_Desempeno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT de la tabla `observacion`
--
ALTER TABLE `observacion`
  MODIFY `Id_Observacion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rubrica`
--
ALTER TABLE `rubrica`
  MODIFY `Id_Rubrica` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
