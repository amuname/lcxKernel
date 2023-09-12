export abstract class Predicate2<A, B> {
  public abstract predicate(arg: A | B): arg is A;
}

export abstract class Predicate3<A, B, C> {
  public abstract predicate(arg: A | B | C): arg is A;
}

export abstract class Predicate4<A, B, C, D> {
  public abstract predicate(arg: A | B | C | D): arg is A;
}
