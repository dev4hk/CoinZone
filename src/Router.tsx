import { BrowserRouter, Route, Switch } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Navbar from "./components/Navbar";

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/:coinId">
          <Coin />
        </Route>
        <Route path="/">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
