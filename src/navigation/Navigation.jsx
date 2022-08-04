import './Navigation.css'

import { useState } from "react";

import { CrossIcon, ListIcon, SideSheet, Tab, TabNavigation } from "evergreen-ui";
import { Col, Container, Row } from "react-bootstrap";

export default function Navigation() {
    
    const [showSideSheet, setShowSideSheet] = useState(false);

    const handleShowSideSheet = () => {
        setShowSideSheet(!showSideSheet);
    }
    
    return(
        <header>
            <Container>
                <Row>
                    <Col />
                    <Col />
                    <Col className="m-5">
                        <ListIcon className="text-6xl transition-all duration-500 hover:text-[#D90429] hover:scale-110" onClick={handleShowSideSheet} size={35} right={0}/>
                    </Col>
                </Row>
            </Container>

            <SideSheet isShown={showSideSheet} onCloseComplete={handleShowSideSheet} position='left'>
                <TabNavigation margin={30} >
                    
                    <p className='uppercase text-2xl font-bold'>Saisons</p>
                    <div className='mt-3'>
                        <Tab 
                            direction='vertical' is="a" href='/seasons/current'
                            isSelected={window.location.pathname === '/seasons/current' ? true : false}
                        >
                            Saison actuelle
                        </Tab>
                        <Tab 
                            direction='vertical' is="a" href='/seasons/current'
                            isSelected={window.location.pathname === '/seasons/current' ? true : false}
                        >
                            Saisons antérieures
                        </Tab>
                    </div>
                </TabNavigation>
            </SideSheet>
        </header>
    )
}