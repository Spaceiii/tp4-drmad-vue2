import Vue from 'vue'
import VueRouter from 'vue-router'
import ShopView from "@/views/ShopView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: ShopView
  },
  {
    path: '/shop',
    name: 'shop',
    component: ShopView,
    alias: '/shop/home',
    children: [
      {
        path: 'login',
        name: 'login',
        components : {
          shopmain: () => import('@/views/ShopLogin.vue')
        }
      },
      {
        path: 'buy',
        name: 'buy',
        components: {
          shopmain: ()=> import('@/views/ShopBuy.vue')
        }
      },
      {
        path: 'pay/:orderId',
        name: 'pay',
        components: {
          shopmain:() => import('@/views/ShopPay.vue')
        },
        props: route => ({ orderId: route.params.orderId })
      },
      {
        path: 'orders',
        name: 'orders',
        components: {
          shopmain: () => import('@/views/ShopOrders.vue')
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
