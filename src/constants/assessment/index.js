import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { previousYear } from "./previousyear";
import { scoremeta } from "./scoremeta";

export const assessment = {
    name: "Assessment",
    icon: <ConfirmationNumberIcon />,
    child: [
        previousYear,
        scoremeta]
}