import { Switch, Route, Link } from "react-router-dom";

import Grid from "components/grid/Grid";
import KangarooForm from "./components/kangarooForm/KangarooForm";
import EditKangaroo from "./components/editKangaroo/EditKangaroo";
import Container from "components/container/Container";
import Button from "components/button/Button";
import NotFound from "components/notfound/NotFound";

import "./App.scss";

import { kangaroos } from "./data";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Container>
            <h1 className="title">AussieFarm's Kangaroos</h1>
            <Grid data={kangaroos} />
            <Link className="add-btn" to="/add">
              <Button>Add Kangaroo</Button>
            </Link>
          </Container>
        </Route>
        <Route exact path="/edit/:id">
          <EditKangaroo />
        </Route>
        <Route exact path="/add">
          <KangarooForm />
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
