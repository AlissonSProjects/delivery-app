<template>
  <div>
    <v-snackbar v-model="snackbar.ativo" :timeout="3000" top>
      {{snackbar.mensagem}}
      <v-btn color="white" text @click="snackbar.ativo = false">Fechar</v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  props: {
    snackbar: {
      type: Object,
      default: () => ({
        ativo: false,
        mensagem: "Cadastrado com sucesso!"
      })
    }
  }
}
</script>
<style>
  
</style>