<template>
  <div>
    <NavbarVue />
    <v-card class="mb-3">
      <v-card-title>Editar Produto</v-card-title>
      <v-container>
        <v-form @submit.prevent="editarProduto">
          <v-text-field v-model="produto.nome" label="Nome"></v-text-field>
          <v-text-field v-model="produto.descricao" label="Descrição"></v-text-field>
          <v-text-field v-model="produto.imagem" label="URL da imagem"></v-text-field>
          <v-text-field v-model="produto.valor" label="Valor"></v-text-field>
          <v-text-field v-model="produto.quantidade" label="Quantidade"></v-text-field>
          <v-btn color="primary" type="submit">Salvar</v-btn>
        </v-form>
      </v-container>
    </v-card>

    <SnackbarVue :mostrarSnackbar="produtoAtualizado" />

  </div>
</template>

<script>
import NavbarVue from "@/components/Navbar.vue";
import SnackbarVue from "@/components/Snackbar.vue";

export default {
  components: { NavbarVue, SnackbarVue },
  data() {
    return {
      produto: {},
      produtoAtualizado: false,
    };
  },
  mounted() {
    this.carregarProduto();
  },
  methods: {
    carregarProduto() {
      const id = this.$route.params.id;
      fetch(`http://localhost:3000/produtos/${id}`, {
        method: "GET",
        headers: { "Content-type": "application/json;charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((response) => {
          this.produto = response;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    editarProduto() {
      const id = this.$route.params.id;
      fetch(`http://localhost:3000/produtos/${id}`, {
        method: "PUT",
        body: JSON.stringify(this.produto),
        headers: { "Content-type": "application/json;charset=UTF-8" },
      })
        .then((response) => {
          this.produtoAtualizado = true;
          setTimeout(() => (this.produtoAtualizado = false), 3000);
          this.$router.push("/lista-produtos");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
