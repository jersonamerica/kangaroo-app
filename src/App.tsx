import { Switch, Route, Link } from "react-router-dom";

import Grid from "components/grid/Grid";
import KangarooForm from "./components/kangarooForm/KangarooForm";
import EditKangaroo from "./components/EditKangaroo";
import Container from "components/container/Container";
import Button from "components/button/Button";

import "./App.scss";

import { kangaroos } from "./data";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Container>
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
      </Switch>
    </>
  );
}

export default App;
