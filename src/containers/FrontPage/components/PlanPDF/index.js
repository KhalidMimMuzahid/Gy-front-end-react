import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import DocViewer, { PDFRenderer } from "react-doc-viewer";
import { useGetPdfLinkQuery } from "../../../../Services/Setting";
import Loading from "../../../../components/Loading/Loading";

const PlanPDF = () => {
  // const docs = [
  //   // { uri: "https://docdro.id/ceb4mbU" },  // web host URL
  //   { uri: require("../../../../assets/right.futrue.pdf") }, // Local File
  // ];

  const { data: pdfLink, isLoading } = useGetPdfLinkQuery();

  if (isLoading) {
    return <Loading/>
  }

  return (
    <>
      <Header />
      <div className="ss-trade_front_planPDF_hero_wrapper">
        <div className="container pdfContainer">
          <div className="ss-trade_front_planPDF_hero_container">
            <div className="pdf_container">
              <iframe
                title="Hello"
                src={pdfLink?.data?.pdfLink}
                width="100%"
                height="100%"
                allow="autoplay"
                // allowfullscreen="true"
              />
              {/* <DocViewer
                className="classDocViewer"
                pluginRenderers={[PDFRenderer]}
                documents={pdfLink?.data?.pdfLink}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: false,
                  },
                }}
                style={{ width: "100%", height: "100%", margin: "0px auto" }}
                theme={{
                  primary: "#5296d8",
                  secondary: "#1e0b56",
                  tertiary: "#1e0b56",
                  text_primary: "#ffffff",
                  text_secondary: "#1e0b56",
                  text_tertiary: "#00000099",
                  disableThemeScrollbar: false,
                }} */}
              {/* /> */}
            </div>
          </div>
        </div>
      </div>
      {/* <YoutubeSection /> */}
      <Footer />
    </>
  );
};

export default PlanPDF;

/* 
style={{ width: "0%", height: "100%", margin: "0px auto" }}
                config={{
                  header: {
                    disableHeader: true,
                    disableFileName: true,
                    retainURLParams: false,
                  },
                }}
                theme={{
                  primary: "#5296d8",
                  secondary: "#ffffff",
                  tertiary: "#1e0b56",
                  text_primary: "#ffffff",
                  text_secondary: "#1e0b56",
                  text_tertiary: "#00000099",
                  disableThemeScrollbar: false,
                }}
*/
