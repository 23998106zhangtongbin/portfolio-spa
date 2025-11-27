import Header from '../components/common/Header';
import Footer from '../components/common/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <h1>Hi, I'm [Your Name]</h1>
            <h2>Full-Stack Developer</h2>
            <p className="text-gray-600 mb-6 text-lg">
              I build modern, responsive web applications with React and Node.js. 
              Explore my projects and blog to see my work and learn about my journey.
            </p>
            <div className="flex space-x-4">
              <a href="/projects" className="btn">View Projects</a>
              <a href="/blog" className="btn-outline">Read Blog</a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://picsum.photos/id/1/600/400" // 替换为你的头像或个人图片
              alt="Profile"
              className="rounded-lg shadow-lg w-full object-cover h-80"
            />
          </div>
        </section>

        <section className="mt-16">
          <h2>My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <div className="card text-center">
              <p className="text-xl font-semibold">React</p>
            </div>
            <div className="card text-center">
              <p className="text-xl font-semibold">Node.js</p>
            </div>
            <div className="card text-center">
              <p className="text-xl font-semibold">Express</p>
            </div>
            <div className="card text-center">
              <p className="text-xl font-semibold">MongoDB</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}