import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

export default function RaceResult() {
    
    const { round, year } = useParams();

    const [race, setRace] = useState({})
    
    useEffect(() => {
        fetch(`https://ergast.com/api/f1/${year}/${round}/results.json`)
            .then((res) => res.json())
            .then((res) => setRace(res.MRData.RaceTable.Races[0]))
    }, [])

    return(
        <p>{ round }</p>
    )
}