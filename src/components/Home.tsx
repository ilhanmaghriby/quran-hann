import { useState } from "react";
import Card from "./Card";
const Home = () => {
  const [search, setSearch] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <section className="pt-20">
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Surah apa yang mau Anda baca?"
          className="border-solid border-2 border-gray-300 p-2 lg:w-1/2 w-3/4 rounded-lg"
          onChange={handleChange}
        />
      </div>
      <Card search={search} />
    </section>
  );
};

export default Home;
