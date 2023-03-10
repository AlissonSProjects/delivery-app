import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
    }
  ]
})

export default router
