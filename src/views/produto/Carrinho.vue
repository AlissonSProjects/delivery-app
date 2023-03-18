<template>
  <div>
    <NavbarVue />
    <v-card v-if="carrinho && carrinho.length !== 0">
      <v-card-text class="overflow-hidden">
        <h3>Carrinho de Compras</h3>

       <v-list two-line v-for="item in carrinho" :key="item.produto.id" class="mb-3" tile>
         <v-list-item-content>{{ item.produto.nome }}</v-list-item-content>
         <v-list-item-content>Quantidade: {{ item.quantidade }}</v-list-item-content>
         <v-list-item-content>Valor: R$ {{ item.produto.valor * item.quantidade}}</v-list-item-content>
       </v-list>
       

        <v-row>
          <v-col md="6" class="mt-4">
            <v-btn large color="warning" @click="esvaziarCarrinho">Esvaziar Carrinho</v-btn>
          </v-col>
          <v-col md="6" class="mt-4">
            <v-card flat class="text-right">
              <v-card-text class="font-weight-bold">Valor Total: R$ {{ calcularTotalCarrinho() }}</v-card-text>
              <v-card-actions>
                <v-btn large color="success" @click="efetuarCompra()">Efetuar compra</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

    <v-card v-else>
      <v-card-title>Não há produtos no carrinho.</v-card-title>
    </v-card>
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
      carrinho: []
    }
  },
  mounted() {
    this.carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  },
  methods: {
    esvaziarCarrinho() {
      localStorage.removeItem('carrinho');
      this.carrinho = [];
    },
    calcularTotalCarrinho() {
      let total = 0;
      for (let item of this.carrinho) {
        total += item.produto.valor * item.quantidade;
      }
      return total.toFixed(2);
    },
    efetuarCompra() {
      alert('Compra efetuada com sucesso!');
      this.esvaziarCarrinho();
    }
  }
}
</script>

<style scoped>
 
</style>
