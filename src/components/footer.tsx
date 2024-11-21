import React from "react";
import "../styles.css";
import { Container, Nav } from "react-bootstrap";
import Link from "next/link";
import {
    Instagram,
    Globe,
    Linkedin,
    Person,
    ShieldLock,
    Pencil
} from 'react-bootstrap-icons';

const Footer: React.FC = () => {
    return (
        <footer>
            <Container>
                <Nav className="d-flex justify-content-between w-100">
                    {/* Social Media Icons (left-aligned) */}
                    <Nav className="d-flex">
                        <Nav.Link href="https://www.linkedin.com/company/haumanaexchange/" target="_blank"className="footer-icon custom-link" title="HEX LinkedIn"><Linkedin/></Nav.Link>
                        <Nav.Link href="https://www.haumanaexchange.org/" target="_blank"className="footer-icon custom-link" title="HEX Marketplace"><Globe/></Nav.Link>
                        <Nav.Link href="https://www.instagram.com/haumanaexchange" target="_blank"className="footer-icon custom-link" title="HEX Instagram"><Instagram/></Nav.Link>
                    </Nav>

                    {/* Right-aligned Section */}
                    <Nav>
                        <Link href="Project-Management" className="footer-icon custom-link me-4" title="Manage Your Projects">
                            <Pencil/>
                        </Link>
                        <Link href="security-report" className="footer-icon custom-link" title="Report Security Issue">
                            <ShieldLock/>
                        </Link>
                        <Link href="Admin" className="footer-icon custom-link ms-4" title="Go to Admin Portal">
                            <Person/>
                        </Link>
                    </Nav>
                </Nav>
            </Container>
        </footer>
    );
};

export default Footer;