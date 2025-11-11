import { Card, Stack, Typography } from "@mui/material";
import AttachmentButton from "./AttachmentButton";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDraggable } from "@dnd-kit/core";

dayjs.extend(utc);

export default function TaskCard({
  id,
  title,
  description,
  images,
  deadline,
  style,
}) {
  const formattedDeadline = deadline
    ? dayjs.utc(deadline).local().format("MMM D, YYYY")
    : null;

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        ...style,
      }}
      className="relative h-[130px] cursor-grab rounded-md! px-5 py-4"
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
        <div className="flex h-full justify-between px-4 py-0.5">
          <AttachmentButton files={images} taskId={id} />
          {formattedDeadline && (
            <p className="flex items-center gap-1 text-xs font-medium text-neutral-400">
              <span>Due :</span>
              <span>{formattedDeadline}</span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
