import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Welcome1, Welcome2} from "./components/CompType";
import Clock from "./components/Clock";
import StateTest from "./components/StateTest";
import CartSample from "./components/CartSample";

function formatName(user) {
    return user.firstName + " " + user.lastName;
}
function App() {
    const name = "jerry";
    const user = { firstName: "tom", lastName: "jerry"};
    const jsx = <p>Hello, jerry</p>
  return (
      <div>
          {/*表达式*/}
          <h1>{name}</h1>
          <h1>{formatName(user)}</h1>
          {/*{属性}*/}
          <img src={logo} alt="" style={{width: '100px'}}/>
          {/*jsx也是表达式*/}
          {jsx}

          <Welcome1 name="Some content1"></Welcome1>
          <Welcome2 name="Some content2"></Welcome2>
          {/*state和状态*/}
          <Clock></Clock>

          <StateTest></StateTest>

          {/*条件与循环*/}
          <CartSample title="购物车"></CartSample>
      </div>
  );
}

export default App;
