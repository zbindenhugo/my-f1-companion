import { useState } from "react";
import { useEffect } from "react"

export default function Drivers(){

    const [alldrivers, setDrivers] = useState([])

    useEffect(() => {
        const fetchDatas = async() => {
            const datas = await fetch('https://ergast.com/api/f1/current/driverStandings.json');
            const json = await datas.json();

            await setDrivers(json.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        }

        fetchDatas();
    }, [])

    return (
        <div className="container px-4">
            <div className="text-center text-6xl p-4">
                Driver standings
            </div>
            <div className='grid grid-cols-3 gap-4'>
                {
                    alldrivers?.map((driver) => {
                        return(
                            <div className={`overflow-hidden bg-white shadow sm:rounded-lg`} key={driver.Driver.driverId}>
                                <div >
                                    <img src={`/countries/${driver.Driver.nationality}.png`} className='float-left' alt="Driver nationality flag" />
                                    <img src={`/drivers/${driver.Driver.driverId}.png`} className="ml-auto mr-auto" alt="Driver" />
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}