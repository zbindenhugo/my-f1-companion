import './Navigation.css'

import { useContext, useState } from "react";

import { Container, Navbar, Offcanvas, Button, Modal, Form, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

import { Base64 } from 'js-base64';

import { UserContext } from '../contexts/Contexts';
import { toast } from 'react-toastify';


export default function Navigation() {
    
    const [showCanvas, setShowCanvas] = useState(false);
    const [showModal, toggleModal] = useState(false);

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const {user, connectUser, disconnectUser} = useContext(UserContext);

    const fetchingUser = (e) => {
        fetch('https://f1-companion-api.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, pwd: Base64.encode(pwd)}),
        })
        
        .then((res) => res.json())
        .then((res) => {
            if (res.length === 0){
                toast.error('Email / Mot de passe inconnu.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                });
            } else {
                connectUser(res[0])
                toggleModal(false); 
                setPwd(''); 
                setEmail('')
            }
        })
        .catch((err) => {
            toast.error('Une erreur est survenue lors de la connexion.', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
            });

            setPwd('');
        })
    }

    const closeCanvas = () => {
        setShowCanvas(false)
    }

    const openCanvas = () => {
        setShowCanvas(true)
    }
    
    return(
        <>
            <Navbar expand='lg' className='shadow-xl'>
                <Container fluid>
                    <Navbar.Brand onClick={openCanvas}><i className="bi bi-list text-4xl transition-all duration-300 hover:text-[#ef233c]" /></Navbar.Brand>
                    <Navbar.Text >
                        {
                            user ? <Button className='font-bold' variant='outline' onClick={() => toggleModal(!showModal)}>Se déconnecter</Button> : <Button className='font-bold' variant='outline' onClick={() => toggleModal(!showModal)}>Se connecter</Button>
                        }
                    </Navbar.Text>
                </Container>
            </Navbar>
            <Offcanvas show={showCanvas} onHide={closeCanvas}>
            <Offcanvas.Header>
                <Offcanvas.Title className='font-bold uppercase text-3xl'>Menu principal</Offcanvas.Title>
            </Offcanvas.Header>
                <Offcanvas.Body>
                    <Container fluid>
                        <Row>
                            <Link to='/home' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'>Accueil</Link>
                            <Link to='/seasons/current' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'>Saison actuelle</Link>
                            <Link to='/seasons/allSeasons' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'>Saisons</Link>
                            <Link to='/drivers' onClick={() => setShowCanvas(false)} className='text-xl transition-all duration-150 hover:tracking-wider hover:text-[#d90429]'>Pilotes</Link>
                        </Row>
                    </Container>
                </Offcanvas.Body>
            </Offcanvas>

            <Modal show={showModal} onHide={() => toggleModal(!showModal)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title className='font-bold uppercase'>
                        {
                            user ? 'Déconnexion utilisateur' : 'Connexion utilisateur' 
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        user ? 
                        
                            <p>Êtes vous sûr de vouloir vous déconnecter ?</p>

                        :
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Adresse e-mail</Form.Label>
                                <Form.Control value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Entrez votre email" required={true}/>
                                <Form.Text className="text-muted">
                                    Votre adresse et vos informations ne seront jamais dévoilées.
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Form.Control value={pwd} onChange={(e) => setPwd(e.target.value)} type="password" placeholder="Mot de passe" required={true}/>
                            </Form.Group>
                        </Form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => toggleModal(!showModal)}>
                        {
                            user ? 'Non' : 'Annuler'
                        }
                    </Button>
                    <Button variant='outline-danger' onClick={
                        user ? () => {disconnectUser(); toggleModal(false)} : () => {fetchingUser()}
                    } type='submit'>
                        {
                            user ? 'Oui' : 'Confirmer'
                        }
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}