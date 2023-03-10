<template>
  <div>
    <NavbarVue />
    <h1 class="ms-5">Criar novo produto</h1>
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field v-model="produto.nome" label="Nome do produto" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="produto.valor" type="number" label="Valor do produto" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="produto.quantidade" type="number" label="Quantidade" required />
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field v-model="produto.imagem" type="text" label="Imagem" required />
        </v-col>
      </v-row>
    </v-container>
    <v-btn class="mb-5 ms-5" color="green" @click="cadastrarProduto">Cadastrar</v-btn>
    <v-btn class="mb-5 ms-5" color="red" to="/lista-produtos" @click="cadastrarProduto">Voltar</v-btn>
    <snackbar :snackbar="snackbar" />
  </div>
</template>
<script>
import NavbarVue from '@/components/Navbar.vue'
import Snackbar from '@/components/Snackbar.vue'
export default {
  components: {
    NavbarVue,
    Snackbar
  },
  data(){
    return {
      produto: {
        id: 0,
        nome: "",
        valor: 0,
        quantidade: 0,
        imagem: ""
      },
      snackbar: {
        ativo: false,
        mensagem: "Pedido cadastrado com sucesso!"
      }
    }
  },
  methods: {
  async cadastrarProduto(){
    if(!this.produto.nome || !this.produto.valor || !this.produto.quantidade || !this.produto.imagem){
      this.snackbar.ativo = true
      this.snackbar.mensagem = 'Por favor, preencha todos os campos!'
    } else {
      try {
        await fetch('http://localhost:3000/produtos', {
          method: "POST",
          headers: {"Content-type": "application/json;charset=UTF-8"},
          body: JSON.stringify(this.produto)
        })
        this.snackbar.ativo = true
        this.snackbar.mensagem = 'Produto cadastrado com sucesso!'
        this.$emit('produtoCadastrado')
        this.produto = {
          id: 0,
          nome: "",
          valor: 0,
          quantidade: 0,
          imagem: ""
        }
        // Atualizar a lista de produtos
        this.$router.push('/lista-produtos')
        this.$nextTick(() => {
          this.$parent.carregarProdutos()
        })
      } catch (error) {
        this.snackbar.ativo = true
        this.snackbar.mensagem = error.message
      }
    }
  }
}
}
</script>
<style>
  
</style>