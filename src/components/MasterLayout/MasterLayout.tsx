import ContactForm from '../ContactForm/ContactForm';
import Footer from '../Footer/Footer';
import Nav from '../Nav/Nav';
import Opinions from '../Opinions/Opinions';

function MasterLayout({ children }: any) {
  return (
    <>
      <Nav />
      {children}
      <ContactForm />
      {/* <Opinions /> */}
      <Footer />
    </>
  );
}

export default MasterLayout;
