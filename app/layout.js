import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/footer/page";



export default function Layout({ children }) {

  return (
    <html lang="fr">
      <body>

        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
