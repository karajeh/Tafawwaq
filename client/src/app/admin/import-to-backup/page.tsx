"use client";
// import clsx from "clsx";
import { Button } from "../../components/admin-panel/ui/button";
import DownloadIcon from "../../components/student/DownloadIcon";
import { PlusIcon } from "@heroicons/react/16/solid";

export default function Home() {
  return (
    <div className="flex flex-col md:gap-5 flex-1 w-full h-full">
      {/* <div className="md:border border-y md:rounded-2xl items-center text-center flex flex-col p-4">
        <div>
          <p className="text-black font-medium">Import data</p>
          <p className="text-text_secondary text-sm">
            Share a few snippets of your work.
          </p>
        </div>
        <FileManage />
      </div> */}
      <div className="md:border border-y md:rounded-2xl flex flex-col p-4 justify-center text-center items-center gap-3">
        <div>
          <p className="text-black font-medium">Export and Backup</p>
          <p className="text-text_secondary text-sm">
            Export your files for backup to cloud for safe use.
          </p>
        </div>
        <div className=" flex gap-2 text-sm">
          <Button
            outline
            className=" !text-[#000] cursor-pointer border-text_secondary !py-2"
          >
            <DownloadIcon />
            Download Data
          </Button>
          <Button
            color="button_primary"
            className=" bg-secondary cursor-pointer !py-2"
          >
            <PlusIcon className="!text-white" />
            Backup now
          </Button>
        </div>
        <p className=" text-text_secondary">Add your cloud server.</p>
      </div>
    </div>
  );
}

// const FileManage = () => {
//   const [files, setFiles] = useState<File[]>([]); // Changed to File[] to avoid null state

//   const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // @ts-expect-error - TS doesn't know about files
//     const file = e.target.files[0];
//     setFiles((prev) => {
//       return [...prev, file]; // Removed the null check since it defaults to an empty array
//     });
//   };

//   return (
//     <div className="w-full flex flex-col gap-4 items-center justify-center max-w-[512px]">
//       <input type="file" onChange={handleFile} className="hidden" id="file" />
//       <label
//         htmlFor="file"
//         className="cursor-pointer flex flex-col mt-4 py-4 gap-4 items-center justify-center w-full border border-dashed rounded-2xl"
//       >
//         <div className="bg-[#F2F4F75f] p-2 rounded-full flex items-center justify-center">
//           <div className="bg-[#F2F4F7] p-2 rounded-full flex items-center justify-center">
//             <UploadIcon />
//           </div>
//         </div>
//         <div>
//           <p className="text-text_secondary">
//             <span className="text-secondary font-semibold pr-2">
//               Click to upload
//             </span>
//             or drag and drop
//           </p>
//           <p className="text-text_secondary">
//             SVG, PNG, JPG or GIF (max. 800x400px)
//           </p>
//         </div>
//       </label>
//       {files.map((file, index) => (
//         <FileCard
//           key={file.name} // Add a unique key prop
//           file={file}
//           progress={index === 0 ? 100 : Math.floor(Math.random() * 100)}
//           size={file.size}
//           removeFile={() => {
//             setFiles((prev) => prev.filter((f) => f !== file));
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// const FileCard = ({
//   file,
//   progress,
//   size,
//   removeFile,
// }: {
//   file: File;
//   progress: number;
//   size: number;
//   removeFile: () => void;
// }) => {
//   return (
//     <div
//       className={clsx(
//         `flex gap-2 items-center w-full rounded-2xl p-3 relative`,
//         progress === 100 ? "border border-primary" : "border"
//       )}
//     >
//       <div className=" bg-[#F4EBFF5f] p-2 rounded-full flex items-center justify-center">
//         <div className=" bg-[#F4EBFF] p-2 rounded-full flex items-center justify-center">
//           <FileIcon />
//         </div>
//       </div>
//       <div className=" flex flex-col items-start w-full">
//         <div className=" w-full flex justify-between items-center">
//           <p className="text-[#344054] font-medium">{file.name}</p>
//           <button
//             onClick={() => {
//               if (progress != 100) {
//                 removeFile();
//               }
//             }}
//           >
//             {progress === 100 ? <CheckMark /> : <BinIcon />}
//           </button>
//         </div>
//         <p className="text-[#344054]">{Math.floor(size / 1000)} KB</p>
//         <div className=" flex w-full items-center gap-3">
//           <div className="w-full bg-[#F4EBFF] h-1 rounded-full">
//             <div
//               className=" bg-primary h-2 rounded-full"
//               style={{ width: `${progress}%` }}
//             ></div>
//           </div>
//           <p>{`${progress}%`}</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const FileIcon = () => {
//   return (
//     <svg
//       width="16"
//       height="17"
//       viewBox="0 0 16 17"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <g clipPath="url(#clip0_13047_4625)">
//         <path
//           d="M9.33268 2.49214V5.24583C9.33268 5.6192 9.33268 5.80589 9.40534 5.94849C9.46926 6.07394 9.57125 6.17592 9.69669 6.23984C9.8393 6.3125 10.026 6.3125 10.3993 6.3125H13.153M13.3327 7.63798V12.4458C13.3327 13.5659 13.3327 14.126 13.1147 14.5538C12.9229 14.9301 12.617 15.2361 12.2407 15.4278C11.8128 15.6458 11.2528 15.6458 10.1327 15.6458H5.86602C4.74591 15.6458 4.18586 15.6458 3.75803 15.4278C3.38171 15.2361 3.07575 14.9301 2.884 14.5538C2.66602 14.126 2.66602 13.5659 2.66602 12.4458V5.5125C2.66602 4.3924 2.66602 3.83234 2.884 3.40452C3.07575 3.02819 3.38171 2.72223 3.75803 2.53049C4.18586 2.3125 4.74591 2.3125 5.86602 2.3125H8.0072C8.49638 2.3125 8.74097 2.3125 8.97115 2.36776C9.17522 2.41675 9.37031 2.49756 9.54925 2.60722C9.75108 2.7309 9.92404 2.90385 10.2699 3.24976L12.3954 5.37524C12.7413 5.72115 12.9143 5.8941 13.038 6.09593C13.1476 6.27487 13.2284 6.46996 13.2774 6.67404C13.3327 6.90421 13.3327 7.1488 13.3327 7.63798Z"
//           stroke="#00ADEF"
//           stroke-width="1.33333"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         />
//       </g>
//       <defs>
//         <clipPath id="clip0_13047_4625">
//           <rect
//             width="16"
//             height="16"
//             fill="white"
//             transform="translate(0 0.979004)"
//           />
//         </clipPath>
//       </defs>
//     </svg>
//   );
// };

