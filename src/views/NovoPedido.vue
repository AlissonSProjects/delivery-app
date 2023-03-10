<template>
  <div>
    <NavbarVue />
    <h1 class="ms-5">Criar novo pedido</h1>
    <v-form @submit.prevent="dialog = true">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field v-model="pedido.cliente.nome" label="Nome do cliente" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="pedido.cliente.telefone" type="number" label="Telefone do cliente" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="pedido.cliente.endereco.logradouro" label="Logradouro" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="pedido.cliente.endereco.numero" type="number" label="Número" @input="onlyNumbers" required />
          </v-col>
          <v-col cols="12" md="6">
            <v-text-field v-model="pedido.cliente.endereco.bairro" label="Bairro" required />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="pedido.cliente.endereco.complemento" label="Complemento" />
          </v-col>
          <v-col cols="12">
            <v-text-field v-model="pedido.cliente.endereco.referencia" label="Referência" />
          </v-col>
          <v-col cols="12">
            <v-select :items="formaPagamentoList" item-title="titulo" item-value="value" v-model="pedido.formaPagamento" label="Forma pagamento" />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <v-card-title>Confirmação</v-card-title>
        <v-card-text>Tem certeza que deseja criar o pedido?</v-card-text>
        <v-card-actions>
          <v-btn color="green" @click="criarPedido">Sim</v-btn>
          <v-btn color="red" text @click="dialog = false">Não</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-btn color="green" class="mb-5 ms-5" @click="dialog = true">Criar</v-btn>
    <snackbar :snackbar="snackbar" />
  </div>
</template>

<script>
import NavbarVue from '../components/Navbar.vue'
import Snackbar from '../components/Snackbar.vue'
export default {
  components: {
    NavbarVue,
    Snackbar
  },
  data(){
    return {
      formaPagamentoList: [
        {
          titulo: "Cartão",
          value: "cartao"
        },
        {
          titulo: "Pix",
          value: "pix"
        },
        {
          titulo: "Dinheiro",
          value: "dinheiro"
        }
      ],
      pedido: {
        cliente: {
          nome: "",
          telefone: "",
          endereco: {
            logradouro: "",
            numero: "",
            bairro: "",
            complemento: "",
            referencia: ""
          }
        },
        listaProdutos: [],
        valorTotal: 0,
        formaPagamento: "pix"
      },
      dialog: false,
      snackbar: {
        ativo: false,
        mensagem: "Pedido cadastrado com sucesso!"
      }
    }
  },
  methods: {
    onlyNumbers(event) {
      // permite apenas números no campo de número do endereço
      const { value } = event.target;
      event.target.value = value.replace(/\D/g, '');
    },
    criarPedido(){
      if(!this.pedido.cliente.nome ||
      !this.pedido.cliente.endereco.logradouro || 
      !this.pedido.cliente.endereco.numero || 
      !this.pedido.cliente.endereco.referencia || 
      !this.pedido.cliente.endereco.bairro || 
      !this.pedido.formaPagamento || 
      !this.pedido.cliente.telefone){
        this.snackbar.ativo = true
        this.dialog = false
        this.snackbar.mensagem = 'Por favor, preencha todos os campos!'
      }else{
        // lógica para cadastrar o produto
        this.dialog = false
        this.snackbar.ativo = true
        this.snackbar.mensagem = 'Pedido cadastrado com sucesso!'
      }
    }
  }
}
</script>

<style>
h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
  
</style>