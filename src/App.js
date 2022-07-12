import { Fragment, useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import { DataContext } from './context/DataContext';
import { SearchContext } from './context/SearchContext';


import './App.css';
import SongView from './components/SongView';
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';

function App() {

  let [search, setSearch] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')
  let searchInput = useRef('')

  const API_URL = 'https://itunes.apple.com/search?term='

  const handleSearch = (e, term) =>{
    e.preventDefault()
    const fetchData = async () => {
      document.title = `${term} Music`
      const response = await fetch(API_URL + term)
      const resData = await response.json()
      console.log(resData)
      if (resData.results.length > 0){
        setData(resData.results)
        setMessage('')
      } else{
        setMessage('Not Found')
      }
    }
    fetchData()
    setSearch(term)
  }

  const resetState = () => {
    setSearch({})
    setData([])
    setMessage('Search for Music!')
  }

  return (
    <div className="App">
      {message}
      <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>

              <SearchContext.Provider value={{term: searchInput, handleSearch: handleSearch}}>
                <SearchBar />
              </SearchContext.Provider>

              <button onClick={resetState}>Reset</button>


              <DataContext.Provider value={data}>
                <Gallery />
              </DataContext.Provider>
            </Fragment>
          }/>
          <Route path="/album/:id" element={<AlbumView />}/>
          <Route path="/artist/:id" element={<ArtistView />}/>
          <Route path="/song/:id" element={<SongView />}/>
        </Routes>
      </Router>
      

      
  

      
    </div>
  );
}

export default App;
