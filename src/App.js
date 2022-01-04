import { Container, Paper } from "@mui/material";
import _ from "lodash";
import { Switch, Route } from "react-router-dom";
import MiniDrawer from "./components/common/Surfaces/MinDrawer";
import { MainRoute } from "./components/Core/Navigation/MainRoute";
import { cruds } from "./constants/crud";
import { setConfig } from "./utils.js";
const App = () => {
  setConfig();
  return (
    <>
      <MiniDrawer show={0} list={cruds}>
        <Container component="main" maxWidth="md" sx={{ mb: 0 }}>
          <Paper variant="outlined" sx={{ my: { xs: 2, md: 4 }, p: { xs: 2, md: 2 } }}>
            <Switch>
              <Route exact path="/" component={() => <h1> Unauthorised </h1>}  />
              {
                _.map((cruds), (v) => {
                  return v.child ? _.map(v.child, (data) => {
                    return   <Route key={data.name} path={`/${data.name}`} component={() => <data.comp
                      {...data}
                  />} />
                  }) : <MainRoute data={v} />
                })
              }
            </Switch>
          </Paper>
        </Container>
      </MiniDrawer>
    </>
  );
}

export default App;
