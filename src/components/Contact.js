import { useRef, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {

    const [buttonText, setButtonText] = useState('Send');
    const form = useRef();
    const [status, setStatus] = useState({});

    const sendEmail = (e) => {
        e.preventDefault();
        setButtonText('Sending...');
    
        emailjs.sendForm('service_p5onpjf', 'template_bydsl9m', form.current, '2y5pzCnisTfUVtXCb')
          .then((result) => {
            toast.success('Email has been sent successfully', {
              position: "top-right",
              theme: "dark",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              });
            e.target.reset();
            setButtonText("Send");
            setStatus({ success: true, message: 'Message sent successfully'});
          }, (error) => {
            toast.error("Dont sent your email", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            e.target.reset();
            setStatus({ success: false, message: 'Something went wrong, please try again later'});
          });
      };

    return (
        <section className="contact" id="connect">
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us"/>
                    </Col>
                    <Col md={6}>
                        <h2>Get In Touch</h2>
                        <ToastContainer />
                        <form ref={form} onSubmit={sendEmail}>
                            <Row>
                                <Col sm={6} className='px-2'>
                                    <textarea type="text" name="firsr_name" rows="1" placeholder="First Name" />
                                </Col>
                                <Col sm={6} className='px-2'>
                                    <textarea type="text" name="last_name" rows="1" placeholder="Last Name" />
                                </Col>
                                <Col sm={12} className='px-2'>
                                    <textarea type="email" name="user_email" rows="1" placeholder="Email Address" />
                                </Col>
                                <Col sm={12} className='px-2'>
                                    <textarea type="tel"  name="phone_num" rows="1" placeholder="Phone No." />
                                </Col>
                                <Col>
                                    <textarea rows="6" name="message" placeholder="Type your Message here" ></textarea>
                                    <button type="submit"><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}