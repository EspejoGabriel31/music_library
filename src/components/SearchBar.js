import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

export default function SearchBar(){
    const {term, handleSearch} = useContext(SearchContext)

    return(
        <form>
            <input ref={term} type="text" placeholder="Enter a search term here"
                onChange = {(e) => handleSearch(e, term.current.value)} 
            />
        </form>
    )
}

/*

<input type="text" placeholder="Enter a search term here"
                onChange = {
                    (e) => props.handleSearch(e, e.target.value)
                } />


<button onClick = {(e) => handleSearch(e, term.current.value)}>Submit</button>
       
*/