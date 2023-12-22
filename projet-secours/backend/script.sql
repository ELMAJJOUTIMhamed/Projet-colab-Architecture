-- Table Auteur
CREATE TABLE Auteur (
    id_auteur INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(255) NOT NULL
);

-- Table Liste_cadeaux
CREATE TABLE Liste_cadeaux (
    id_liste INT PRIMARY KEY AUTO_INCREMENT,
    id_auteur INT,
    nom VARCHAR(255) NOT NULL,
    date_limite_reservation DATE NOT NULL,
    FOREIGN KEY (id_auteur) REFERENCES Auteur(id_auteur)
);

-- Table Cadeaux
CREATE TABLE Cadeaux (
    id_cadeaux INT PRIMARY KEY AUTO_INCREMENT,
    id_liste INT,
    nom VARCHAR(255) NOT NULL,
    description TEXT,
    prix DECIMAL(10, 2) NOT NULL,
    url_image VARCHAR(255),
    FOREIGN KEY (id_liste) REFERENCES Liste_cadeaux(id_liste)
);
