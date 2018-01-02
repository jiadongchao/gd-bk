<template>
    <div id="ap">
  <p>{{ count }}</p>
  <p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </p>
    </div>
</template>


<script>

// const store = new Vuex.Store({
//   state: {
//     count: 0
//   },
//   mutations: {
//   	increment: state => state.count++,
//     decrement: state => state.count--
//   }
// })

// new Vue({
//   el: '#ap',
//   computed: {
//     count () {
// 	    return store.state.count
//     }
//   },
//   methods: {
//     increment () {
//       store.commit('increment')
//     },
//     decrement () {
//     	store.commit('decrement')
//     }
//   }
// })
</script>


