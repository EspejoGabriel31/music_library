import { useState, useEffect } from "react";
import {useParams, useNavigate, Link } from 'react-router-dom'

export default function AlbumView(){
    const navigate = useNavigate()
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])

    const navButtons = () => {
        return (
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                |
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () =>{
            const response = await fetch(API_URL)
            const resData = await response.json()
            setAlbumData(resData.results)
            console.log(albumData[0])
        }
        fetchData()
    }, [id])

    const justSongs = albumData.filter(entry => entry.wrapperType === 'track')


   

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <Link to={`/song/${song.trackId}`}>
                    <p>{song.trackName}</p>
                </Link>
                
            </div>
        )
    })

    return (
        <div>
            {albumData.length > 0 ? <h2>{albumData[0].collectionName}</h2> : <h2>Loading...</h2>}
            {albumData.length > 0 ? 
            <Link to={`/artist/${albumData[0].artistId}`}>
                <h3>{albumData[0].artistName}</h3> 
            </Link>    
            : <h2>Loading...</h2>}
            {navButtons()}            
            {renderSongs}
        </div>
    )
}