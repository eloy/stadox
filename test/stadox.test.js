import Stadox from 'stadox'

test('init the immutable', () => {
  Stadox.init({foo: 'bar'})
  expect(Stadox.get('foo')).toBe('bar');
});



test('add callbacks', () => {
  Stadox.init({x: 0})
  expect(Stadox.get('x')).toBe(0);

  Stadox.on('add_number', (number, state) => {
    let x = state.get('x')
    return state.set('x', x + number);
  });

  Stadox.dispatch('add_number', 1);
  Stadox.dispatch('add_number', 1);
  expect(Stadox.get('x')).toBe(2);
});

test('add subscriptor', () => {
  Stadox.init({x: 0})
  Stadox.on('add_number', (number, state) => {
    let x = state.get('x')
    return state.set('x', x + number);
  });

  Stadox.subscribe(['x'], ({x}) => {
    console.log("Executed!")
    expect(x).toEqual(1)
  });
  Stadox.dispatch('add_number', 1);
});
