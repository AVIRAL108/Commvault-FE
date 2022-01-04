import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Create from "./Create";
import Edit from "./Edit";
import List from "./List";
const Crud = ({ name, title, columns, list, create, edit, formFields, filters }) => {
  return (
    <Switch>
      <Route
        exact
        path={`/${name}`}
        component={() => <Redirect to={`/${name}/list`} />}
      />
      <Route
        exact
        path={`/${name}/list`}
        component={() => <List name={name} filters={filters} title={title} list={list} columns={columns} />}
      />
      <Route
        path={`/${name}/create`}
        component={() => (
          <Create
            formFields={formFields}
            name={name}
            config={create}
            title={title}
          />
        )}
      />
      <Route
        exact
        path={`/${name}/edit/:id`}
        component={(location) => (
          <Edit
            formFields={formFields}
            location={location}
            name={name}
            config={edit}
            title={title}
          />
        )}
      />
    </Switch>
  );
};
export default Crud;
