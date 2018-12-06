const getList = [
  {
    name: '东城区',
    useBldOrgName: '北京恒和中西医结合医院有限公司',
    hxb: '0',
    xj: '8',
    xxbdc: '0',
  },
  {
    name: '东城区',
    useBldOrgName: '中国医学科学院北京协和医院',
    hxb: '2492',
    xj: '1824',
    xxbdc: '331',
  },
  { name: '东城区', useBldOrgName: '北京医院', hxb: '42', xj: '8', xxbdc: '0' },
  { name: '东城区', useBldOrgName: '北京中医药大学东直门医院', hxb: '188', xj: '78', xxbdc: '25' },
  {
    name: '东城区',
    useBldOrgName: '首都医科大学附属北京同仁医院',
    hxb: '278',
    xj: '184',
    xxbdc: '16',
  },
  { name: '东城区', useBldOrgName: '首都医科大学附属北京妇产医院', hxb: '0', xj: '8', xxbdc: '0' },
  { name: '东城区', useBldOrgName: '首都医科大学附属北京口腔医院', hxb: '0', xj: '8', xxbdc: '0' },
  { name: '东城区', useBldOrgName: '北京市第六医院', hxb: '0', xj: '8', xxbdc: '0' },
];

const available_orgs = [];

export default {
  'POST /api/getList': getList,
  'GET /api/available_orgs': available_orgs,
};
