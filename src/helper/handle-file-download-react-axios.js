// import axios, { AxiosResponse } from 'axios';
// import { get } from 'lodash-es';

// const rest = axios.create({
//   baseURL: 'some base URL goes here',
// });

// // this one send file as Blob type 
// const getPdf = () => (
//   rest.get(`/get-pdf`, {
//     params: {
//       cacheBustTimestamp: Date.now(), // prevents IE cache problems on re-download
//     },
//     responseType: 'blob',
//     timeout: 120,
//     headers: {
//       Accept: 'application/octet-stream',
//     },
//   })
// );

// export const downloadFile = async (response/*: AxiosResponse*/, filename/*: string*/ = 'download') => {
//   const data = get(response, 'payload.data', null) || getProp(response, 'data', null);
//   if (!(data instanceof Blob)) return;

//   const blob = new Blob([data], { type: 'application/pdf' });
//   const link = document.createElement('a');
//   link.href = window.URL.createObjectURL(blob);
//   link.download = `${filename}-${+new Date()}.pdf`;
//   link.click();
// };

// // export const openFileInNewTab = async (response/*: AxiosResponse*/, filename/*: string*/ = 'download') => {
// //   const data = getProp(response, 'payload.data', null) || getProp(response, 'data', null);
// //   if (!(data instanceof Blob)) return;

// //   const blob = new Blob([data], { type: 'application/pdf' });

// //   // IE
// //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
// //     window.navigator.msSaveOrOpenBlob(data, filename);
// //     return;
// //   }

// //   // Chrome, FF
// //   const fileUrl = URL.createObjectURL(blob);
// //   const w = window.open(fileUrl, '_blank');
// //   w && w.focus();

// //   // if you want to support Safari & Opera iOS version
// //   // if (navigator.userAgent.indexOf('Chrome') != -1 || navigator.userAgent.indexOf('Firefox') != -1) {
// //   //   const w = window.open(fileUrl, '_blank');
// //   //   w && w.focus();
// //   // } else {
// //   //   // Safari & Opera iOS
// //   //   window.location.href = fileUrl;
// //   // }
// // };