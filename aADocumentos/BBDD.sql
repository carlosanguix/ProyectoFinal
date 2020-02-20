-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema baronbirra
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema baronbirra
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `baronbirra` ;
USE `baronbirra` ;

-- -----------------------------------------------------
-- Table `baronbirra`.`cervezas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `baronbirra`.`cervezas` (
  `idCerveza` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `procedencia` VARCHAR(45) NULL,
  PRIMARY KEY (`idCerveza`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baronbirra`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `baronbirra`.`usuarios` (
  `idUsuario` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `favorita` INT NULL,
  PRIMARY KEY (`idUsuario`),
  INDEX `idCervezaFavorita_idx` (`favorita` ASC),
  CONSTRAINT `favorita-cervezas`
    FOREIGN KEY (`favorita`)
    REFERENCES `baronbirra`.`cervezas` (`idCerveza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baronbirra`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `baronbirra`.`comentarios` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idCerveza` INT NOT NULL,
  `comentario` MEDIUMTEXT NOT NULL,
  `fecha` DATE NOT NULL,
  `refIdComentario` VARCHAR(45) NULL,
  PRIMARY KEY (`idComentario`),
  INDEX `idUsuario_idx` (`idUsuario` ASC),
  INDEX `idCerveza_idx` (`idCerveza` ASC),
  CONSTRAINT `idUsuario-usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `baronbirra`.`usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idCerveza-cervezas`
    FOREIGN KEY (`idCerveza`)
    REFERENCES `baronbirra`.`cervezas` (`idCerveza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baronbirra`.`votaciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `baronbirra`.`votaciones` (
  `idVotacion` INT NOT NULL AUTO_INCREMENT,
  `idUsuario` INT NOT NULL,
  `idCerveza` INT NOT NULL,
  `nota` DECIMAL(2,1) NOT NULL,
  PRIMARY KEY (`idVotacion`),
  INDEX `idUsuario-usuarios_idx` (`idUsuario` ASC),
  INDEX `idCerveza-cervezas_idx` (`idCerveza` ASC),
  CONSTRAINT `idUsuario-usuarios`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `baronbirra`.`usuarios` (`idUsuario`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idCerveza-cervezas`
    FOREIGN KEY (`idCerveza`)
    REFERENCES `baronbirra`.`cervezas` (`idCerveza`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baronbirra`.`ingredientes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `baronbirra`.`ingredientes` (
  `idIngrediente` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `descripcion` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`idIngrediente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `baronbirra`.`detalleCerveza`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `baronbirra`.`detalleCerveza` (
  `idCerveza` INT NOT NULL,
  `idIngrediente` INT NOT NULL,
  `descripcion` MEDIUMTEXT NOT NULL,
  PRIMARY KEY (`idCerveza`, `idIngrediente`),
  INDEX `idIngrediente_idx` (`idIngrediente` ASC),
  CONSTRAINT `idCerveza`
    FOREIGN KEY (`idCerveza`)
    REFERENCES `baronbirra`.`cervezas` (`idCerveza`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `idIngrediente`
    FOREIGN KEY (`idIngrediente`)
    REFERENCES `baronbirra`.`ingredientes` (`idIngrediente`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
