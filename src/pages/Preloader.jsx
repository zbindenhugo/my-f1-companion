import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

import './Preloader.css'

export default function Preloader() {
    useEffect(() => {
        setTimeout(() => {
            window.location.pathname = '/home'
        }, 2000);
    }, [])
    
    
    return(
        <Container fluid>
            <Row>
                <Col />
                <Col className='text-center animate-bounce'>
                    <img className="m-auto F1" src="./f1.png"/>
                    <p className="text-3xl mt-3">Chargement ...</p>
                </Col>
                <Col />
            </Row>
        </Container>
    )
}