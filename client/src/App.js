import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Error from './componentes/Error';
import FormMonth from './componentes/FormMonth';
import Allmonths from './componentes/AllMonths';
import UpdateMonth from './componentes/UpdateMonth';
import Register from './componentes/Register';
import Login from './componentes/Login';
import'./App.css'

const App = () => {
  return(
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact render={()=> <Register/> } />
          <Route path="/login" exact render={()=> <Login/> } />
          <Route path="/month/update/:id" render={() => <UpdateMonth />}/>
          <Route path="/nuevo" exact render={()=> <FormMonth/> } />
          <Route path="/month/update/:id" render={() => <UpdateMonth />}/>
          <Route path="/months" exact render={()=><Allmonths />} />
          <Route path="/error" render={() => <Error /> } />
          <Route path="*" render={() => <Error /> } />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
