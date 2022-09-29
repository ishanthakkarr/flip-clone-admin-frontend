import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './containers/Home';
import NewPage from './containers/NewPage';
import Signin from './containers/Signin';
import Signup from './containers/Signup';
import Products from './containers/Products';
import Orders from './containers/Orders';
import PrivateRoute from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getAllCategory, getInitialData } from './actions';
import Category from './containers/Category';

function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate)
      dispatch(isUserLoggedIn());
    if (auth.authenticate)
      dispatch(getInitialData());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <Routes>
        {/* <PrivateRoute path="/" exact element={<Home />}/> */}
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />
        </Route>
        <Route path='/page' element={<PrivateRoute />}>
          <Route path='/page' element={<NewPage />} />
        </Route>
        <Route path='/products' element={<PrivateRoute />}>
          <Route path='/products' element={<Products />} />
        </Route>
        <Route path='/orders' element={<PrivateRoute />}>
          <Route path='/orders' element={<Orders />} />
        </Route>
        <Route path='/category' element={<PrivateRoute />}>
          <Route path='/category' element={<Category />} />
        </Route>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
