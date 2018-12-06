import request from '@/utils/request';

export async function mydemoInfo(params) {
  return request('/api/getList', {
    method: 'POST',
    body: params,
  });
}
export async function availableOrgs() {
  return request('/api/available_orgs');
}
