 CREATE TABLE cegonha(
    id_user INT AUTO_INCREMENT NOT NULL,
    name_user VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    PRIMARY KEY(id_user)
  );

  CREATE TABLE buy(
    buyer INT NOT NULL,
    id_order INT AUTO_INCREMENT NOT NULL,
    name_buyer VARCHAR(50) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price DECIMAL(5,2) NOT NULL,
    street VARCHAR(50) NOT NULL,
    num INT NOT NULL,
    district VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    PRIMARY KEY(id_order),
    FOREIGN KEY (buyer) REFERENCES cegonha(id_user)
  );
  
  SELECT c.id_user,c.name_user,c.email,b.name_buyer,b.category,b.price,b.street,b.number,b.district,b.city,b.state
  from cegonha AS c 
  RIGHT JOIN buy AS b 
  ON c.id_user = b.id_order;
