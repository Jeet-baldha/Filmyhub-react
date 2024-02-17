/* eslint-disable no-unused-vars */
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content flex">

                <div className="personal-details">
                    <h1>FilmyHub.com</h1>
                    <div className="social-media-icon flex">
                        <i className="fa-brands fa-instagram"></i>
                        <i className="fa-brands fa-facebook"></i>
                        <i className="fa-brands fa-x-twitter"></i>
                        <i className="fa-brands fa-discord"></i>
                    </div>
                </div>

                <ul>
                    <li className="fw-6">The Basic</li>
                    <li><a href="#">About FilmyHub</a></li>
                    <li><a href="#">Contact Us</a></li>
                    <li><a href="#">Support Forms</a></li>
                </ul>

                <ul>
                    <li className="fw-6">Legal</li>
                    <li><a href="#">Terms & Condition</a></li>
                    <li><a href="#">Privacy Policy</a></li>
                    <li><a href="#">Report</a></li>
                </ul>

            </div>
        </footer>
    );
};

export default Footer;
