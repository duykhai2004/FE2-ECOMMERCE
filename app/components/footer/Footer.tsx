import Link from "next/link";
import Container from "../Container";
import FooterList from "./FooterList";
import { MdFacebook } from "react-icons/md";
import { AiFillInstagram, AiFillTwitterCircle, AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="bg-slate-700
    text-slate-200 text-sm mt-16"
    >
      <Container>
        <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
          <FooterList>
            <h3 className="text-base front-bold mb-2">Shop Category</h3>
            <Link href="#">Phones</Link>
            <Link href="#">Laptops</Link>
            <Link href="#">Desktop</Link>
            <Link href="#">Watches</Link>
            <Link href="#">Tvs</Link>
            <Link href="#">Accessories</Link>
          </FooterList>
          <FooterList>
            <h3 className="text-base front-bold mb-2">Customer Service</h3>
            <Link href="#">Service</Link>
            <Link href="#">Contract Us</Link>
            <Link href="#">Shping Policy</Link>
            <Link href="#">Return & Exchhanges</Link>
            <Link href="#">FAQs</Link>
          </FooterList>
          <FooterList>
            
              <h3 className="text-base front-bold mb-2">About Us</h3>
              <p className="mb-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. At rem
                necessitatibus, vel laborum nesciunt dicta explicabo nobis harum
              </p>
              <p>
                &copy;  {new Date().getFullYear()}
                E~Shopp. Allright reserved
              </p>
            
          </FooterList>
          <FooterList>
            
              <h3 className="text-base front-bold mb-2">Follow Us</h3>
              <p className="flex gap-2">
                <Link href="#"><MdFacebook size={24}/></Link>
                <Link href="#"><AiFillTwitterCircle size={24}/></Link>
                <Link href="#"><AiFillInstagram size={24}/></Link>
                <Link href="#"><AiFillYoutube size={24}/></Link>
              </p>
            
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
