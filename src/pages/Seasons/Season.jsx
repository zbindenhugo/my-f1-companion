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
                                    return <Badge className='mt-[0.6rem] ml-2 text-sm' bg='success'>Finished</Badge>
                                } else {
                                    status = 'UPCOMMING';
                                    if (!closestDate){
                                        closestDate = true;
                                        nextRound = race.round;
                                        return <Badge className='mt-[0.6rem] ml-2 text-sm' bg='danger'>Next Race</Badge>
                                    } else {
                                        return <Badge className='mt-[0.6rem] ml-2 text-sm' bg='secondary'>Upcoming</Badge>
                                    }
                                }

                            }
                            
                            return(
                                <Card key={race?.round} className='lg:w-[600px]'>
                                    <Card.Header>
                                        {
                                            putBadge()
                                        } 
                                        <img className='w-10 h-10 float-right' src={`../../countries/${race?.Circuit?.Location?.country}.png`} alt='Country flag' />
                                    </Card.Header>
                                    
                                    <Card.Body className='table-cell align-middle'>
                                        <p><strong>{race.raceName}</strong> - {race?.Circuit?.circuitName} { new Date(race?.FirstPractice?.date) < Date.now() ? '' : '- ' + new Date(race?.FirstPractice?.date).toLocaleDateString() }</p>
                                    </Card.Body>
                                    <Card.Footer className='text-right'>
                                        {status === 'FINISH' ? 
                                            <Button as={Link} to={ `/seasons/${year}/${race?.round}/results`}>Results</Button> 
                                        : 
                                            <Button as={Link} to={`/seasons/${year}/${race?.round}/infos`}>Details of the GP</Button>
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
