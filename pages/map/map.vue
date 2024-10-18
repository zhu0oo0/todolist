<template>
  <view style="padding: 15px;">
    <u--form labelPosition="left" :model="formData" ref="uForm">
      <u-form-item label="金额" prop="sum" borderBottom>
        <u--input v-model="formData.sum" border="none"></u--input>
      </u-form-item>
      <u-form-item label="类型" prop="type" borderBottom>
        <u-radio-group v-model="formData.type">
          <u-radio :customStyle="{marginRight: '8px'}" shape="circle" label="区间" :name="1"></u-radio>
          <u-radio shape="circle" label="单价" :name="2"></u-radio>
        </u-radio-group>
      </u-form-item>
      <template v-if="formData.type === 1">
        <u-form-item label="最多" prop="max" borderBottom>
          <u--input v-model="formData.max" border="none"></u--input>
        </u-form-item>
        <u-form-item label="最少" prop="min" borderBottom>
          <u--input v-model="formData.min" border="none"></u--input>
        </u-form-item>
      </template>
      <template v-if="formData.type === 2">
        <u-form-item label="单价" prop="price" borderBottom>
          <u--input v-model="formData.price" border="none"></u--input>
        </u-form-item>
      </template>
    </u--form>
    <view class="result-box" style="margin-top: 10px;">
      计算结果
      <view v-for="(item,index) in result" :key="index"
        style="font-size: 16px;padding-top: 10px; color: #aa0000; font-weight: bold;">
        
        <template v-if="formData.type === 1">
          <view class="flex_center-space-between">
            <text style="flex: 1;">数量：{{item.num}}</text>
            <text style="flex: 1;">单价：{{item.price}}</text>
          </view>
        </template>
        <template v-if="formData.type === 2">
        {{ item }}
        </template>
        
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        formData: {
          sum: 0,
          type: 1,
          min: 0,
          max: 0,
          price: 0
        }
      };
    },
    computed: {
      result() {
        const arr = []
        const {
          sum,
          type,
          min,
          max,
          price
        } = this.formData
        if (sum) {
          if (type === 1) {
            if (min) {
              let num = 1
              let priceV = max
              while (priceV > min) {
                priceV = parseFloat((sum / (num * 100)).toFixed(2))
                if (priceV <= max){
                  arr.push({
                    num: num*100,
                    price: priceV
                  })
                }
                num++
              }
            }
          } else {
            if (price) {
              arr.push(Math.floor(sum / price / 100) * 100)
            }
          }
        }
        return arr
      }
    }
  }
</script>

<style lang="scss">

</style>