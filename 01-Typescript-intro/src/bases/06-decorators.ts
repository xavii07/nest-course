const Deprecated = (deprecationReason: string) => {
  return (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor
  ) => {
    console.log(target);
    return {
      get() {
        const wrappenFn = (...args: any[]) => {
          console.warn(
            `Method ${memberName} is deprecated with rason: ${deprecationReason}`
          );
          //!Llamar a la funcion propiamente con sus argumentos
          propertyDescriptor.value.appy(this, args);
        };
        return wrappenFn;
      },
    };
  };
};

export class Pokemon {
  constructor(public readonly id: number, public name: string) {}
  scream() {
    console.log(`${this.name} says: ${this.name}!`);
  }

  @Deprecated("The pokemon can't speak anymore")
  speak() {
    console.log(`${this.name} says: ${this.name}!`);
  }
}

export const charmander = new Pokemon(4, "Charmander");
