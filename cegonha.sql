CREATE DATABASE projeto;
USE projeto;

CREATE TABLE cegonha (
    id_user INT AUTO_INCREMENT NOT NULL,
    name_user VARCHAR(255) NOT NULL,
    hash_name VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash_email VARCHAR(64) NOT NULL,
    password VARCHAR(60) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    PRIMARY KEY(id_user)
);

CREATE TABLE buy (
    buyer INT NOT NULL,
    id_order INT AUTO_INCREMENT NOT NULL,
    name_buyer VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    street VARCHAR(50) NOT NULL,
    num INT NOT NULL,
    district VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_order),
    CONSTRAINT fk_buyer 
    FOREIGN KEY (buyer) REFERENCES cegonha(id_user)
    ON DELETE CASCADE
);
