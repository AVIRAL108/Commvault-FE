import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { fileServer } from "./fileServer";

export const menu = {
    name: "Menu",
    icon: <ConfirmationNumberIcon />,
    child: [ fileServer ]
}

