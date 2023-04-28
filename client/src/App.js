import './App.css';
import{BrowserRouter,Route,Routes} from 'react-router-dom' 
import LandingPage from './components/LandingPage'
import Home from './components/Home';
import RecipeCreate from './components/RecipeCreate';

import Details from './components/Details';
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes >
      <Route path='/home' element={<Home/>} />
      <Route path='/recipes/:id' element={<Details/>} />
      <Route path='/recipe' element={<RecipeCreate/>} />
      <Route path='/' element={<LandingPage/>} />

        
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}

export default App;
