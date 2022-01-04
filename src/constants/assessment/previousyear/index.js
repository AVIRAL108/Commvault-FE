import { GET_PERCENTAGES, POST_PERCENTAGE, PUT_PERCENTAGE } from "../../../redux/constants/keys";
import { previousYearApiConfig } from "../../../configs/ApiConfigs/previousYearConfig";
import Endpoints from "../../../configs/endpoints";
import SportsScoreSharpIcon from '@mui/icons-material/SportsScoreSharp';
import InputText from "../../../components/common/Fields/InputText";
import Dropdown from "../../../components/common/Fields/Dropdown";
import Crud from "../../../components/Core/Modules/Crud";
import { Link } from "react-router-dom";

// table columns required for list
const tableColumns = [
  {
    field: "cohort_id",
    headerName: "Cohort ID",
    width: 100,
  },
  {
      field : "assessment_id",
      headerName: "Paper Analysis ID",
      width : 160,
  },
  {
    field : "related_assessment_id",
    headerName: "Related Paper Analysis",
    width : 150,
},
{
    field : "edit",
    headerName: "Edit",
    width : 100,
    renderCell: (params) => (
      <Link to={`/${previousYear.name}/edit/${params.id}`} >Edit</Link>
  )
},
{
    field : "status",
    headerName: "Status",
    width : 100,
    valueGetter : (params) => { 
        return params.row.status === 1  ?  "Enabled" : "Disabled"
    }
},
{
  field: "modified_at",
  headerName: "Lasted Updated",
  width: 200,
  valueGetter  : (params) => {
      return new Date(params.row.modified_at).toDateString()

  }
}
];

// form feilds to render into form
const formFields = [
    [
        {
            name: "cohort_id",
            component: InputText,
            defaultValue: '',
            rules: { required: { value: true, message: "Required" }},
            label: "Cohort ID",
            variant: "standard",
            type : "number"
        },
        {
            name: "assessment_id",
            defaultValue: '',
            rules: { required: { value: true, message: "Required" }},
            component: InputText,
            label: "Paper Analysis ID",
            variant: "standard",
            type : "number"

        },
    ],
    [
        {
            name: "related_assessment_id",
            defaultValue: '',
            rules: { required: { value: true, message: "Required" }},
            component: InputText,
            label: "Related Paper Analysis",
            variant: "standard",
            typeCast: "string"   
        },
        {
            name: "sequence",
            rules: { required: { value: true, message: "Required" }},
            defaultValue: '',
            component: InputText,
            label: "Sequence",
            variant: "standard",
            type : "number"
        },
        {
            name: "status",
            rules: { required: { value: true, message: "Required" }, min: { value: 0, message: "message should not be more than 100" } },
            defaultValue: '',
            component: Dropdown,
            label: "Status",
            type: "text",
            variant: "standard",
            options :  [{ id: 1, text: "Enable", value: "1" }, { id: 2, text: "Disable", value: "0" }]
        },
    ],

]

const filters = [
  {
    name: "assess_type",
    component: Dropdown,
    defaultValue: "jee",
    label: "Assessment Type",
    fullWidth :  false,
    variant: "standard",
    options: [
      { id: 1, text: "JEE", value: "jee" },
      { id: 2, text: "NEET", value: "neet" },
    ],
  },
  {
    name: "assess_sub_type",
    defaultValue: "skull",
    component: Dropdown,
    label: "Assessment Subtype",
    fullWidth :  false,
    variant: "standard",
    options: [
      { id: 1, text: "Skull", value: "skull" },
      { id: 2, text: "Booster", value: "booster" },
    ],
  },
  {
    name: "percentage",
    rules: {
      min: { value: 0, message: "%age should be >= 0" },
      max: { value: 99.99, message: "%age should be <= 99.99" },
    },
    defaultValue: '',
    component: InputText,
    label: "Percentage(%)",
    variant: "standard",
  },
];

// Configurations to get the data 
const list = {
    config: previousYearApiConfig,
    method: "get",
    uri: `${Endpoints.previousyear}`,
    type: GET_PERCENTAGES

};

//Configurations to post the data
const create = {
    config: previousYearApiConfig,
    method: "post",
    uri: `${Endpoints.previousyear}`,
    type: POST_PERCENTAGE,
};


const edit  = { 
    config: previousYearApiConfig,
    method: "post",
    uri: `${Endpoints.previousyear}`,
    type: PUT_PERCENTAGE,
}

//Final object which is passed to the curd const 
export const previousYear = {
    name: "previousyear",
    title: "Previous Year Paper",
    columns: tableColumns,
    icon: <SportsScoreSharpIcon />,
    list,
    create,
    edit,
    formFields,
    filters,
    comp  : Crud
}