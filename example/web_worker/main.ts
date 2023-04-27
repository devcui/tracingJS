const user = this.cacheSrv.get("_yz_user", { mode: "none" });
const token = this.tokenSrv.get();
try {
  TracingJS.trace(window, {
    // 采集器策略
    collectorStrategy: WorkerCollector.create("./worker.js", {
      user: {
        deptId: user.deptId,
        deptName: user.deptName,
        id: user.id,
        realname: user.realname,
        userCode: user.userCode,
        username: user.username,
      },
      token: token,
    }),
    // 采集点击事件策略
    collectingClicksStrategy: AdapterCollectingClicks.create(),
  });
} catch (e) {
  console.error(e);
}
