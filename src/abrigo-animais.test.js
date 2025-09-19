import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve rejeitar brinquedo duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,BOLA', 'LASER,NOVELO', 'Rex');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve rejeitar animal duplicado', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'LASER,NOVELO', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Gato não pode ir para duas pessoas (vai para abrigo)', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER', 'BOLA,LASER', 'Mimi');
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
  });

  test('Pessoa não pode levar mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER,NOVELO,CAIXA,SKATE', 'LASER', 'Rex,Zero,Bebe,Bola,Mimi');
    // Os três primeiros podem ir para pessoa 1, o restante vai para abrigo
    expect(resultado.lista.filter(l => l.includes('pessoa 1')).length).toBe(3);
  });

  test('Loco só pode ser adotado se não for sozinho', () => {
    const resultadoSozinho = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 'CAIXA', 'Loco');
    expect(resultadoSozinho.lista[0]).toBe('Loco - abrigo');

    const resultadoComOutro = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,SKATE', 'LASER', 'Rex,Loco');
    expect(resultadoComOutro.lista).toContain('Loco - pessoa 1');
  });
  
});
