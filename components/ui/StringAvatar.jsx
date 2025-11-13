import { Avatar } from "@mui/material";

export default function StringAvatar({ name }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
  }

  function stringAvatar(name) {
    const nameParts = name.split(" ");
    const firstLetter = nameParts[0][0].toUpperCase();
    const secondLetter =
      nameParts.length > 1 ? nameParts[1][0].toUpperCase() : "";

    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${firstLetter}${secondLetter}`,
    };
  }

  return (
    <Avatar
      {...stringAvatar(name)}
      sx={{
        width: { xs: "24px", lg: "27px" },
        height: { xs: "24px", lg: "27px" },
        fontSize: { xs: "10px", lg: "12px" },
        fontWeight: { xs: "500", lg: "600" },
        ...stringAvatar(name).sx,
      }}
    />
  );
}
