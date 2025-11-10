import { Card, Stack, Typography } from "@mui/material";
import AttachmentButton from "./AttachmentButton";

export default function TaskCard({ id, title, description, images }) {
  return (
    <Card
      className="relative h-[130px] rounded-md! px-5 py-4"
      variant="outlined"
    >
      <Stack spacing={1}>
        <Typography variant="span" className="text-[13px] font-semibold">
          {title}
        </Typography>
        <Typography
          variant="body2"
          className="text-xs font-medium text-neutral-400"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.2rem",
          }}
        >
          {description}
        </Typography>
      </Stack>
      <div className="absolute inset-x-0 bottom-0 h-1/4 w-full border-t border-neutral-200">
        <div className="h-full px-4 py-0.5 text-neutral-500">
          <AttachmentButton files={images} taskId={id} />
        </div>
      </div>
    </Card>
  );
}
