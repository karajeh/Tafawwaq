"use client";
import React from "react";

const ContactComponent: React.FC = () => {
  return(
    <section className="fifthSection">
            <div className="container">
                <div className="fifthSectionWrapper">
                    <h2 className="sectionTitle">We don’t do <span className="firstBlueElementOfTheTitle">chatbot’s</span><br/>
                        We believe in <span className="firstBlueElementOfTheTitle">human</span> <br/><span
                            className="secondBlueElementOfTheTitle">communication</span></h2>
                    <form action="#" className="fifthSection__form">
                        <label>👤 Your Name</label>
                        <input type="text" name="name" placeholder="Eg, Ahmad Mohammad" required />
                        <label>👤 Mobile Number</label>
                        <input type="tel" name="phone" placeholder="+966" required />
                        <label>✉️ Your Email</label>
                        <input type="email" name="email" placeholder="Eg. ahmadmohammad@gmail.com" required />
                        <label>📝 Write Message Here</label>
                        <textarea name="message" placeholder="How can we assist you?"></textarea>
                        <button type="submit">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
  )
}
 

export default ContactComponent;

