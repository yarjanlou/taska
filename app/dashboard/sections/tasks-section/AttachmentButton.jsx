import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useState } from "react";
import Image from "next/image";
import { TiAttachment } from "react-icons/ti";

export default function AttachmentButton({ files, taskId }) {
  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_PB_URL;

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

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            fontSize: "18px",
            px: { xs: "20px", md: "24px" },
            pb: { xs: "10px", md: "16px" },
          }}
          className="flex items-center gap-1 text-neutral-600"
        >
          <AttachFileIcon sx={{ fontSize: "18px", rotate: "45deg" }} />
          Attachments
        </DialogTitle>
        <DialogContent sx={{ px: { xs: "20px", md: "24px" } }}>
          {!files.length ? (
            <p className="text-sm font-medium text-neutral-500 px-1">
              No attachment file.
            </p>
          ) : (
            <Stack spacing={0.5}>
              {files.map((file, index) => (
                <Box
                  key={index}
                  className="flex cursor-pointer items-center gap-4 rounded-md px-2 py-1.5 hover:bg-neutral-100"
                  onClick={() => setSelectedFile(file)}
                >
                  <div className="relative size-10 shrink-0 cursor-pointer overflow-hidden rounded-md">
                    <Image
                      src={`${baseUrl}/api/files/tasks/${taskId}/${file}`}
                      alt="attachment image"
                      fill
                      className="w-full"
                      unoptimized
                      priority
                    />
                  </div>
                  <div>
                    <p className="max-w-[200px] truncate text-xs font-medium text-neutral-500 sm:max-w-full md:text-[13px]">
                      {file}
                    </p>
                  </div>
                </Box>
              ))}
            </Stack>
          )}
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedFile}
        onClose={() => setSelectedFile(null)}
        maxWidth="md"
        fullWidth
      >
        <DialogContent
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            py: "30px",
          }}
        >
          {selectedFile && (
            <Box
              sx={{
                position: "relative",
                width: "100%",
                height: "500px",
              }}
            >
              <Image
                src={`${baseUrl}/api/files/tasks/${taskId}/${selectedFile}`}
                alt={selectedFile}
                fill
                className="object-contain"
                unoptimized
              />
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
