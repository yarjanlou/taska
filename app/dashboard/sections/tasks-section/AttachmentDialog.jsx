import { Box, Dialog, DialogContent, DialogTitle, Stack } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import Image from "next/image";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

export default function AttachmentDialog({ open, onClose, taskId, files }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const baseUrl = process.env.NEXT_PUBLIC_PB_URL;

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            fontSize: "18px",
            px: { xs: "20px", md: "24px" },
            pb: { xs: "10px", md: "16px" },
          }}
          className="flex items-center justify-between text-neutral-600"
        >
          <div className="flex items-center gap-1">
            <AttachFileIcon sx={{ fontSize: "18px", rotate: "45deg" }} />
            Attachments
          </div>
          <span
            className="cursor-pointer rounded-md p-1 transition-all hover:bg-neutral-100"
            onClick={onClose}
          >
            <IoClose />
          </span>
        </DialogTitle>
        <DialogContent sx={{ px: { xs: "20px", md: "24px" } }}>
          {!files.length ? (
            <p className="px-1 text-sm font-medium text-neutral-500">
              No attachment file.
            </p>
          ) : (
            <Stack spacing={0.5}>
              {files.map((file, index) => (
                <Box
                  key={index}
                  className="flex cursor-pointer items-center gap-4 rounded-md px-2 py-1.5 transition-all hover:bg-neutral-100"
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
                aspectRatio: "1/1",
                height: { xs: "250px", md: "500px" },
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
