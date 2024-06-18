import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './scss/style.scss';
import { About, Contact, Courses, Footer, Home, Navbar, Teacher } from './views';



const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

export function Landing() {
  return (
    <div>
      <Navbar />
      <Home />
      <About />
      <Courses />
      <Teacher />
      <Contact />
      <Footer />
    </div>
  );
}




const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const Signup = React.lazy(() => import('./views/Signup/Signup'));
const Login = React.lazy(() => import('./views/Login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const LoginSuperAdmin = React.lazy(() => import('./views/pages/SuperAdmin/LoginSuperAdmin'));
const ResetPassword = React.lazy(() => import('./views/pages/login/ResetPassword'));
const ForgetPassword = React.lazy(() => import('./views/pages/login/ForgetPassword'));
const AjoutAdministrateur = React.lazy(() => import('./views/pages/SuperAdmin/AjoutAdministrateur'));
const HomeSuper = React.lazy(() => import('./views/pages/SuperAdmin/HomeSuper'));
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const TestForm = React.lazy(() => import('./views/TestForm/TestForm'));

class App extends Component {
  
  render() {
    return (
      <Router>
        <Suspense fallback={loading}>
          <Switch>
            <Route exact path="/" name="Acceuill Page" render={(props) => <Landing {...props} />} />
            <Route exact path="/signup" name="Signup Page" render={(props) => <Signup {...props} />} />
            <Route exact path="/login" name="Login Page" render={(props) => <Login {...props} />} />
            <Route exact path="/TestForm" name="test Page" render={(props) => <TestForm {...props} />} />
            <Route exact path="/ResetPassword" name="ResetPassword" render={(props) => <ResetPassword {...props} />} />
            <Route exact path="/ForgetPassword" name="ForgetPassword" render={(props) => <ForgetPassword {...props} />} />
            <Route exact path="/register" name="Register Page" render={(props) => <Register {...props} />} />
            <Route exact path="/amine" name="LoginSuperAdmin" render={(props) => <LoginSuperAdmin {...props} />} />
            <Route exact path="/HomeSuper" name="HomeSuper" render={(props) => <HomeSuper {...props} />} />
            <Route exact path="/AjoutAdministrateur" name="AjoutAdministrateur" render={(props) => <AjoutAdministrateur {...props} />} />
            <Route path="/" name="Home" render={(props) => <TheLayout {...props} />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Switch>
        </Suspense>
      </Router>
    );
  }
}

export default App;
