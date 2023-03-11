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
    </div>
  </template>
<script>
import NavbarVue from "@/components/Navbar.vue";
export default {
  components: { NavbarVue },
  data() {
    return {
      produto: {},
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
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
  