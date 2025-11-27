import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  return (
    <>
      <Header />
      <main>
        <h1 className="text-center">Login</h1>
        <LoginForm />
      </main>
      <Footer />
    </>
  );
}