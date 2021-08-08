import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./components/Pages/HomePage/HomePage";
import MoviePage from "./components/Pages/MoviePage/MoviePage";
import PersonPage from "./components/Pages/PersonPage/PersonPage";
import ScrollToTop from "./components/Modules/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop>
          <AuthProvider>
            <Switch>
              <Route exact path='/' component={HomePage} />
              <Route path='/movie/:movieId' component={MoviePage} />
              <Route path='/person/:personId' component={PersonPage} />
            </Switch>
          </AuthProvider>
        </ScrollToTop>
      </Router>
    </>
  );
}

export default App;
