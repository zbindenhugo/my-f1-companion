import { useEffect, useState } from 'react';
import { Badge, Button, Card, Carousel, CarouselItem, Col, Container, Placeholder, Row, Stack } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function Season(){
    const { year } = useParams();
    var closestDate = false;
    var nextRound = 0;
    const [currentSeason, setCurrentSeason] = useState([])

    useEffect(() => {        
        fetch('https://ergast.com/api/f1/' + year + '.json')
            .then((res) => res.json())
            .then((res) => setCurrentSeason(res.MRData.RaceTable.Races))
    }, [])

    return(
        <Container className='mt-5'>
            <Row>
                <Col />
                <Col className='text-center'>
                    {
                        year != 'current' ? <h1 className='h1 uppercase'>Saison {year}</h1> : <h1 className='h1 uppercase'>Saison actuelle</h1>
                    }
                </Col>
                <Col />
            </Row>
            <Row className='mt-10'>
                <Stack gap={3} className='content-center items-center'>
                    {
                        currentSeason.map((race) => {
                            var status = '';
                            const putBadge = () => {
                                const raceDate = new Date(race.date);
                                
                                if(raceDate < Date.now()){
                                    status = 'FINISH'
                                    return <Badge className='mt-2 ml-2 w-20' bg='success'>Terminé</Badge>
                                } else {
                                    status = 'UPCOMMING';
                                    if (!closestDate){
                                        closestDate = true;
                                        nextRound = race.round;
                                        return <Badge className='mt-2 ml-2 w-24' bg='danger'>Prochain GP</Badge>
                                    } else {
                                        return <Badge className='mt-2 ml-2 w-20' bg='secondary'>À venir ...</Badge>
                                    }
                                }

                            }

                            return(
                                <Card key={race.round} className='lg:w-[600px]'>
                                    {
                                        putBadge()
                                    } 
                                    <Card.Body><strong>{race.raceName}</strong> - {race?.Circuit?.circuitName} - { new Date(race?.FirstPractice.date).toLocaleDateString() } </Card.Body>
                                    <Card.Footer className='text-right'>
                                        {status === 'FINISH' ? 
                                            <Button as={Link} to={ `/seasons/${year}/${race?.round}/results`}>Voir les résultats</Button> 
                                        : 
                                            <Button as={Link} to={`/seasons/${year}/${race?.round}/infos`}>Informations sur le GP</Button>
                                        }
                                    </Card.Footer>
                                </Card>
                            )
                        })
                    }
                </Stack>
            </Row>
        </Container>
    )

}
