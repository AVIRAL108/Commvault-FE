import { CloudUpload } from '@mui/icons-material'
import { Button, CircularProgress, Grid } from '@mui/material'
import { useSelector } from 'react-redux';
import useFileUpload from '../../../../hooks/useUpload';

const UploadButton = (props) => {
    const { field, label, lotties } = props;
    const { loading, uploadedFile, handleFileUpload } = useFileUpload(field.name);
    const file = useSelector((state) =>  state.files[field.name]);
    return (
      <Grid item xs={12}>
        <Button
          component="label"
          startIcon={<CloudUpload />}
          variant="outlined"
        >
          {label}
          <input {...field} type="file" hidden onChange={handleFileUpload} />
        </Button>
   

        {loading ? (
          <CircularProgress />
        ) :  lotties && file ? <a rel="noopener noreferrer" href={uploadedFile? uploadedFile : file} style={{display : "block", fontSize : '13px'}}  target="_blank" > Download File</a> : uploadedFile ? (
          <img
            alt="error on source"
            src={uploadedFile}
            onError={(e) =>
              (e.target.src =
                "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png")
            }
            style={{ display: "block", margin: "5px", width: 160, height: 80 }}
          />
        ) :  file ?   <img
        alt="uploaded url to s3"
        src={file}
        onError={(e) =>
          (e.target.src =
            "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png")
        }
        style={{ display: "block", margin: "5px", width: 160, height: 80 }}
      />
    :  undefined }
      </Grid>
    );
}
export default UploadButton