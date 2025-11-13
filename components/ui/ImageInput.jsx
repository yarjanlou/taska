import { Box, Button, Typography } from "@mui/material";
import { FiUpload } from "react-icons/fi";

export default function ImageInput({ imageFile, onChange }) {
  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="w-full cursor-pointer">
        <Box className="hover:bg-primary/5 w-full rounded-md border border-dashed border-gray-400 p-4 transition-all hover:border-primary">
          <div className="flex flex-col items-center justify-center gap-2 text-[12px] font-medium text-neutral-500">
            <FiUpload className="stroke-2 text-base" />
            {imageFile.length
              ? `${imageFile.length} ${imageFile.length > 1 ? "images" : "image"} uploaded`
              : "Click to Upload"}
          </div>
        </Box>
      </label>
    </>
  );
}

// <div className="my-2 flex items-center gap-6">
//   <input
//     accept="image/*"
//     type="file"
//     multiple
//     id="upload-image"
//     className="hidden"
//     onChange={onChange}
//   />
//   <label htmlFor="upload-image">
//     <Button
//       variant="contained"
//       component="span"
//       sx={{
//         fontSize: "13px",
//         textTransform: "capitalize",
//         bgcolor: "#cad4fb2b",
//         color: "primary.main",
//         boxShadow: "none",
//         whiteSpace: "nowrap",
//         "&:hover": { bgcolor: "#d8e2f4", boxShadow: "none" },
//       }}
//     >
//       Upload Image
//     </Button>
//   </label>

//   {imageFile.length === 0 ? (
//     <p className="text-xs font-medium text-neutral-500">
//       no image uploaded.
//     </p>
//   ) : (
//     <p className="text-xs font-medium text-neutral-500">
//       {imageFile?.length} {imageFile.length > 1 ? "images" : "image"}{" "}
//       selected.
//     </p>
//   )}
// </div>
