import React, { Component } from "react";
import "./App.css";

import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search-box/search-box.component"

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }

  //Llama a la API de monstruos para traer la información en la primera carga de la app.
  async componentDidMount() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const json = await response.json();
    this.setState({ monsters: json });
  }

  //Cuando se declara un método dentro de la clase, hay que ponerlo como arrow fnc para evitar escribir el código con binding.
  handleChange = e => {
    this.setState({ searchField: e.target.value });
  }

  render() {
    //Filtro de cards según el elemento que se quiera buscar. No es sensible a mayúsculas y minúsculas.
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
      );

    return (
      <div className="App">
        <h1> Monsters Rolodex  </h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
