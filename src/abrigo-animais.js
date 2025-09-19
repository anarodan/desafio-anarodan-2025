class AbrigoAnimais {

  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {

    const animais = {
      Rex: { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      Mimi: { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      Fofo: { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      Zero: { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      Bola: { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      Bebe: { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      Loco: { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    }

    function contemSubsequencia(listaBrinquedosPessoa, brinquedosAnimal, ignorarOrdem = false) {

        if (ignorarOrdem) {
          return brinquedosAnimal.every(b => listaBrinquedosPessoa.includes(b));
        }

        let i = 0;

        for (const brinquedo of listaBrinquedosPessoa) {
          if (brinquedo === brinquedosAnimal[i]) {
            i++;
            if (i === brinquedosAnimal.length) return true;
          }
        }

        return i === brinquedosAnimal.length;

    }

    // transformar strings em arrays
    const listaPessoa1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const listaPessoa2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const listaOrdem = ordemAnimais.split(',').map(a => a.trim());

    // validações de duplicados
    const temDuplicados = arr => new Set(arr).size !== arr.length;

    if (temDuplicados(listaPessoa1) || temDuplicados(listaPessoa2)) {
      return { erro: 'Brinquedo inválido', lista: false };
    }

    if (temDuplicados(listaOrdem)) {
      return { erro: 'Animal inválido', lista: false };
    }

    // validação de animais
    for (const nome of listaOrdem) {
      
      if (!animais[nome]) {
        return { erro: 'Animal inválido', lista: false };
      }
    }

    const resultado = [];
    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;

    for (const nome of listaOrdem) {
      const animal = animais[nome];
      let destino = 'abrigo';

      const podePessoa1 = contemSubsequencia(listaPessoa1, animal.brinquedos, animal.tipo === 'jabuti');
      const podePessoa2 = contemSubsequencia(listaPessoa2, animal.brinquedos, animal.tipo === 'jabuti');

      if (podePessoa1 && !podePessoa2 && adotadosPessoa1 < 3) {
        destino = 'pessoa 1';
        adotadosPessoa1++;
      } 
      else if (podePessoa2 && !podePessoa1 && adotadosPessoa2 < 3) {
        destino = 'pessoa 2';
        adotadosPessoa2++;
      } 
      else {
        destino = 'abrigo';
      }

      if (nome === 'Loco' && destino !== 'abrigo') {
        
        const totalAnimaisPessoa = destino === 'pessoa 1' ? adotadosPessoa1 : adotadosPessoa2;
        
        if (totalAnimaisPessoa === 1) {
          destino = 'abrigo';
          if (destino === 'pessoa 1') adotadosPessoa1--;
          if (destino === 'pessoa 2') adotadosPessoa2--;
        }
      }

      resultado.push(`${nome} - ${destino}`);
    }

    // ordenar por nome do animal
    resultado.sort((a, b) => {
      const nomeA = a.split(' - ')[0];
      const nomeB = b.split(' - ')[0];
      return nomeA.localeCompare(nomeB);
    });

    return { erro: false, lista: resultado };
    
  }

}

export { AbrigoAnimais as AbrigoAnimais };
