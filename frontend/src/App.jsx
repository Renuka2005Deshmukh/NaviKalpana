import{BrowserRouter,Routes,Route,Navigate,useLocation}from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import Ideas from "./Ideas";
import IdeaDetails from "./IdeaDetails";
import BudgetIdeas from "./BudgetIdeas";
import PurposeIdeas from "./PurposeIdeas";
import Favorites from "./Favorites";
import SmartRecommendation from "./SmartRecommendation";
function ProtectedRoute({ children}){
  const userId = localStorage.getItem("userId");
  return userId ? children :
  <Navigate to ="/login" replace/>
}
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
    <Route path="/favorites" element={<ProtectedRoute><Favorites/></ProtectedRoute>}/>
     <Route path="/smart-recommendation" element={<SmartRecommendation/>}/>

    </Routes>
    </BrowserRouter>
  );
}
export default App;
