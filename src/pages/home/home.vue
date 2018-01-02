<template>
  <div class="home">
   <x-header :left-options="{showBack: false}"> {{ msg }}</x-header>
     <div class="tools flex">
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-calendar"></use>
          </svg>
        <div class="time flex">
         
          <group>
            <datetime v-model="value" @on-change="changeDate" :start-date="startDate" :end-date="endDate"></datetime>
          </group>
        </div>
         <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-anzhuangweizhi"></use>
          </svg>
        <div class="branch flex">
         
          <group>
          <popup-picker :data="list3" :columns="2" v-model="value4" :display-format='format' @on-change="changeAddr"></popup-picker>
          </group>
        </div>
      </div>
   
    <div>
        <ul class="ulData">
          <li v-for='(item,index) in quotaGroupData' :key='index' @click="showDetail(item.index)">
            <table border="0">
            
              <tr><th colspan="5">{{item.index}}{{item.unit}}</th></tr>
              <tr><td>{{item.table_titles[4].name}}</td><td>{{item.table_titles[0].name}}</td><td>{{item.table_titles[1].name}}</td><td>{{item.table_titles[2].name}}</td><td>{{item.table_titles[3].name}}</td></tr>
              <tr><td>{{item.list_datas.DAY_BAL}}</td><td>{{item.list_datas.COMP_LAST_DAY_BAL}}</td><td>{{item.list_datas.COMP_LAST_MON_BAL}}</td><td>{{item.list_datas.COMP_LAST_YEAR_BAL}}</td><td>{{item.list_datas.COMP_YEAR_AMP_BAL}}</td></tr>
            </table>
          </li>
        </ul>
    </div>
   
  </div>
</template>

<script>
import { Datetime, Group, Selector, PopupPicker, XHeader } from "vux";

export default {
  components: {
    Datetime,
    Group,
    Selector,
    XHeader,
    PopupPicker
  },
  data() {
    return {
      msg: "首页",
      //calendar
      startDate: "2000-01-01",
      endDate: "",
      value: "", //   ajax
      //index data
      indexUrl: "../../static/index.json",
      quotaGroupData: [],
      // bank data
      bankUrl: "../../static/bank.json",
      //
      // endDate: value,
      value4: ["2000", "2000"], //   ajax
      list3: [],
      format: function(value, name) {
        var arr = name.split(" ");
        return `${arr[1]}`;
      },
      loginUrl:
        "https://mmc.test.cebbank.com/mbi/appinter/loginAction_login.action"
    };
  },
  created() {
    this.showToday();
  },
  mounted() {
    this.getData();
    this.getBank();
    this.$router.push("/");
    this.LoginData();
  },

  methods: {
    showDetail(data) {
      console.log(data);
      //路由跳转
      this.$router.push({ name: "Detail", query: { id: data.belongGroup } });
    },
    gocc() {
      this.$router.push({ path: "/detail" });
    },

    showToday(value) {
      let now = new Date();
      let cmonth = now.getMonth() + 1;
      let day = now.getDate();
      if (cmonth < 10) cmonth = "0" + cmonth;
      if (day < 10) day = "0" + day;
      this.value = now.getFullYear() + "-" + cmonth + "-" + day;
      this.endDate = now.getFullYear() + "-" + cmonth + "-" + day;
      // console.log("set today ok");
    },
    getData: function() {
      this.$http.get(this.indexUrl).then(
        response => {
          // 响应成功回调
          //console.log(response.data.data[0].quota_group_data);
          this.quotaGroupData = response.data.data[0].quota_group_data;
          // console.log(this.quotaGroupData);
        },
        error => {
          console.log("数据失败");
        }
      );
    },

    //-------------------------------login
    LoginData: function() {
      this.$http
        .get(this.loginUrl, {
          params: {
            login_name: "3y8EDlA2sc4=",
            password: "0jt%2BRxQkpAJBXGfU1PdEM3MiNghLscHmH0U7i%2Ff2mec=",
            prikey: "mobile@cebbank123;"
          }
        })
        .then(
          response => {
            console.log(response);
          },
          error => {
            console.log("数据失败");
          }
        );
    },
    getBank: function() {
      this.$http.get(this.bankUrl).then(
        response => {
          // 响应成功回调
          
          let obj_zx = {  //自定义添加的 “中国光大银行(全辖)”的父级
              name: '中国光大银行(全辖)',
              value: "100",
              parent: 0
            };
          this.list3.push(obj_zx);
          let obj_child_zx = {  //自定义添加的 “中国光大银行(全辖)”的子级
              name: '中国光大银行(全辖)',
              value: '1000',
              parent: "100"
            };
          this.list3.push(obj_child_zx);

          let mTreelist = response.data.data.Mechanism_tree;
          //循环总行
          for (let i = 0; i < mTreelist.length; i++) {
            let obj = {
              name: mTreelist[i].parent_branch_name,
              value: mTreelist[i].parent_branch_id,
              parent: 0
            };
            this.list3.push(obj); //push 父项目

            let obj1 = {
              name: mTreelist[i].parent_branch_name,
              value: mTreelist[i].parent_branch_id + " ",
              parent: mTreelist[i].parent_branch_id
            };
            this.list3.push(obj1); //push 子中父

            for (let j = 0; j < mTreelist[i].Blanch.length; j++) {
              let obj2 = {
                name: mTreelist[i].Blanch[j].blanch_name,
                value: mTreelist[i].Blanch[j].blanch_id,
                parent: mTreelist[i].parent_branch_id
              };
              this.list3.push(obj2); //push 子项目
            }
          }
          console.log(this.list3);
        },
        error => {
          console.log("error");
        }
      );
    },
    changeDate(value) {
      console.log("选择的日期和地址是", this.value, this.value4);
    },
    changeAddr(value) {
      console.log("选择的日期和地址是", this.value, value);
    }
  }
};
</script>

 <style scoped>
@import url("home.css");
</style>



