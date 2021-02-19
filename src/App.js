import { Switch, Route } from "react-router-dom";
import Header from './components/Header/Header';
import Home from './components/Home/Home'
import Books from './components/Books/Books'
import Characters from './components/Characters/Characters'
import Favorites from './components/Favorites/Favorites'
import Family from './components/Family/Family'
import BooksDetails from './components/Books/BookDetails/BookDetails'
import CharactersDetails from './components/Characters/CharactersDetails/CharactersDetails'
import FamilyDetails from './components/Family/FamilyDetails/FamilyDetails'

const App = () => {
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' render={() => <Home />} />
        <Route path='/books/:id' render={() => <BooksDetails />} />
        <Route path='/books/' render={() => <Books />} />
        <Route path='/characters/:id' render={() => <CharactersDetails />} />
        <Route path='/characters' render={() => <Characters />} />
        <Route path='/family/:id' render={() => <FamilyDetails />} />
        <Route path='/family' render={() => <Family />} />
        <Route path='/favorites' render={() => <Favorites />} />
      </Switch>
    </div>
  );
}

export default App;