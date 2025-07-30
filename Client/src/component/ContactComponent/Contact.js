import './Contact.css';
import { useState } from 'react';
import axios from 'axios';

function Contact() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const [output, setOutput] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, message } = form;

    // Basic validation
    if (!firstName || !lastName || !email || !message) {
      return setOutput('Please fill in all the fields.');
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return setOutput('Please enter a valid email.');
    }

    // Submit to backend
    axios.post('http://localhost:3001/contact/send', form)
      .then(() => {
        setOutput('Message sent successfully!');
        setForm({ firstName: '', lastName: '', email: '', message: '' });
      })
      .catch(() => {
        setOutput('Failed to send message. Please try again.');
      });
  };

  return (
    <section className="contact-section section-padding" id="section_6">
      <div className="container">
        <div className="row">

          <div className="col-lg-4 col-12 ms-auto mb-5 mb-lg-0">
            <div className="contact-info-wrap">
              <h2>Get in touch</h2>

              <div className="contact-image-wrap d-flex flex-wrap">
                <img src="./assets/images/hr.png.jpg" className="img-fluid avatar-image" alt="" />
                <div className="d-flex flex-column justify-content-center ms-3">
                  <p className="mb-0">Ratnesh Ranve</p>
                  <p className="mb-0"><strong>HR & Office Manager</strong></p>
                </div>
              </div>

              <div className="contact-info">
                <h5 className="mb-3">Contact Information</h5>
                <p className="d-flex mb-2">
                  <i className="bi-geo-alt me-2"></i> IPS Academy, Indore
                </p>
                <p className="d-flex mb-2">
                  <i className="bi-telephone me-2"></i>
                  <a href="tel:9876543210">9876543210</a>
                </p>
                <p className="d-flex">
                  <i className="bi-envelope me-2"></i>
                  <a href="mailto:ratnesh@gmail.com">Ratnesh@gmail.com</a>
                </p>
                <a href="#" className="custom-btn btn mt-3">Get Direction</a>
              </div>
            </div>
          </div>

          <div className="col-lg-5 col-12 mx-auto">
            <form className="custom-form contact-form" onSubmit={handleSubmit}>
              <h2>Contact Form</h2>
              <p className="mb-4">
                Or, you can just send an email: <a href="mailto:sonamgupta@gmail.com">sonamgupta@gmail.com</a>
              </p>

              {output && <div className="alert alert-info">{output}</div>}

              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    type="text"
                    name="firstName"
                    className="form-control mb-3"
                    placeholder="First Name"
                    value={form.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <input
                    type="text"
                    name="lastName"
                    className="form-control mb-3"
                    placeholder="Last Name"
                    value={form.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <input
                type="email"
                name="email"
                className="form-control mb-3"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
              />

              <textarea
                name="message"
                rows="5"
                className="form-control mb-3"
                placeholder="What can we help you with?"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>

              <button type="submit" className="form-control custom-btn">Send Message</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contact;
