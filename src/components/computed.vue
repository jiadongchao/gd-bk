<template>
    <div id="com">
        <p>{{ message }}</p>
        <p>{{ reversedMessage }}</p>
        <p>{{ date }}</p>
        <p>{{ now}}</p>
        <p>{{numbers}}</p>
        <p>{{evenNumbers}}</p>
        <span v-for="n in 10" :key='n'>{{n}}</span>
        <button @click="count += 1">增加1</button>
        <p>{{count}}</p>

    </div>
</template>


<script>
export default {
  name: "com",
  data() {
    return {
      message: "Hello",
      date: "",
      numbers:[3,9,10,89],
      count:0
    
    };
  },
  computed: {
    // 计算属性的 getter
    reversedMessage: function() {
      // `this` 指向 vm 实例
      return this.message
        .split("")
        .reverse()
        .join("");
    },
    now:function(){
        return Date.now()
    },
    evenNumbers: function () {
    return this.numbers.filter(function (number) {
      return number % 2 === 0
    })
  }
  },
  mounted(){
this.showToday()
  },
  methods: {
    showToday(value) {
      let now = new Date();
      let cmonth = now.getMonth() + 1;
      let day = now.getDate();
      if (cmonth < 10) cmonth = "0" + cmonth;
      if (day < 10) day = "0" + day;
      this.date = now.getFullYear() + "-" + cmonth + "-" + day;
     // this.endDate = now.getFullYear() + "-" + cmonth + "-" + day;
      console.log("set today ok");
    },
    bignum(value){
      return value > 10
    }
  }
};
</script>


