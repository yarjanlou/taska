import { Card, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useDraggable } from "@dnd-kit/core";
import AttachmentButton from "./AttachmentButton";

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
      className="task-card relative h-[115px] w-60 shrink-0 cursor-grab rounded-md! px-4 py-3 md:h-[130px] md:w-auto md:px-5 md:py-4"
      variant="outlined"
    >
      <Stack spacing={{ xs: 0.5, md: 1 }}>
        <Typography
          variant="span"
          className="text-[13px] font-semibold md:text-sm"
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          className="font-medium text-neutral-400"
          sx={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
            overflow: "hidden",
            textOverflow: "ellipsis",
            lineHeight: "1.2rem",
            fontSize: { xs: "13px", md: "14px" },
          }}
        >
          {description}
        </Typography>
      </Stack>
      <div className="absolute inset-x-0 bottom-0 h-1/4 w-full border-t border-neutral-200">
        <div className="flex h-full justify-between px-3.5 py-0.5 md:px-4">
          <AttachmentButton files={images} taskId={id} />
          {formattedDeadline && (
            <p className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 md:text-xs">
              <span>Due :</span>
              <span>{formattedDeadline}</span>
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
