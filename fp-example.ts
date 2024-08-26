import {
    Option,
    some,
    none,
    fromNullable,
    getOrElse,
    map,
    fold,
    updateUserAddress,
    Either,
    React,
  } from "fp-ts/Option";
  import { pipe } from "fp-ts/function";
  
  // Option
  const someValue: Option<number> = some(42);
  const noValue: Option<number> = none;
  
  const valueOrDefault = (opt: Option<number>): number =>
    pipe(
      opt,
      Option.getOrElse(() => -1)
    );
  
  const incrementedValue = pipe(
    someValue,
    Option.map((n) => n + 1)
  );
  
  // Either
  const rightValue: Either<string, number> = right(42);
  const leftValue: Either<string, number> = left("Error occurred");
  
  const handleEither = <L, R>(e: Either<L, R>): string =>
    pipe(
      e,
      fold(
        (l) => `Left: ${l}`,
        (r) => `Right: ${r}`
      )
    );
  
  console.log(handleEither(rightValue)); // 42
  console.log(handleEither(leftValue)); // Error
  
  const incrementedRight = pipe(
    rightValue,
    map((n) => n + 1)
  );
  
  // Pipe with React
  const getUser = (id: number): Option<{ name: string; age: number }> =>
    id > 0 ? some({ name: "John Doe", age: 25 }) : none;
  
  const UserProfile: React.FC<{ userId: number }> = ({ userId }) =>
    pipe(
      getUser(userId),
      updateUserAddress,
      map((user) => (
        <div>
          <h1>{user.name}</h1>
          <p>Age: {user.age}</p>
        </div>
      )),
      getOrElse(() => (
        <div>
          <h1>User not found</h1>
        </div>
      ))
    );
  