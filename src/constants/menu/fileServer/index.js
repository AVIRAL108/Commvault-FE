import {
  GET_DATA,
  POST_DATA,
  PUT_DATA,
  DELETE_DATA,
  GET_JOBS_BY_SERVER_ID
} from "../../../redux/constants/keys";
import { fileServerConfig } from "../../../configs/ApiConfigs/fileServerConfig";
import InputText from "../../../components/common/Fields/InputText";
import Dropdown from "../../../components/common/Fields/Dropdown";
import Crud from "../../../components/Core/Modules/Crud";
import { Link } from "react-router-dom";
import _ from "lodash";
import Endpoints from "../../../configs/endpoints";
import { ArticleOutlined } from "@mui/icons-material";
import { serverTimeConversion } from "../../../utils.js";
import { averageTimeTaken, isProtected, lastBackupTime } from "../../../utils.js/fileServer";

const operatingSystem = [
  { id: 0, text: "Window", value: 0 },
  { id: 1, text: "Linux", value: 1 },
];
// table columns required for list
const tableColumns = [
  {
    field: "name",
    headerName: "Server Name",
    width: 200,
    sortable: false,
  },
  {
    field: "ipAddress",
    headerName: "IP Address",
    width: 180,
    sortable: false,
  },
  {
    field: "operatingSystem",
    headerName: "Operating System",
    width: 120,
    sortable: false,
    valueGetter : (params) => { 
     return  _.mapKeys(operatingSystem,"id")[params.value].text
    }
  },
  {
    field: "softwareVersion",
    headerName: "Software Version",
    width: 150,
    sortable: false,
  },
  {
    field: "edit",
    headerName: "Operations",
    width: 120,
    sortable: false,
    renderCell: (params) => (
      <>
        <Link to={`/${fileServer.name}/edit/${params.id}`}>Edit</Link>
        &nbsp;
        <Link to={`/${fileServer.name}/view/${params.id}`}> View</Link>
      </>
    ),
  },
];

// form feilds to render into form
const formFields = [
  [
    {
      name: "name",
      rules: {
        required: { value: true, message: "Required" },
        minLength : { value :  2, message: "At least 2 characters" },
        maxLength : { value :  20, message: "Maximum 20 characters allowed" }

      },
      defaultValue: "",
      component: InputText,
      label: "Server Name",
      variant: "standard",
    },
    {
      name: "ipAddress",
      rules: {
        required: { value: true, message: "Required" },
        pattern: {
          value: /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/,
          message: "invalid ip address"
        }
      },
      defaultValue: "",
      component: InputText,
      label: "IP Address",
      variant: "standard",
    },
  ],
  [
    {
      name: "operatingSystem",
      component: Dropdown,
      defaultValue: "",
      rules: { required: { value: true, message: "Required" } },
      label: "Operating System",
      variant: "standard",
      options: operatingSystem,
    },
    {
      name: "softwareVersion",
      rules: {
        required: { value: true, message: "Required" },
        pattern: {
          value: /^(\d+\.)?(\d+\.)?(\*|\d+)$/,
          message: "invalid software version"
        }
      },
      defaultValue: "",
      component: InputText,
      label: "Software Version",
      variant: "standard",
    },
  ],
];

const filters = [
  {
    name: "name",
    rules: {
      required: { value: true, message: "Required" },
    },
    defaultValue: "",
    component: InputText,
    label: "Server Name",
    fullWidth: false,
    variant: "standard",
  },
];

// Configurations to get the data
const list = {
  config: fileServerConfig,
  method: "get",
  uri: `${Endpoints.fileServers}`,
  type: GET_DATA,
};

//Configurations to post the data
const create = {
  config: fileServerConfig,
  method: "post",
  uri: `${Endpoints.fileServers}`,
  type: POST_DATA,
};

const edit = {
  config: fileServerConfig,
  method: "put",
  uri: `${Endpoints.fileServers}`,
  type: PUT_DATA,
};

const remove  = {
  config  :  fileServerConfig,
  method : 'delete',
  uri: `${Endpoints.fileServers}`,
  type  :  DELETE_DATA

}

const jobConfig  = { 
  config : fileServerConfig,
  method : 'get',
  uri:  Endpoints.jobs,
  type : GET_JOBS_BY_SERVER_ID,
}

//Final object which is passed to the curd const
export const fileServer = {
  name: "fileServer",
  title: "File Server",
  columns: tableColumns,
  icon: <ArticleOutlined/> ,
  list,
  create,
  edit,
  remove,
  formFields,
  filters,
  jobConfig,
  comp: Crud,
};

export const JobsDetailTableColumns = [
  {
    field: "startTime",
    type: "date",
    headerName: "Start Time",
    width: 300,
    valueGetter: (params) => serverTimeConversion(params.row.startTime),
  },
  {
    field: "endTime",
    headerName: "End Time",
    width: 300,
    valueGetter: (params) => serverTimeConversion(params.row.endTime),
  },
  {
    field: "status",
    headerName: "Status",
    width: 250,
    renderCell: (params) => {
      switch (params.row.status) {
        case "Completed":
          return <span style={{ color: "green" }}>Completed</span>;
        case "Failed":
          return <span style={{ color: "red" }}>Failed</span>;
        default:
          return <span style={{ color: "yellow" }}>Running...</span>;
      }
    },
  },
];


export const jobBackupDetails  = [  { label :  'Is protected' , function : isProtected } , {  label :  'Last backup time', function : lastBackupTime } ,  { label :  'Average Time Taken',  function : averageTimeTaken }]