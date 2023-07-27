import { downloadFile } from "../helper/handle-file-download-react-axios";
import { postServerData } from "../helper/helper";

export const generatePDF = async (data) => {
    //console.log(data)

    // Helper function to convert a string to an array of bytes
function stringToBytes(str) {
  const bytes = [];
  for (let i = 0; i < str.length; i++) {
    bytes.push(str.charCodeAt(i));
  }
  return bytes;
}
    
    const testData = {
        "questions": [
          {
            "id": 1,
            "question": "What is the screen size of Poco X3 Pro?",
            "options": [
              "5.8 inches",
              "6.2 inches",
              "6.67 inches"
            ]
          },
          {
            "id": 2,
            "question": "What is the rear camera resolution of Poco X3 Pro?",
            "options": [
              "48 MP",
              "64 MP",
              "12 MP"
            ]
          },
          {
            "id": 3,
            "question": "What is the battery capacity of Poco X3 Pro?",
            "options": [
              "4000mAh",
              "4500mAh",
              "5160mAh"
            ]
          }
        ],
        "answers": [
          2,
          0,
          2
        ]
      }
    
    try {
      // const response = await postServerData('http://localhost:5000/api/gen-pdf', testData);
      //   console.log(response);
      // if (response) {
        // const temp = new Blob([response], { type: 'application/pdf' });
        // console.log(temp)
        // const url = URL.createObjectURL(temp);
        // console.log(url)
        // // Create a link and simulate a click to download the PDF
        // const a = document.createElement('a');
        // a.href = url;
        // a.download = 'AIquiz.pdf';
        // document.body.appendChild(a);
        // a.click();

        // const blob = new Blob([response], { type: 'application/pdf' });
        // const link = document.createElement('a');
        // link.href = window.URL.createObjectURL(blob);
        // link.download = `${"AIquiz"}-${+new Date()}.pdf`;
        // link.click();

        // URL.revokeObjectURL(link.href);

        // const pdfContent = response;
        // const pdfData = new Uint8Array(stringToBytes(pdfContent));
        // const blob = new Blob([pdfData], { type: 'application/pdf' });
    
        // const url = URL.createObjectURL(blob);
        // const link = document.createElement('a');
        // link.href = url;
        // link.download = 'document.pdf'; // Change the filename if needed
        // document.body.appendChild(link);
        // link.click();
    
        // Clean up the URL.createObjectURL after the download starts
        // setTimeout(() => {
        //   URL.revokeObjectURL(url);
        // }, 100);

      //}


      

    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  