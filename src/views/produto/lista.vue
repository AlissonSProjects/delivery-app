<template>
  <div>
    <NavbarVue />
    
    <v-card v-for="produto in produtos" :key="produto.id" class="mb-3">
      <v-card-text class="overflow-hidden">        
        <img class="imagem-produto mb-3" :src="produto.imagem" :alt="produto.nome" />
        <v-card-title>{{ produto.nome }}</v-card-title>
        <!-- Exibe a descrição do produto -->
        <p>{{ produto.descricao }}</p>
        <v-list-item-two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Valor: {{ produto.valor }} | Quantidade: {{ produto.quantidade }}</v-list-item-subtitle>
          </v-list-item-content>
          
          <v-list-item-action class="align-self-end">
            <v-btn color="red" class="mb-5 pa-3 mt-4" small @click="excluirProduto(produto.id)">Excluir</v-btn>
          </v-list-item-action>
        </v-list-item-two-line>
      </v-card-text>
    </v-card>

    <v-btn class="mb-5 ms-4"  color="green" to="/novo-produto"><v-icon left>mdi-plus</v-icon>Novo</v-btn>
  </div>
</template>

<script>
import NavbarVue from '@/components/Navbar.vue';

export default {
  components: {
    NavbarVue
  },
  data() {
    return {
      produtos: []
    }
  },
  mounted() {
    this.carregarProdutos()
  },
  methods: {
    carregarProdutos() {
      fetch('http://localhost:3000/produtos', {
        method: "GET",
        headers: {"Content-type": "application/json;charset=UTF-8"},
      })
      .then(response => response.json())
      .then(response => {
        this.produtos = response
      }).catch(error => {
        console.log(error)
      })
    },
    
    excluirProduto(id) {
      fetch(`http://localhost:3000/produtos/${id}`, {
        method: "DELETE",
      })
      .then(() => {
        this.produtos = this.produtos.filter((produto) => produto.id !== id)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
/* Define o tamanho máximo da imagem */
.imagem-produto {
  max-width: 100px;
}

.overflow-hidden {
  overflow: hidden;
}

/* Aplica a fonte personalizada aos títulos dos produtos */
.v-card-title {
  font-family: 'Raleway', sans-serif;
}

.novo {
  color: #fff;
  background-color: #df7e08;
}

.v-list-item-two-line {
  padding-bottom: 16px;
}
</style>
