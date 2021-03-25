<template>
  <div>
    <geophysical-prospecting :TableConfig='TableConfig' :list='geophysicalProspecting'></geophysical-prospecting>
  </div>
</template>

<script>
  import geophysicalProspecting from './geophysicalTable.vue'
  import { TableConfig } from '@/data/geophysicalProspecting'

  export default {
    components: {geophysicalProspecting},
    data() {
      return {
        id: 'geophysicalProspecting',
        TableConfig,
        geophysicalProspecting: [{
          acceptanceNo: '2014-S-081',
          inspectionReportNo: '2014-A-081',
          sampleName: '生活饮用水(出厂水)',
          samplingLocation: '顾桥矿水厂',
          samplingTime: '2014.9.3',
          testTest: '2014.9.3',
          inspectionBasis: '出厂水',
          executiveStandard: '出厂水',
          inspectionItems:'顾桥',
          testResults:'ds',
          InspectionOrganization:'lokk',
          remarks:'kkkkkkk'
        }, {
          acceptanceNo: '2014-S-082',
          inspectionReportNo: '2014-A-082',
          sampleName: '生活饮用水(未梢水)',
          samplingLocation: '顾桥矿水厂',
          samplingTime: '2014.9.3',
          testTest: '2014.9.3',
          inspectionBasis: '出厂水',
          executiveStandard: '出厂水',
          inspectionItems:'顾桥',
          testResults:'ds',
          InspectionOrganization:'lokk',
          remarks:'kkkkkkk'
        }, {
          acceptanceNo: '2014-S-083',
          inspectionReportNo: '2014-A-083',
          sampleName: '生活饮用水(未梢水)',
          samplingLocation: '顾桥矿水厂',
          samplingTime: '2014.9.3',
          testTest: '2014.9.3',
          inspectionBasis: '出厂水',
          executiveStandard: '出厂水',
          inspectionItems:'顾桥',
          testResults:'ds',
          InspectionOrganization:'lokk',
          remarks:'kkkkkkk'
        }, {
          acceptanceNo: '2014-S-084',
          inspectionReportNo: '2014-A-084',
          sampleName: '生活饮用水(未梢水)',
          samplingLocation: '顾桥矿水厂',
          samplingTime: '2014.9.3',
          testTest: '2014.9.3',
          inspectionBasis: '出厂水',
          executiveStandard: '出厂水',
          inspectionItems:'顾桥',
          testResults:'ds',
          InspectionOrganization:'lokk',
          remarks:'kkkkkkk'
        }]
      }
    },
    created() {
      // console.log(this.TableConfig);
    },
    methods: {

    }
  }
</script>

<style>
</style>
