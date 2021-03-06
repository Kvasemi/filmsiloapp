import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./components/Pages/HomePage/HomePage";
import MoviePage from "./components/Pages/MoviePage/MoviePage";
import PersonPage from "./components/Pages/PersonPage/PersonPage";
import ResultsPage from "./components/Pages/ResultsPage/ResultsPage";

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/movie/:movieId' component={MoviePage} />
            <Route path='/person/:personId' component={PersonPage} />
            <Route path='/search' component={ResultsPage} />
          </Switch>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
