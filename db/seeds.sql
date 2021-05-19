INSERT INTO department (name)
 VALUES
 ('Sales'),
 ('Engineering '),
 ('Finance'),
 ('Legal');

 INSERT INTO role (title, department_id, salary )
 VALUES
 ('Sales Lead', 1, 10000 ),
 ('Salesperson', 1, 20000 ),
 ('Lead Engineering', 2, 30000 ),
 ('Software Engineer', 2, 40000 ),
 ('Accountant', 3, 50000),
 ('Legal Team Lead', 4, 60000),
 ('Lawyer', 4, 70000 ),
 ('Lead Engineering', 2, 80000);

 INSERT INTO employee (first_name, last_name, role_id, manager_id )
 VALUES
 ('Amber', 'Apple', 1, NULL ),
 ('Bob', 'Burgers', 2, 2 ),
 ('cathy', 'Caramel', 3 , 3),
 ('Don', 'Donuts', 4, 3 ),
 ('Emily', 'Eggs', 5, 2),
 ('Franks', 'Fudge', 6, 1),
 ('Greta', 'Guacamole', 7, 4 ),
 ('Henry', 'Hazelnuts', 8, 4);
