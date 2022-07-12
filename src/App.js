import { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import './App.css';
import SongView from './components/SongView';

function App() {

  let [search, setSearch] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    
    if(search){  
    const fetchData = async () => {
      document.title = `${search} Music`
      const response = await fetch(API_URL + search)
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
  }
  }, [search])

  const handleSearch = (e, term) =>{
    e.preventDefault()
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
              <SearchBar handleSearch = {handleSearch}/>
              <button onClick={resetState}>Reset</button>
              <Gallery data={data}/>
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
