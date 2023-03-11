<template>
  <div>
    <NavbarVue />

    <v-card v-for="produto in produtos" :key="produto.id" class="mb-3">
      <v-card-text class="overflow-hidden">
        <h3>{{ produto.nome }}</h3>
        <img class="imagem-produto mb-5 mt-5" :src="produto.imagem" :alt="produto.nome" />
        <p class="descricao">{{ produto.descricao }}</p>
        <v-list-item-two-line>
          <v-list-item-content>
            <v-list-item-subtitle>Valor: R$ {{ produto.valor }} | Quantidade: {{ produto.quantidade }}</v-list-item-subtitle>

          </v-list-item-content>

          <v-list-item-action class="align-self-end">
            <v-btn color="red" class="mb-5 pa-3 mt-4" small @click="excluirProduto(produto.id)">Excluir</v-btn>
            <v-btn color="orange" class="mb-5 pa-3 mt-4 ms-2 editar-produto" small @click="editarProduto(produto.id)"><v-icon left>mdi-pencil</v-icon>Editar</v-btn>
          </v-list-item-action>
        </v-list-item-two-line>
      </v-card-text>
    </v-card>

    <v-btn class="mb-5 ms-4" color="green" to="/novo-produto"><v-icon left>mdi-plus</v-icon>Novo</v-btn>
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
    },

    editarProduto(id) {
      this.$router.push(`/editar-produto/${id}`)
    }
  }
}
</script>

<style scoped>

.imagem-produto {
  max-width: 100px;

}

.overflow-hidden {
  font-size: 20px;
  overflow: hidden;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.v-card-title {
  font-size: 36pt;
  
  
}

.novo {
  color: #fff;
  background-color: #56eb0b;
}

.v-list-item-two-line {
  padding-bottom: 16px;
  
}

.descricao {
  font-size: 14pt;
  margin-bottom: 10px;
}
</style>
