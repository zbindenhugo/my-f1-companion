import './Home.css';

import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {

    const [nextRace, setNextRace] = useState();
    const [lastRace, setLastRace] = useState()
    const [lastResults, setLastResults] = useState([]);

    useEffect(() => {
        const fetches = async () => { 
            var json, data;
            data = await fetch('https://ergast.com/api/f1/current/next.json');
            json = await data.json();

            setNextRace(json.MRData.RaceTable.Races[0]);

            data = await fetch('https://ergast.com/api/f1/current/last.json');
            json = await data.json();

            setLastRace(json.MRData.RaceTable.Races[0]);

            data = await fetch('https://ergast.com/api/f1/current/last/results.json');
            json = await data.json();

            setLastResults(json.MRData.RaceTable.Races[0].Results) 
        }

        fetches()
            .catch(console.error);        

    }, [])

    return (
        <Container className="mt-10" fluid>
            <Row>
                <Col className='text-center'>
                    <p className="text-6xl mb-4">My F1 Companion</p>
                    <p className="text-xl"><small>Hello fans ! Welcome to your F1 companion. Here you can consults every infos about F1.</small></p>
                    
                </Col>
            </Row>
            <hr className='w-[60%] ml-auto mr-auto mt-3'/>
            <Row className="py-2 mt-2">
                <Col className="text-center mt-4 ml-32">
                    <Container fluid>
                        <Row>
                            <Col>
                                <p className="font-bold text-3xl">Next race : { nextRace?.raceName }</p>
                                <p className="italic text-md">Round {nextRace?.round}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ul className="text-center mt-10 text-lg">
                                    <li><strong>Free Practice 1:</strong> { new Date(nextRace?.FirstPractice.date + 'T' + nextRace?.FirstPractice.time).toLocaleString() }</li>
                                    <li><strong>Free Practice 2:</strong> { new Date(nextRace?.SecondPractice.date + 'T' + nextRace?.SecondPractice.time).toLocaleString() }</li>
                                    <li><strong>Free Practice 3:</strong> { new Date(nextRace?.ThirdPractice.date + 'T' + nextRace?.ThirdPractice.time).toLocaleString() }</li>
                                    <li><strong>Qualifications:</strong> { new Date(nextRace?.Qualifying.date + 'T' + nextRace?.Qualifying.time).toLocaleString() }</li>
                                    <li><strong>The race:</strong> { new Date(nextRace?.date + 'T' + nextRace?.time).toLocaleString() }</li>
                                </ul>
                            </Col>
                            <Col className="text-center">
                                <img className='mt-10 ml-10 hover:scale-150 duration-300' src={`./circuits/${nextRace?.Circuit?.circuitId}.png`} alt="Next race track"/>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col />
                            <Col className="text-center">
                                <Button as={Link} to={`/seasons/current/${nextRace?.round}/infos`} variant='outline-danger'>More details ...</Button>
                            </Col>
                            <Col />
                        </Row>
                    </Container>
                </Col>
                <Col className="text-center mt-4 mr-26">
                    <div>
                        <p className="font-bold text-3xl mb-[20px]">Last race's results ({lastRace?.raceName})</p>
                    </div>
                    <table className="border border-collapse table-auto text-left ml-auto mr-auto">
                        <thead>
                            <tr>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Position</th>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Driver</th>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Time</th>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Points</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lastResults.map((res) => 
                                    <tr key={res?.Driver?.driverId}>
                                        <td className='px-2 border text-center font-bold'>{ res?.position}</td>
                                        <td className='px-2 border'><span className={res?.FastestLap?.rank === '1' ? "text-purple-600 font-bold" : ''}>{ res?.Driver?.givenName } { res?.Driver?.familyName } </span></td>
                                        <td className='px-2 border'><span className={res?.FastestLap?.rank === '1' ? "text-purple-600 font-bold" : ''}>{ res?.Time?.time === undefined ? '(' + res?.status + ')' : res?.Time?.time }</span></td>
                                        <td className='px-2 border'><span className={res?.FastestLap?.rank === '1' ? "text-purple-600 font-bold" : ''}>{res?.FastestLap?.rank === '1' ? (res?.points - 1) + ' (+1 for fastest Lap)' : res?.points } </span></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}