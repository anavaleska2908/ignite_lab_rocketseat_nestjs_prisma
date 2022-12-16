import { Content } from "./content"

test('It should be able to create a notification content', () => {
  const content = new Content('Você recebeu uma solicitação de amizade!');

  expect(content).toBeTruthy();
})
