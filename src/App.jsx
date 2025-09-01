import { useEffect, useState } from "react";
import User from "./components/User";
import Header from "./components/Header";
import PostList from "./components/PostList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        "https://raw.githubusercontent.com/cederdorff/race/master/data/users.json"
      );
      const data = await response.json();

      setUsers(data);
    }
    fetchUsers();
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (users.length > 0) {
      setLoading(false);
    }
  }, [users]);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    const newUser = {
      name: form.name.value,
      mail: form.mail.value,
      title: form.title.value,
      image: form.image.value,
    };

    console.log("Sender til server:", newUser);

    try {
      // Simuler POST til server
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      console.log("Response status:", response.status);

      const serverResponse = await response.json();
      console.log("Server svarede:", serverResponse);

      // Tilføj til lokal liste (med vores eget ID)
      const userWithId = {
        ...newUser,
        id: crypto.randomUUID(),
      };

      setUsers([...users, userWithId]);
      form.reset();

      alert("✅ Bruger tilføjet!");
    } catch (error) {
      console.error("❌ Fejl:", error);
      alert("Kunne ikke tilføje bruger: " + error.message);
    }
  }

  async function handleDeleteUser(id) {
    console.log("Sletter bruger med ID:", id);

    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );

      console.log("Delete response status:", response.status);

      // Fjern fra lokal liste
      setUsers(users.filter((user) => user.id !== id));
      console.log("✅ Bruger slettet lokalt");
    } catch (error) {
      console.error("❌ Fejl ved sletning:", error);
      alert("Kunne ikke slette bruger: " + error.message);
    }
  }

  return (
    <div className="page">
      <Header></Header>
      <h1>Users</h1>
      <section className="grid">
        {loading && <p>Loading...</p>}
        {users.map((user) => (
          <section>
            <User key={user.id} user={user} />
            <button onClick={handleDeleteUser}>Slet bruger</button>
          </section>
        ))}
      </section>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Navn" />
        <input name="mail" placeholder="Mail" />
        <input name="title" placeholder="Titel" />
        <input name="image" placeholder="Billede-URL" />
        <input name="age" placeholder="Alder" />
        <button type="submit">Tilføj bruger</button>
      </form>
      <h2>Posts</h2>
      <PostList></PostList>
    </div>
  );
}

export default App;
