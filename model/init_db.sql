SET foreign_key_checks = 0;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS applicants;
DROP TABLE IF EXISTS posts_applicants;


SET foreign_key_checks = 1;

CREATE TABLE users (
	user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	fullname VARCHAR(200) NOT NULL,
	email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL,
	isadmin BOOLEAN NOT NULL
);

CREATE TABLE applicants (
	applicant_id INT,
	applicantname VARCHAR(255),
	cv VARCHAR(255)
);

CREATE TABLE posts (
	post_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	company VARCHAR(255),
	title VARCHAR(255),
	postdescription VARCHAR(2000),
	filled TINYINT
);

CREATE TABLE posts_applicants (
	ref_post_id INT,
	ref_applicant_id INT,
    accepted INT
);

ALTER TABLE applicants ADD CONSTRAINT applicants_fk0 FOREIGN KEY (applicant_id) REFERENCES users(user_id);

ALTER TABLE posts_applicants ADD CONSTRAINT posts_applicants_fk0 FOREIGN KEY (ref_post_id) REFERENCES posts(post_id);

ALTER TABLE posts_applicants ADD CONSTRAINT posts_applicants_fk1 FOREIGN KEY (ref_applicant_id) REFERENCES applicants(applicant_id);

ALTER TABLE posts_applicants ADD CONSTRAINT posts_applicants_fk2 FOREIGN KEY (accepted) REFERENCES applicants(applicant_id);

INSERT INTO users (
    fullname, email, password, isadmin
    ) VALUES 
        ('Robert Williams', 'bobwilliams@gmail.com', '$2b$12$eFzMWbS9SogNtxkmo3J7aO8FQMFQSKbtpwLMIOVsF6GGKpTQdgq.W', false),
        ('Spencer Reid', 'spencerreid@bau.com', '$2b$12$WZcGPyrkCvD5e8m0Qz/nFOdBryUcsp6uDlE2MDo/AjuBhPrQBCfI6', false),
        ('Jane Doe', 'janedoe@yahoo.com', 'pa$2b$12$tiAz4eaXlpU.CdltUVvw6udLA2BWsitk5zXM2XOm2IpAeAiFfMCdyss3', false),
		('Admin1', 'admin1@inturn.com', '$2a$04$wWUrNnpGPh4SJgQziUs3Kez/lgjQYPmcBPJ1BZJq4A48uJB5BnYHC', true),
        ('Admin2', 'admin2@inturn.com', '$2a$04$ZWj.kBArRXRJYUMbLQF6T.igCcD4w7MHza71j5Ge6krKicvHxeLQK', true),
        ('Admin3', 'admin3@inturn.com', '$2a$04$qX0An7EXKxmRvFqCzfVfsu5yhVabCoXsC8NFFg9avXK7v6EW3nV5O', true);

INSERT INTO applicants (
    applicant_id, applicantname, cv
    ) VALUES 
        (1, 'Robert Williams', 'https://www.visualcv.com/static/180cf399a0d092149a8d8bcabda87150/11958/uk-flag-image.png'),
        (2, 'Spencer Reid', 'https://cv-nation.com/blogs/news/how-to-write-a-cv-for-jobs-in-spain-with-spanish-cv-examples'),
        (3, 'Jane Doe', 'https://zety.com/cv-examples');

 INSERT INTO posts (
    company, title, postdescription, filled
    ) VALUES 
        ('Company 1', 'Marketing Internship', 'Company is looking for a qualified intern to join our marketing/advertising team. Our marketing department produces quality work for major companies in the Boston area and seeks an intern who can participate in various stages of print and online marketing campaigns. This intern should be prepared to work in a fast-paced team environment and will finish the internship having gained broad experience in various aspects of marketing..', 0),
 	    ('Company 2', 'Graphic Design Internship', 'Are you a student interested in building real-world graphic design experience with an award-winning team? We’re a forward-thinking advertising agency looking for a talented and knowledgeable designer with fresh, creative ideas and an excellent eye for detail. Come work for one of the area’s leading advertising agencies and learn from some of the best in the business.', 0), 
        ('Company 3', 'Software Engineering Internship', 'Company seeks an intern with experience in software design, coding and debugging. The intern will gain exciting real-world software engineering experience at a thriving company. We frequently work in small teams to solve problems, explore new technologies, and learn from one another. The ideal intern for this environment will be enthusiastic and collaborative.', 0); 

INSERT INTO posts_applicants (
    ref_post_id, ref_applicant_id, accepted
    ) VALUES 
		(1,1,null), 
		(1,2,null), 
		(1,3,null), 
		(2,1,null), 
		(3,1,null), 
		(3,3,null);