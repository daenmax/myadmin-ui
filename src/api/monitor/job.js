import request from '@/utils/request'

// 查询定时任务调度列表
export function listJob(query) {
  return request({
    url: '/monitor/job/list',
    method: 'get',
    params: query
  })
}

// 查询定时任务调度详细
export function getJob(jobId) {
  return request({
    url: '/monitor/job/' + jobId,
    method: 'get'
  })
}

// 新增定时任务调度
export function addJob(data) {
  return request({
    url: '/monitor/job',
    method: 'post',
    data: data
  })
}

// 修改定时任务调度
export function updateJob(data) {
  return request({
    url: '/monitor/job',
    method: 'put',
    data: data
  })
}

// 删除定时任务调度
export function delJob(ids) {
  return request({
    url: '/monitor/job',
    method: 'delete',
    data: ids
  })
}

// 任务状态修改
export function changeJobStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/monitor/job/changeStatus',
    method: 'put',
    data: data
  })
}


// 定时任务立即执行一次
export function runJob(id) {
  const data = {
    id
  }
  return request({
    url: '/monitor/job/run',
    method: 'post',
    data: data
  })
}