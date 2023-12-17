//TODO: Los decoradores no son mas que simples funciones

const MyDecorator = () => {
  return (target: Function) => {
    console.log(target);
  };
};

@MyDecorator() //TODO: podemos pasar argumentos o mas decoradores debajo
export class Pokemon {
  constructor(public readonly id: number, public name: string) {}
  scream() {
    console.log(`${this.name} says: ${this.name}!`);
  }

  speak() {
    console.log(`${this.name} says: ${this.name}!`);
  }
}

export const charmander = new Pokemon(4, "Charmander");
