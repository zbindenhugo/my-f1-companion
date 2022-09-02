import './Season.css'

import { useEffect, useState } from 'react';
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function Season(){
    const { year } = useParams();
    var closestDate = false;
    const [currentSeason, setCurrentSeason] = useState([])
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    useEffect(() => {        
        fetch(`https://ergast.com/api/f1/${year}.json`)
            .then((res) => res.json())
            .then((res) => setCurrentSeason(res.MRData.RaceTable.Races))
    }, [year])

    return(
        <Container className='mt-5'>
            <Row>
                <Col />
                <Col className='text-center'>
                    {
                        year !== 'current' ? <p className='text-6xl uppercase'>Season {year}</p> : <p className='text-5xl uppercase'>Current season</p>
                    }
                </Col>
                <Col />
            </Row>
            <Row className='mt-10'>
                <div className='grid lg:grid-cols-3 sm:grid-cols-1 gap-4'>
                    {
                        currentSeason.map((race) => {
                            var status = '';

                            if(new Date(race.date) < Date.now()){
                                status = 'FINISH'
                            } else {
                                status = 'UPCOMMING';
                            }

                            const putBadge = () => {
                                if(new Date(race.date) < Date.now()){
                                    status = 'FINISH'
                                    return <Badge className='mt-[0.3rem] mr-2 text-sm float-right' bg='success'>Finished</Badge>
                                } else {
                                    status = 'UPCOMMING';
                                    if (!closestDate){
                                        closestDate = true;
                                        return <Badge className='mt-[0.6rem] mr-2 text-sm float-right' bg='danger'>Next Race</Badge>
                                    } else {
                                        return <Badge className='mt-[0.6rem] mr-2 text-sm float-right' bg='info'>Upcoming</Badge>
                                    }
                                }

                            }
                            
                            console.log()

                            return(
                                <div key={race?.round} className='hover:scale-105 duration-100 shadow-md rounded-lg p-3 bg-[#edf2f8b2] card-race'>
                                    <div>
                                        <div>
                                            
                                            {
                                                putBadge()
                                            }
                                            <img className='w-16 h-16' src={`/countries/${race?.Circuit?.Location?.country}.png`} alt='Country flag' /> 
                                            
                                        </div>
                                        <div className='ml-5 text-center'>
                                            <div className='text-lg'>
                                                <p>
                                                    <strong>{race.raceName}</strong>
                                                    {'  '}
                                                    <span className='text-sm'> 
                                                        { race.FirstPractice.date.substring(8, 10) }-{ race.date.substring(8, 10) + ' ' } 
                                                        { month[parseInt(race.date.substring(5,7))] }
                                                    </span>
                                                </p>
                                                
                                                <p>{race.Circuit.circuitName}</p>
                                            </div>
                                            <div className='text-center mt-3'>
                                                {status === 'FINISH' ? 
                                                    <Button variant='outline-success' as={Link} to={`/seasons/${year}/${race?.round}/results`}>Results</Button> 
                                                : 
                                                    <Button variant='outline-secondary' as={Link} to={`/seasons/${year}/${race?.round}/infos`}>Details of the GP</Button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </Row>
        </Container>
    )

}
