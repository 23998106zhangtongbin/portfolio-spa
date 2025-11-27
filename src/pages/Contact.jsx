import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ContactForm from '../components/contact/ContactForm';

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <h1>Get In Touch</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Have a project in mind or want to say hello? Feel free to send me a message!
        </p>
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}