// const UploadIcon = () => {
//   return (
//     <svg
//       width="20"
//       height="21"
//       viewBox="0 0 20 21"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M6.66602 14.3123L9.99935 10.979M9.99935 10.979L13.3327 14.3123M9.99935 10.979V18.479M16.666 14.9314C17.6839 14.0907 18.3327 12.819 18.3327 11.3957C18.3327 8.86437 16.2807 6.81234 13.7493 6.81234C13.5673 6.81234 13.3969 6.71733 13.3044 6.56045C12.2177 4.71637 10.2114 3.479 7.91602 3.479C4.46424 3.479 1.66602 6.27722 1.66602 9.729C1.66602 11.4508 2.36222 13.0099 3.48847 14.1403"
//         stroke="#475467"
//         stroke-width="1.66667"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// const CheckMark = () => {
//   return (
//     <svg
//       width="16"
//       height="17"
//       viewBox="0 0 16 17"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <rect x="0.5" y="1.479" width="15" height="15" rx="7.5" fill="#00ADEF" />
//       <rect
//         x="0.5"
//         y="1.479"
//         width="15"
//         height="15"
//         rx="7.5"
//         stroke="#00ADEF"
//       />
//       <path
//         d="M11.3327 6.479L6.74935 11.0623L4.66602 8.979"
//         stroke="white"
//         stroke-width="1.66667"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };

// const BinIcon = () => {
//   return (
//     <svg
//       width="18"
//       height="20"
//       viewBox="0 0 18 20"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M12.3333 4.97884V4.31217C12.3333 3.37875 12.3333 2.91204 12.1517 2.55552C11.9919 2.24192 11.7369 1.98695 11.4233 1.82716C11.0668 1.64551 10.6001 1.64551 9.66667 1.64551H8.33333C7.39991 1.64551 6.9332 1.64551 6.57668 1.82716C6.26308 1.98695 6.00811 2.24192 5.84832 2.55552C5.66667 2.91204 5.66667 3.37875 5.66667 4.31217V4.97884M7.33333 9.56217V13.7288M10.6667 9.56217V13.7288M1.5 4.97884H16.5M14.8333 4.97884V14.3122C14.8333 15.7123 14.8333 16.4124 14.5608 16.9472C14.3212 17.4176 13.9387 17.8 13.4683 18.0397C12.9335 18.3122 12.2335 18.3122 10.8333 18.3122H7.16667C5.76654 18.3122 5.06647 18.3122 4.53169 18.0397C4.06129 17.8 3.67883 17.4176 3.43915 16.9472C3.16667 16.4124 3.16667 15.7123 3.16667 14.3122V4.97884"
//         stroke="#667085"
//         stroke-width="1.66667"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       />
//     </svg>
//   );
// };
