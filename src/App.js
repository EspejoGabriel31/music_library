import { Fragment, useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createResource as fetchData } from './helper'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'
import AlbumView from './components/AlbumView';
import ArtistView from './components/ArtistView';
import Spinner from './components/Spinner';
import './App.css';
import SongView from './components/SongView';

function App() {

  let [search, setSearch] = useState('')
  let [data, setData] = useState(null)
  let [message, setMessage] = useState('Search for Music!')

  // const API_URL = 'https://itunes.apple.com/search?term='

  useEffect(() => {
    if(search){  
      setData(fetchData(search))
    }
  }, [search])

  const handleSearch = (e, term) =>{
    e.preventDefault()
    setSearch(term)
  }

  // const resetState = () => {
  //   setSearch({})
  //   setData([])
  //   setMessage('Search for Music!')
  // }

  const renderGallery = () => {
    if(data){
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data}/>
        </Suspense>
      )
    }
  }

  return (
    <div className="App">
      <SearchBar handleSearch = {handleSearch}/>
      {message}
      {renderGallery()}
      {/* <Router>
        <Routes>
          <Route path="/" element={
            <Fragment>
              <SearchBar handleSearch = {handleSearch}/> */}
              {/* <button onClick={resetState}>Reset</button> */}
              {/* <Gallery data={data}/> */}
            {/* </Fragment>
          }/>
          <Route path="/album/:id" element={<AlbumView />}/>
          <Route path="/artist/:id" element={<ArtistView />}/>
          <Route path="/song/:id" element={<SongView />}/>
        </Routes>
      </Router> */}
      

      
      

      
    </div>
  );
}

export default App;
