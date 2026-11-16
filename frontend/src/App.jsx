import{BrowserRouter,Routes,Route}from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Ideas from "./Ideas";
import IdeaDetails from "./IdeaDetails";
import BudgetIdeas from "./BudgetIdeas";
import PurposeIdeas from "./PurposeIdeas";
import Favorites from "./Favorites";
function App(){
  return(
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
     <Route path="/idea-details" element={<IdeaDetails/>}/>
    <Route path="/ideas" element={<Ideas/>}/>
    <Route path="/budgetideas" element={<BudgetIdeas/>}/>
    <Route path="/purposeideas" element={<PurposeIdeas/>}/>
     <Route path="/favorites" element={<Favorites/>}/>

    </Routes>
    </BrowserRouter>
  );
}
export default App;
