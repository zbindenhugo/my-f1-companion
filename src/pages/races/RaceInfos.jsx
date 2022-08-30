import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom"

export default function RaceInfos() {

    const { round, year } = useParams();
    const [actualRound, setActualRound] = useState();

    useEffect(() => {
        axios.get(`https://ergast.com/api/f1/${year}/${round}.json`)
            .then((res) => console.log(res))
            //.then((res) => setActualRound(res?.MRData?.RaceTable))

        fetch(``)
    }, [])

    return(
        <Container>
            <Row>
                <Col className='text-center'>
                    <p className="text-3xl">Information sur le {  }</p>
                </Col>
            </Row>
        </Container>
    )
}