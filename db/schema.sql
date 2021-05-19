DROP DATABASE IF EXISTS tracker;
CREATE DATABASE tracker;
USE tracker;


CREATE TABLE department (
   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(30) NOT NULL
);


 CREATE TABLE role (
   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(30) NOT NULL,
   department_id INT UNSIGNED NOT NULL, 
   INDEX department_ind (department_id),
   salary DECIMAL(30),
   CONSTRAINT department_fk FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
 );
   

 CREATE TABLE employee (   
   id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
   first_name VARCHAR(30) NOT NULL,
   last_name VARCHAR(30) NOT NULL,
   role_id INT UNSIGNED NOT NULL, 
   INDEX role_ind (role_id),
   CONSTRAINT role_fk FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
   manager_id INT UNSIGNED NULL, 
   INDEX  manager_ind (manager_id),
   CONSTRAINT manager_fk FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL
  );