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
        <v-col cols="12">
          <v-textarea v-model="produto.descricao" label="Descrição" required :rows="3"></v-textarea>
        </v-col>
      </v-row>
    </v-container>
    <v-btn class="mb-5 ms-5" color="green" @click="cadastrarProduto">Cadastrar</v-btn>
    <v-btn class="mb-5 ms-5" color="red" to="/lista-produtos">Voltar</v-btn>
    <SnackbarVue v-model="snackbar.ativo" :color="snackbar.cor" :timeout="5000">{{ snackbar.mensagem }}</SnackbarVue>
  </div>
</template>

<script>
import NavbarVue from '@/components/Navbar.vue'
import SnackbarVue from '@/components/Snackbar.vue'
export default {
  components: {
    NavbarVue,
    SnackbarVue
  },
  data() {
    return {
      produto: {
        id: 0,
        nome: "",
        valor: 0,
        quantidade: 0,
        imagem: "",
        descricao: ""
      },
      snackbar: {
        ativo: false,
        mensagem: "",
        cor: "success"
      }
    }
  },
  methods: {
    async cadastrarProduto(){
      if(!this.produto.nome || !this.produto.valor || !this.produto.quantidade || !this.produto.imagem || !this.produto.descricao){
        this.snackbar.ativo = true
        this.snackbar.mensagem = 'Por favor, preencha todos os campos!'
        this.snackbar.cor = 'error'
      } else {
        try {
          await fetch('http://localhost:3000/produtos', {
            method: "POST",
            headers: {"Content-type": "application/json;charset=UTF-8"},
            body: JSON.stringify(this.produto)
          })
          this.snackbar.ativo = true
          this.snackbar.mensagem = 'Produto cadastrado com sucesso!'
          this.snackbar.cor = 'success'
          this.$emit('produtoCadastrado')
          this.produto = {
            id: 0,
            nome: "",
            valor: 0,
            quantidade: 0,
            imagem: "",
            descricao: ""
          }
          
          this.$router.push('/lista-produtos')
          this.$nextTick(() => {
            this.$parent.carregarProdutos()
          })
        } catch (error) {
          this.snackbar.ativo = true
          this.snackbar.mensagem = error.message
          this.snackbar.cor = 'error'
        }
      }
    }
  }
}
</script>
<style>
  
</style>
