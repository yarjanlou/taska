import { Button } from "@mui/material";

export default function ImageInput({ imageFile, onChange }) {
  return (
    <div className="my-2 flex items-center gap-6">
      <input
        accept="image/*"
        type="file"
        multiple
        id="upload-image"
        className="hidden"
        onChange={onChange}
      />
      <label htmlFor="upload-image">
        <Button
          variant="contained"
          component="span"
          sx={{
            fontSize: "13px",
            textTransform: "capitalize",
            bgcolor: "#cad4fb2b",
            color: "primary.main",
            boxShadow: "none",
            whiteSpace: "nowrap",
            "&:hover": { bgcolor: "#d8e2f4", boxShadow: "none" },
          }}
        >
          Upload Image
        </Button>
      </label>

      {imageFile.length === 0 ? (
        <p className="text-xs font-medium text-neutral-500">
          no image uploaded.
        </p>
      ) : (
        <p className="text-xs font-medium text-neutral-500">
          {imageFile?.length} {imageFile.length > 1 ? "images" : "image"}{" "}
          selected.
        </p>
      )}
    </div>
  );
}
