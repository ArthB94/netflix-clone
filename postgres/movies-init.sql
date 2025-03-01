-- INITIALIZE DATABASE SCHEMA

CREATE TABLE movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  year INTEGER NOT NULL,
  imageUrl TEXT NOT NULL,
  heroImageUrl TEXT,
  globalRating REAL NOT NULL
);

-- INSERT DATA

INSERT INTO movies (title, description, year, imageUrl, heroImageUrl, globalRating) VALUES
('The Shawshank Redemption', 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', 1994, 'https://dlby.tmsimg.com/assets/p15987_p_v8_ai.jpg?w=480&h=720', 'https://cdn.theasc.com/Shawshank-Featured.jpg', 9.4);

INSERT INTO movies (title, description, year, imageUrl, globalRating) VALUES
('The Godfather', 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', 1972, 'https://m.media-amazon.com/images/M/MV5BNGEwYjgwOGQtYjg5ZS00Njc1LTk2ZGEtM2QwZWQ2NjdhZTE5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg', 9.2),
('The Dark Knight', 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.', 2008, 'https://fr.web.img2.acsta.net/medias/nmedia/18/63/97/89/18949761.jpg', 9.0),
('Pulp Fiction', 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', 1994, 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/Pulp_Fiction_%281994%29_poster.jpg/220px-Pulp_Fiction_%281994%29_poster.jpg', 8.9),
('Forrest Gump', 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.', 1994, 'https://fr.web.img4.acsta.net/pictures/15/10/13/15/12/514297.jpg', 8.8);