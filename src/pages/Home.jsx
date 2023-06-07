//IMPORTS
import SearchBar from "../components/Searchbar.jsx";
import PublicationList from "../components/PublicationList.jsx";

export default function Home() {
  return (
    <div>
      <h3>Home</h3>
      <SearchBar/>
      <PublicationList/>
    </div>
  );
}
