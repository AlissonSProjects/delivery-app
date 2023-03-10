<template>
  <div>
    <NavbarVue />
    
    <v-card v-for="produto in produtos" :key="produto.id" class="mb-3">
      <v-card-title>{{ produto.nome }}</v-card-title>
      <v-list-item-two-line>
        <v-list-item-content>
          <v-list-item-subtitle>Valor: {{ produto.valor }} | Quantidade: {{ produto.quantidade }}</v-list-item-subtitle>
        </v-list-item-content>
        
        <v-list-item-action>
          <v-btn color="red" small @click="excluirProduto(produto.id)">Excluir</v-btn>
        </v-list-item-action>
      </v-list-item-two-line>
      
      <v-card-text>
        <img :src="produto.imagem" :alt="produto.nome" />
      </v-card-text>
    </v-card>

    <v-btn class="mb-5 ms-5" color="green" to="/novo-produto"> + novo</v-btn>
  </div>
</template>

<script>
import NavbarVue from '@/components/Navbar.vue'

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
  },
}
</script>
