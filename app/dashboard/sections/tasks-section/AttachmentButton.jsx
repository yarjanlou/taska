import { Button } from "@mui/material";
import { useState } from "react";
import { TiAttachment } from "react-icons/ti";
import AttachmentDialog from "./AttachmentDialog";

export default function AttachmentButton({ files, taskId }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="text"
        disableRipple
        onClick={() => setOpen(true)}
        sx={{
          p: "1px",
          width: "fit-content",
          justifyContent: "start",
          alignItems: "center",
          "&:hover": {
            bgcolor: "transparent",
          },
        }}
      >
        {/* <AttachFileIcon
          sx={{
            fontSize: "16px",
            rotate: "45deg",
            "& path": {
              strokeWidth: 2,
            },
          }}
        /> */}
        <TiAttachment className="size-4 md:size-4.5 md:stroke-[0.2]" />
        <span className="mt-px ml-px text-[11px] font-medium md:text-xs md:font-semibold">
          {files.length}
        </span>
      </Button>
      <AttachmentDialog
        open={open}
        onClose={() => setOpen(false)}
        taskId={taskId}
        files={files}
      />
    </>
  );
}
