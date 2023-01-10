import { Hello } from "./Hello";

describe('Hello', () => {
  it('should be able send message', () => {
    const hello = new Hello({
      message: 'Hello world'
    });

    expect(hello.message).toEqual('Hello world');
  });
});