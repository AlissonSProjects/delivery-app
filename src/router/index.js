import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Carrinho from '../views/produto/Carrinho.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/novo-pedido',
      name: 'novoPedido',
      component: () => import('../views/NovoPedido.vue')
    },
    {
      path: '/lista-produtos',
      name: 'listaProdutos',
      component: () => import('../views/produto/lista.vue')
    },
    {
      path: '/novo-produto',
      name: 'novoProduto',
      component: () => import('../views/produto/novo.vue')
    },
    {
      path: '/editar-produto/:id',
      name: 'EditarProduto',
      component: () => import('../views/produto/EditarProduto.vue')
    },

    {
      path: '/carrinho',
      name: 'Carrinho',
      component: () => import('../views/produto/Carrinho.vue')
    },

  ]
})

export default router
