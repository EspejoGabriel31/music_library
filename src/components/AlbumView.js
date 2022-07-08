import { useState, useEffect } from "react";
import {useParams, Link } from 'react-router-dom'

export default function AlbumView(){
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])

    useEffect(() => {
        const API_URL = `http://localhost:4000/song/${id}`
        const fetchData = async () =>{
            const response = 
        }
    })

    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Album Data Goes Here!</p>
        </div>
    )
}