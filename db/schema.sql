USE tracker;
DROP TABLE if exists employeeTracker;

CREATE TABLE employeeTracker (
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary DECIMAL(30),
  manager VARCHAR(30) NOT NULL Default ('Unassigned')
);


