import React from "react";
import "./Home.css"

const Home = () => {
    return (
        <div className="hero-img">
            <section className="hero is-fullheight-with-navbar ">
                <div className="hero-body">
                    <div className="container has-text-centered">
                        <p className="title home is-1">Hello, world!</p>
                        <p className="subtitle home is-3">
                            This is a simple webapp, a simple recreation of VAVA SuperFaktura
                            assignment.
                        </p>
                        <hr/>
                        <p className="subtitle home is-3">
                            It is an app for evidence of invoices. It saves a list of invoices, list
                            of customers and list of goods.
                        </p>
                        <a href={"/files/VAVA - 1 Zadanie.pdf"} target="_blank" rel="noreferrer">
                            <button className="button is-link is-medium">
                                <p>
                                    <i className="fas fa-file-pdf"/> Learn More
                                </p>
                            </button>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    )
};

export default Home;
