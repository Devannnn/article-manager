// Libraries
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import { useNotification } from "../../redux/selectors";
import { useDispatch } from "react-redux";
import { DELETE_NOTIFICATION } from "../../redux/actionsCreators";

function NotificationBox() {
  const dispatch = useDispatch();
  const notification = useNotification();
  const colorMap = {
    error: "#FE5531", // Soft red
    warning: "#FEAD28", // Soft orange
    info: "#31AAFE", // Soft blue
    success: "#6FCC62", // Soft green
  };
  const color: string = colorMap[notification.severity];

  function handleClose() {
    dispatch(DELETE_NOTIFICATION());
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      open={notification.open}
      onClose={handleClose}
      autoHideDuration={3000}
      key={notification.timestamp}
    >
      <SnackbarContent
        style={{
          backgroundColor: color,
        }}
        message={
          <span id="client-snackbar text-black">{notification.message}</span>
        }
      />
    </Snackbar>
  );
}

export default NotificationBox;
