BEGIN;

-- Users
INSERT INTO users (first_name, last_name, email, role, balance) VALUES
('Max', 'Muster', 'max.muster@test.ch', 'LERNENDER', 50.00),
('Lisa', 'Schmidt', 'lisa.schmidt@test.ch', 'LERNENDER', 20.00),
('Anna', 'Admin', 'anna.admin@test.ch', 'MITARBEITER', 100.00),
('Peter', 'Meier', 'peter.meier@test.ch', 'LERNENDER', 75.00),
('Julia', 'Bauer', 'julia.bauer@test.ch', 'LERNENDER', 0.00),
('Karl', 'Weber', 'karl.weber@test.ch', 'MITARBEITER', 200.00),
('Sophie', 'Huber', 'sophie.huber@test.ch', 'LERNENDER', 30.00),
('Thomas', 'Lang', 'thomas.lang@test.ch', 'MITARBEITER', 150.00),
('Maria', 'Keller', 'maria.keller@test.ch', 'LERNENDER', 60.00),
('Daniel', 'Frei', 'daniel.frei@test.ch', 'LERNENDER', 10.00);

-- Transactions
INSERT INTO transactions (user_id, type, amount) VALUES
(1, 'AUFLADUNG', 50.00),
(2, 'AUFLADUNG', 20.00),
(4, 'ABBUCHUNG', 25.00),
(5, 'AUFLADUNG', 10.00),
(7, 'ABBUCHUNG', 15.00),
(1, 'ABBUCHUNG', 10.00),
(9, 'AUFLADUNG', 40.00),
(10, 'AUFLADUNG', 10.00),
(2, 'ABBUCHUNG', 5.00),
(4, 'AUFLADUNG', 50.00);

COMMIT;
