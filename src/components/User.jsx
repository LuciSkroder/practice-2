import { useEffect, useState } from "react";

export default function User({ user }) {
  const { id, image, mail, name, title } = user;

  const [likes, setLikes] = useState(0);

  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.log("Likes:", likes);
  }, [likes]);

  useEffect(() => {
    if (likes === 10) alert("Du har nået 10 likes!");
  }, [likes]);

  return (
    <div className="user-card">
      <img src={image} />
      <h2>{name}</h2>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Skjul" : "Vis"} detaljer
      </button>
      {showDetails && (
        <div>
          <p>Mail: {mail}</p>
          <p>Titel: {title}</p>
          <p>Id: {id}</p>
        </div>
      )}
      <div>
        <button onClick={() => setLikes(likes + 1)}>Like</button>
        <button onClick={() => setLikes(0)}>Reset likes</button>
        <p>Likes: {likes}</p>
      </div>
    </div>
  );
}
