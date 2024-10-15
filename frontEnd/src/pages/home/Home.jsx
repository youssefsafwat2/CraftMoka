import HomeFocus from "../../components/homeFocus/HomeFocus";
import EngraveSection from "../../components/engraveSection/EngraveSection";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopProducts from "../../components/TopProducts/TopProducts";

export default function Home() {
  return (
    <>
      <Header />
      <TopProducts />
      <HomeFocus />
      <EngraveSection />
      <Footer />
      {/* <Eshop /> */}
    </>
  );
}
