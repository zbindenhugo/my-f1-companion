import './Home.css';

import { useEffect, useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Home() {

    const [nextRace, setNextRace] = useState();
    const [lastResults, setLastResults] = useState([]);

    useEffect(() => {
        const fetches = async () => { 
            var json, data;
            data = await fetch('https://ergast.com/api/f1/current/next.json');
            json = await data.json();

            setNextRace(json.MRData.RaceTable.Races[0]);

            data = await fetch('https://ergast.com/api/f1/current/last/results.json');
            json = await data.json();

            setLastResults(json.MRData.RaceTable.Races[0].Results)
        }

        fetches()
            .catch(console.error);

        traduce(nextRace.raceName, 'fr');
    }, [])

    function traduce(text, targetLang){
        fetch('https://api-free.deepl.com/v2/translate', {
            
            method: 'POST',
            headers: {
                'Authorization': 'DeepL-Auth-Key 0d6abe58-efeb-43ad-fb44-4b9077295f4d:fx',
                'mode' : 'cors'
            },
            body: new URLSearchParams({
                'text': text,
                'target_lang': targetLang
            })
            
        })
        .then((res) => res.json())
        .then((res) => console.log(res))
    }

    return (
        <Container className="mt-10">
            <Row>
                <Col className='text-center'>
                    <p className="text-6xl mb-4">Mon compagnon F1</p>
                    <p className="text-xl"><small>Vous êtes sur votre compagnon F1, suivez ici toutes les courses et informations de la F1 en cours et antérieurs !</small></p>
                </Col>
            </Row>
            <Row className="py-2 border-t-2 border-b-2 mt-4">
                <Col className="text-center mt-4">
                    <Container fluid>
                        <Row>
                            <Col>
                                <p className="font-bold text-3xl">Prochain Circuit : { traduce(nextRace?.raceName, 'fr') }</p>
                                <p className="font-bold text-md">Round {nextRace?.round}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <ul className="text-left mt-10">
                                    <li>Essais libre 1 : { new Date(nextRace?.FirstPractice.date + 'T' + nextRace?.FirstPractice.time).toLocaleString() }</li>
                                    <li>Essais libre 2 : { new Date(nextRace?.SecondPractice.date + 'T' + nextRace?.SecondPractice.time).toLocaleString() }</li>
                                    <li>Essais libre 3 : { new Date(nextRace?.ThirdPractice.date + 'T' + nextRace?.ThirdPractice.time).toLocaleString() }</li>
                                    <li>Qualifications : { new Date(nextRace?.Qualifying.date + 'T' + nextRace?.Qualifying.time).toLocaleString() }</li>
                                    <li>La course : { new Date(nextRace?.date + 'T' + nextRace?.time).toLocaleString() }</li>
                                </ul>
                            </Col>
                            <Col className="text-center">
                                <img className='mt-10 ml-10' src={`./countries/${nextRace?.Circuit.Location.country}.png`} alt="Drapeau pays"/>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col />
                            <Col className="text-center">
                                <Button as={Link} to={`/seasons/current/${nextRace?.round}/infos`} variant='outline-danger'>Voir plus de détails</Button>
                            </Col>
                            <Col />
                        </Row>
                    </Container>
                </Col>
                <Col className="text-center mt-4">
                    <div>
                        <p className="font-bold text-3xl mb-[20px]">Résultats de la dernière course</p>
                    </div>
                    <table className="border border-collapse table-auto text-left ml-auto mr-auto">
                        <thead>
                            <tr>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Position</th>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Pilote</th>
                                <th className='p-2 border border-slate-100 bg-[#2b2d42] text-white'>Temps</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                lastResults.map((res) => {
                                        return (
                                            <tr>
                                                <td className='px-2 border text-center font-bold'>{ res?.position}</td>
                                                <td className='px-2 border'>{ res?.Driver?.givenName } { res?.Driver?.familyName }</td>
                                                <td className='px-2 border'>{ res?.Time?.time === undefined ? '(' + res?.status + ')' : <span className={res?.FastestLap?.rank === '1' ? "text-purple-600" : ''}> {res?.Time?.time}</span>}</td>
                                            </tr>
                                        )
                                    }
                                )
                            }
                        </tbody>
                    </table>
                </Col>
            </Row>
        </Container>
    )
}