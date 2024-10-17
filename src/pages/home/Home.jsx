import HomeFocus from "../../components/homeFocus/HomeFocus";
import EngraveSection from "../../components/engraveSection/EngraveSection";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopProducts from "../../components/TopProducts/TopProducts";
import InfoSection from "./../../components/InfoSection/InfoSection";

export default function Home() {
  return (
    <>
      <Header />
      <TopProducts />
      <HomeFocus />
      <EngraveSection />
      <InfoSection />
      <Footer />

      {/* <Eshop /> */}
    </>
  );
}
