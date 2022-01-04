import {
  GET_PERCENTAGES,
  POST_PERCENTAGE,
  PUT_PERCENTAGE,
} from "../../../redux/constants/keys";
import { srvApiConfig } from "../../../configs/ApiConfigs/srvConfig";
import Endpoints from "../../../configs/endpoints";
import SportsScoreSharpIcon from "@mui/icons-material/SportsScoreSharp";
import InputText from "../../../components/common/Fields/InputText";
import Dropdown from "../../../components/common/Fields/Dropdown";
import UploadButton from "../../../components/Core/helpers/UploadButton";
import Crud from "../../../components/Core/Modules/Crud";
import { Link } from "react-router-dom";
import _ from "lodash";
import { getConfig, serialize } from "../../../utils.js";

const assesmentTypes = [
  { id: "jee_main", text: "JeeMain", value: "jee_main" },
  { id: "neet", text: "Neet", value: "neet" },
];
const assesmentSubTypes = [
  { id: "skull_crusher", text: "SkullCrusher", value: "skull_crusher" },
];

const status = [
  { id: 0, text: "Inactive", value: 0 },
  { id: 1, text: "Active", value: 1 },
];
const configs = serialize(getConfig('config'));

// table columns required for list
const tableColumns = [
  {
    field: "perc_from",
    headerName: "%age From",
    width: 100,
    editable: true,
    sortable  :  false
  },
  {
    field: "perc_to",
    headerName: "%age To",
    width: 100,
    editable: true,
    sortable  :  false

  },
  {
    field: "assess_type",
    headerName: "Assess Type",
    width: 120,
    editable: true,
    valueGetter: (params) => {
      return _.mapKeys(assesmentTypes, "id")[params.row.assess_type]?.text;
    },
    sortable  :  false

  },
  {
    field: "assess_sub_type",
    headerName: "Assess Sub Type",
    width: 150,
    editable: true,
    valueGetter: (params) => {
      return _.mapKeys(assesmentSubTypes, "id")[params.row.assess_sub_type]?.text;
    },
    sortable  :  false

  },
  {
    field: "edit",
    headerName: "Edit",
    width: 80,
    renderCell: (params) => (
      <Link to={`/${scoremeta.name}/edit/${params.id}?${configs}`}>Edit</Link>
    ),
    sortable  :  false

  },
  {
    field: "status",
    headerName: "Status",
    width: 70,
    editable: true,
    valueGetter: (params) => {
      return _.mapKeys(status, "id")[params.row.status]?.text;
    },
    sortable  :  false

  },
  {
    field: "modified_at",
    headerName: "Last Updated",
    width: 170,
    valueGetter: (params) => {
      return new Date(params.row.modified_at).toDateString();
    },
    sortable  :  false

  },

];

// form feilds to render into form
const formFields = [
  [
    {
      name: "assess_type",
      component: Dropdown,
      defaultValue: "",
      rules: { required: { value: true, message: "Required" } },
      label: "Assessment Type",
      variant: "standard",
      options: assesmentTypes,
    },
    {
      name: "assess_sub_type",
      defaultValue: "",
      rules: { required: { value: true, message: "Required" } },
      component: Dropdown,
      label: "Assessment Subtype",
      variant: "standard",
      options: assesmentSubTypes,
    },
  ],
  [
    {
      name: "perc_from",
      rules: {
        required: { value: true, message: "Required" },
        max: { value: 100, message: "%age should be <= 99.99" },
      },
      defaultValue: "",
      component: InputText,
      label: "Percentage(%) From",
      type: "number",
      variant: "standard",
    },
    {
      name: "perc_to",
      rules: {
        required: { value: true, message: "Required" },
        min: { value: 0, message: "%age should be >= 0" },
        max: { value: 100, message: "%age should be <= 99.99" },
      },
      defaultValue: "",
      component: InputText,
      label: "Percentage(%) To",
      type: "number",
      variant: "standard",
    },
  ],
  {
    name: "message",
    rules: {
      required: { value: true, message: "Required" },
      min: { value: 0, message: "message should not be more than 100" },
    },
    defaultValue: "",
    component: InputText,
    label: "Message",
    type: "text",
    variant: "standard",
  },

  [
  {
    name: "sub_message",
    defaultValue: "",
    component: InputText,
    label: "Sub Message",
    type: "text",
    variant: "standard",
  },
  {
    name: "status",
    defaultValue: 1,
    component: Dropdown,
    label: "Status",
    variant: "standard",
    options: status,
  },
],
  [
    {
      name: "image_small",
      label: "Small Image",
      type: "file",
      component: UploadButton,
    },
    {
      name: "image_medium",
      label: "Medium Image",
      type: "file",
      component: UploadButton,
    },
    {
      name: "image_large",
      label: "Large Image",
      type: "file",
      component: UploadButton,
    },
    {
      name: "lottie_file_url",
      label: "Lottie File",
      type: "file",
      component: UploadButton,
      lottie: true,
    },
  ],
];

const filters = [
  {
    name: "assess_type",
    component: Dropdown,
    defaultValue: "jee_main",
    label: "Assessment Type",
    fullWidth: false,
    variant: "standard",
    options: assesmentTypes
  },
  {
    name: "assess_sub_type",
    defaultValue: "skull_crusher",
    component: Dropdown,
    label: "Assessment Subtype",
    fullWidth: false,
    variant: "standard",
    options: assesmentSubTypes
  },
  {
    name: "percentage",
    rules: {
      min: { value: 0, message: "%age should be >= 0" },
      max: { value: 100, message: "%age should be <= 99.99" },
    },
    defaultValue: "",
    component: InputText,
    label: "Percentage(%)",
    variant: "standard",
  },
];

// Configurations to get the data
const list = {
  config: srvApiConfig,
  method: "get",
  uri: `${Endpoints.skullcrusher}`,
  type: GET_PERCENTAGES,
};

//Configurations to post the data
const create = {
  config: srvApiConfig,
  method: "post",
  uri: `${Endpoints.skullcrusher}`,
  type: POST_PERCENTAGE,
};

const edit = {
  config: srvApiConfig,
  method: "post",
  uri: `${Endpoints.skullcrusher}`,
  type: PUT_PERCENTAGE,
};

//Final object which is passed to the curd const
export const scoremeta = {
  name: "scoremeta",
  title: "Scoremeta",
  columns: tableColumns,
  icon: <SportsScoreSharpIcon />,
  list,
  create,
  edit,
  formFields,
  filters,
  comp: Crud,
};
