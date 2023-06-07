//IMPORTS
import SearchBar from "../components/Searchbar.jsx";
import PublicationList from "../components/PublicationList.jsx";
import { useEffect, useState } from "react";

export default function Home() {

  //STATES
  const [reload, setReload] = useState(false);

  //FUNCTIONS

  useEffect(()=>{}, [reload])
  return (
    <div>
      <h3>Home</h3>
      <SearchBar/>
      <PublicationList setReload = {setReload}/>
    </div>
  );
}
