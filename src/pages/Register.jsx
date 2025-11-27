import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import RegisterForm from '../components/auth/RegisterForm';

export default function Register() {
  return (
    <>
      <Header />
      <main>
        <h1 className="text-center">Create an Account</h1>
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
}