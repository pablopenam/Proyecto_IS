CREATE DATABASE proyecto;

USE proyecto;

CREATE TABLE alumno(
    rut_alumno VARCHAR(10) NOT NULL,
    nombre_alumno VARCHAR(20) NOT NULL,
    seg_nombre_alumno VARCHAR(20) NOT NULL,
    apellido_paterno_alumno VARCHAR(20) NOT NULL,
    apellido_materno_alumno VARCHAR(20) NOT NULL,
    email_alumno VARCHAR(50) NOT NULL
    
);

ALTER TABLE alumno
    ADD PRIMARY KEY(rut_alumno);

DESCRIBE alumno;