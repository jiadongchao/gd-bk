<template>
  <div class="detail-data">
       <x-header> {{ msg }}</x-header>
   
    <div class="CoCore">      
            <table border="0">
              <thead>
                <tr><th colspan="6">{{indexTitle}}</th></tr>
                <tr v-if="show">
                    <td>{{ detailListTitles[5].name}}</td>
                    <td>{{ detailListTitles[4].name}}</td>
                    <td>{{ detailListTitles[0].name}}</td>
                    <td>{{ detailListTitles[1].name}}</td>
                    <td>{{ detailListTitles[2].name}}</td>
                    <td>{{ detailListTitles[3].name}}</td>
                   
                </tr>
              </thead>
                
            <tbody>
              <tr v-for='(item,index) in detailListDatas' :key='index'>
                    <td>{{item.ORG_NAME}}</td>
                    <td>{{item.DAY_BAL}}</td>
                    <td>{{item.COMP_LAST_DAY_BAL}}</td>
                    <td>{{item.COMP_LAST_MON_BAL}}</td>
                    <td>{{item.COMP_LAST_YEAR_BAL}}</td>
                    <td>{{item.COMP_YEAR_AMP_BAL}}</td>
                </tr>
            </tbody>
             
            </table>
    </div>
  </div>
</template>


<script>
import { Group, Cell, XHeader } from "vux";

export default {
  components: {
    Group,
    Cell,
    XHeader
  },
  data() {
    return {
      msg: "指标机构分解",
      CorporateCoreUrl: "../../static/DetailMessage.json",
      detailListDatas: [],
      detailListTitles: [],
      indexTitle: "",
      show:false
    };
  },
  mounted() {
    this.getDetailData();
  },
  methods: {
    getDetailData: function() {
      this.$http.get(this.CorporateCoreUrl).then(
        response => {
          // 响应成功回调
          //  console.log(response.data.data.list_datas);
          this.detailListDatas = response.data.data.list_datas;
          this.detailListTitles = response.data.data.table_titles;
          this.indexTitle = response.data.data.index;
          this.show = true;
          // console.log(this.quotaGroupData);
        },
        error => {
          console.log("数据失败");
        }
      );
    }
  }
};
</script>

<style>
@import url("./detail.css");
</style>
