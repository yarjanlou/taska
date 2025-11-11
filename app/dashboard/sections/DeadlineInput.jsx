import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function DeadlineInput({ deadline, setDeadline }) {
  return (
    <div className="w-full">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          openPickerOnClick={true}
          slotProps={{
            textField: {
              size: "small",
              fullWidth: true,

              sx: {
                "& .MuiInputBase-root": { padding: "4px 8px" },
                "& .MuiPickersInputBase-sectionContent": {
                  fontSize: "14px",
                  fontWeight: 500,
                },
                "& .MuiPickersInputBase-sectionAfter": { fontSize: "13px" },
                "& .MuiFormLabel-root": { fontSize: "14px" },
              },
            },
          }}
          label="Deadline"
          value={deadline}
          onChange={(newValue) => setDeadline(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              margin="dense"
              fullWidth
              slotProps={{ inputLabel: { fontSize: "12px" } }}
            />
          )}
          disablePast
        />
      </LocalizationProvider>
    </div>
  );
}
