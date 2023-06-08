//IMPORTS
import PublicationList from "../components/PublicationList.jsx";
import SearchBar from "../components/Searchbar.jsx";

export default function Home() {
  return (
    <div>
      <SearchBar/>      
      <PublicationList/>
    </div>
  );
}
