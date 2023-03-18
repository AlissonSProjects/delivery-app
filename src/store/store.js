import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    produtosCarrinho: [],
    quantidadeProdutosCarrinho: 0,
  },
  getters: {
    totalCarrinho(state) {
      return state.produtosCarrinho.reduce((total, produto) => total + produto.valor * produto.quantidade, 0)
    }
  },
  mutations: {
    adicionarProdutoCarrinho(state, produto) {
      // Verifica se o produto já existe no carrinho
      const produtoCarrinho = state.produtosCarrinho.find(p => p.id === produto.id);
  
      if (produtoCarrinho) {
        produtoCarrinho.quantidade++;
      } else {
        state.produtosCarrinho.push({ ...produto, quantidade: 1 });
      }
  
      // Incrementa a quantidade de produtos no carrinho
      state.quantidadeProdutosCarrinho++;
    },

    excluirProdutoCarrinho(state, id) {
      const produtoCarrinho = state.produtosCarrinho.find(p => p.id === id);

      if (produtoCarrinho) {
        if (produtoCarrinho.quantidade > 1) {
          produtoCarrinho.quantidade--;
        } else {
          state.produtosCarrinho = state.produtosCarrinho.filter(produto => produto.id !== id)
        }

        state.quantidadeProdutosCarrinho--;
      }
    },

    excluirTodosProdutosCarrinho(state) {
      state.produtosCarrinho = [];
      state.quantidadeProdutosCarrinho = 0;
    }
  },
  actions: {
    adicionarProdutoCarrinho({commit}, produto) {
      commit('adicionarProdutoCarrinho', produto);
    },

    excluirProdutoCarrinho({commit}, id) {
      commit('excluirProdutoCarrinho', id);
    },

    excluirTodosProdutosCarrinho({commit}) {
      commit('excluirTodosProdutosCarrinho');
    }
  }
})
