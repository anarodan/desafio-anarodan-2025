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

    //Função auxiliar para verificar se os brinquedos exigidos pelo animal estão presentes na lista da pessoa na ordem correta 
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

    //Transforma as strings de entrada em arrays para trabalhar mais fácil
    const listaPessoa1 = brinquedosPessoa1.split(',').map(b => b.trim());
    const listaPessoa2 = brinquedosPessoa2.split(',').map(b => b.trim());
    const listaOrdem = ordemAnimais.split(',').map(a => a.trim());

    //Função auxiliar criada para detectar duplicados
    const temDuplicados = arr => new Set(arr).size !== arr.length;

    //Validação do: não pode ter brinquedos duplicados
    if (temDuplicados(listaPessoa1) || temDuplicados(listaPessoa2)) {
      return { erro: 'Brinquedo inválido', lista: false };
    }

    //Validação do: não pode ter animais duplicados
    if (temDuplicados(listaOrdem)) {
      return { erro: 'Animal inválido', lista: false };
    }

    //Validação do: todos os animais informados precisam existir no catálogo
    for (const nome of listaOrdem) {
      
      if (!animais[nome]) {
        return { erro: 'Animal inválido', lista: false };
      }
    }

    //Uma lista final de adoções
    const resultado = [];

    //Contadores de quantos animais cada pessoa já adotouque no maximo são 3 animais
    let adotadosPessoa1 = 0;
    let adotadosPessoa2 = 0;

    //Um for que percorre os animais na ordem informada e por padrão eles vão para o abrigo
    for (const nome of listaOrdem) {
      const animal = animais[nome];
      let destino = 'abrigo';

      //Verifica se cada pessoa tem os brinquedos necessarios
      const podePessoa1 = contemSubsequencia(listaPessoa1, animal.brinquedos, animal.tipo === 'jabuti');
      const podePessoa2 = contemSubsequencia(listaPessoa2, animal.brinquedos, animal.tipo === 'jabuti');

      //Se apenas a pessoa 1 puder adotar e ela ainda não tiver 3 vai ficar com ela
      if (podePessoa1 && !podePessoa2 && adotadosPessoa1 < 3) {
        destino = 'pessoa 1';
        adotadosPessoa1++;
      } 
      //Se apenas a pessoa 2 puder adotar e ela ainda não tiver 3 vai ficar com ela
      else if (podePessoa2 && !podePessoa1 && adotadosPessoa2 < 3) {
        destino = 'pessoa 2';
        adotadosPessoa2++;
      } 
      //Caso contrário o animal vai para o abrigo
      else {
        destino = 'abrigo';
      }

      //Regra especial do Loco (jabuti) que ele só vai poder ser adotado se não for sozinho
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

    //Ordena alfabeticamente pelo nome do animal
    resultado.sort((a, b) => {
      const nomeA = a.split(' - ')[0];
      const nomeB = b.split(' - ')[0];
      return nomeA.localeCompare(nomeB);
    });

    return { erro: false, lista: resultado };
    
  }

}

export { AbrigoAnimais as AbrigoAnimais };
