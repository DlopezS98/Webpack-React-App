import React, { Component } from 'react'
import { Constant, Greethings } from "./constant";

export default class App extends Component {

  private name: String = "Danny Lopez";
  private age: Number = 23;

  render() {
    return (
      <div>
        <h1>Webpack + React setup</h1>
        <h4>{Constant.HelloWorld} With constant property from a class</h4>
        <h4>{Greethings.HelloWorld}</h4>
      </div>
    )
  }
}