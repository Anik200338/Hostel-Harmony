import { Outlet } from 'react-router-dom';
import Footer from '../../Component/Footer/Footer';
import Navbar from '../../Component/Navbar/Navbar';

const Main = () => {
  return (
    <>
      <div className="h-16">
        <Navbar></Navbar>
      </div>
      <div className="min-h-[calc(100vh-235px)] container mx-auto p-5">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Main;
