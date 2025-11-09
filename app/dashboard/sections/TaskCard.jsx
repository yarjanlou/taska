import { Card, Stack, Typography } from "@mui/material";

export default function TaskCard({ title, description }) {
  return (
    <Card className="h-[120px] rounded-md! px-5 py-4" variant="outlined">
      <Stack spacing={1}>
        <Typography variant="span" className="text-[13px] font-semibold">
          {title}
        </Typography>
        <Typography
          variant="p"
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
    </Card>
  );
}
