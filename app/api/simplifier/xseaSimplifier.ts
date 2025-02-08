import http from "./http";
import dayjs from "dayjs";

class XSeaContextStack {
  private readonly stack = [
    [
      { key: "envId", id: "", name: "", symbol: "环境" },
      { key: "productId", id: "", name: "", symbol: "产品" },
      { key: "scriptId", id: "", name: "", symbol: "脚本" },
      { key: "planId", id: "", name: "", symbol: "计划" },
      { key: "goalId", id: "", name: "", symbol: "目标" },
      { key: "testRecordId", id: "", name: "", symbol: "压测记录" },
      { key: "testReportId", id: "", name: "", symbol: "压测报告" },
    ],
  ];

  private clonePush(offset = 0) {
    this.stack.push(
      JSON.parse(JSON.stringify(this.stack[this.stack.length - 1 - offset])),
    );
  }

  private setTop(key: string, id: string, name: string) {
    const target = this.stack[this.stack.length - 1].find(
      (item) => item.key === key,
    );
    if (target) {
      target.id = id;
      target.name = name;
    }
  }

  private cleanTop(key: string) {
    this.setTop(key, "", "");
  }

  public envId(id: string, name: string) {
    this.setTop("envId", id, name);
  }

  public productId(id: string, name: string) {
    this.setTop("productId", id, name);
    this.cleanTop("scriptId");
    this.cleanTop("planId");
    this.cleanTop("goalId");
    this.cleanTop("testRecordId");
    this.cleanTop("testReportId");
  }

  public scriptId(id: string, name: string) {
    this.setTop("scriptId", id, name);
  }

  public planId(id: string, name: string) {
    this.setTop("planId", id, name);
    this.cleanTop("goalId");
    this.cleanTop("testRecordId");
    this.cleanTop("testReportId");
  }

  public goalId(id: string, name: string) {
    this.setTop("goalId", id, name);
    this.cleanTop("testRecordId");
  }

  public testRecordId(id: string, name: string) {
    this.setTop("testRecordId", id, name);
  }

  public testReportId(id: string, name: string) {
    this.setTop("testReportId", id, name);
  }
}

interface XSeaContext {
  envId: string;
  productId: string;
  scriptId: string;
  planId: string;
  goalId: string;
  testRecordId: string;
  testReportId: string;
}

export default class XSeaSimplifier {
  public constructor(private readonly envId: string = "822313712173449216") {}

  public async ProductPaging(pageNum = 1, pageSize = 10, search = "") {
    const res = await http.post(`xsea/workspace/list`, {
      pageNum,
      pageSize,
      condition: { name: search },
    });
    const data = res.data.object ?? {};
    return {
      total: data.total,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      list: (data.list ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        url: `/${this.envId}/product/business/${item.id}/overview?tab=0`,
      })),
    };
  }

  public async ProductCreate(name: string, remark?: string) {
    const res = await http.post(`paas/products`, {
      productName: name,
      productDesc: remark,
    });
    const data = res.data.object ?? {};
    return {
      id: data.id,
      name: data.productName,
      url: `/${this.envId}/product/business/${data.id}/overview?tab=0`,
    };
  }

  public async PlanPaging(
    productId: string,
    pageNum = 1,
    pageSize = 10,
    search = "",
  ) {
    const res = await http.post(`xsea/plan/v2/planList`, {
      workspaceId: productId,
      pageNum,
      pageSize,
      condition: { name: search },
    });
    const data = res.data.object ?? {};
    return {
      total: data.total,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      list: (data.list ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        url: `/${this.envId}/product/business/${productId}/plan/detail?id=${item.id}`,
      })),
    };
  }

  public async PlanCreate(productId: string, name: string, purpose: string) {
    const res = await http.post(`xsea/plan/v2/addPlan`, {
      workspaceId: productId,
      name,
      planPurpose: purpose,
      planRange: {
        start: dayjs().format("YYYY-MM-DD"),
        end: dayjs().add(1, "weeks").format("YYYY-MM-DD"),
      },
      version: "1.0",
    });
    const data = res.data.object;
    return {
      id: data,
      name,
      url: `/${this.envId}/product/business/${productId}/plan/detail?id=${data}`,
    };
  }

  public async ScriptPaging(
    productId: string,
    pageNum = 1,
    pageSize = 10,
    search = "",
  ) {
    const res = await http.post(`xsea/script/tree/listScriptDirectory`, {
      workspaceId: productId,
      name: search,
    });
    const list = res.data.object ?? [];
    const allScripts = list.filter((item: any) => item.type !== "FOLDER");
    const scriptsMeta = allScripts.map((item: any) => ({
      id: item.id,
      name: item.name,
      url: `/${this.envId}/product/business/${productId}/script?scriptId=${item.id}`,
    }));
    return scriptsMeta;
  }

  public async ScriptCreate(productId: string, name: string, type = "JMETER") {
    const res = await http.post(`xsea/script/add`, {
      workspaceId: productId,
      name,
      type,
      scriptTypeVO: type,
      createType: type,
      parentId: "-1",
      level: 1,
    });
    const data = res.data.object;
    return {
      id: data,
      name,
      url: `/${this.envId}/product/business/${productId}/script?scriptId=${data}`,
    };
  }

  public async GoalPaging(
    planId: string,
    pageNum = 1,
    pageSize = 10,
    search = "",
  ) {
    const res = await http.post(`xsea/plan/goal/list`, {
      planId,
      pageNum,
      pageSize,
      condition: { name: search },
    });
    const data = res.data.object ?? {};
    return {
      total: data.total,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      list: (data.list ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        url: `/${this.envId}/product/business/${item.workspaceId}/plan/target?id=${planId}&goalId=${item.id}`,
      })),
    };
  }

  public async GoalCreate(
    planId: string,
    name: string,
    type: string,
    sceneScriptIds: string[],
  ) {
    const res = await http.post(`xsea/plan/goal/save`, {
      planId,
      name,
      type,
      sceneScriptIds,
      syncLoops: false,
      syncModelConf: false,
      syncRps: false,
      syncScriptConf: true,
      syncThinkTime: false,
      syncTransactionPercent: false,
    });
    const data = res.data.object;
    return {
      id: data,
      name,
      url: `/${
        this.envId
      }/product/business/${""}/plan/target?id=${planId}&goalId=${data}`,
    };
  }

  public async GoalExecute(envId: string, planId: string, goalId: string) {
    let res = await http.post(`xsea/plan/goal/list`, {
      planId,
      pageNum: 1,
      pageSize: 1e6,
      condition: { name: "" },
    });
    const targetGoal =
      res.data.object?.list?.find((item: any) => item.id === goalId) ?? {};
    res = await http.post(`xsea/sceneExec/start`, {
      envId,
      planId,
      goalId,
      id: targetGoal.sceneId,
      workspaceId: targetGoal.workspaceId,
      flag: true,
    });
    const data = res.data.object;
    return {
      id: data,
      url: `/${
        this.envId
      }/product/business/${""}/plan/targetExecute?sceneExecId=${data}`,
    };
  }

  public async TestRecordPaging(
    productId: string,
    planId: string,
    goalId?: string,
    pageNum = 1,
    pageSize = 10,
    search = "",
  ) {
    const res = await http.post(`xsea/report/list`, {
      workspaceId: productId,
      planId,
      goalId,
      pageNum,
      pageSize,
      name: search,
    });
    const data = res.data.object ?? {};
    return {
      total: data.total,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      list: (data.list ?? []).map((item: any) => ({
        id: item.id,
        name: item.title,
        url: `/${this.envId}/product/business/${item.workspaceId}/plan/targetExecuteDetail?id=${item.id}`,
      })),
    };
  }

  public async TestReportPaging(
    planId: string,
    pageNum = 1,
    pageSize = 10,
    search = "",
  ) {
    const res = await http.post(`xsea/plan/testReport/page`, {
      planId,
      pageNum,
      pageSize,
      name: search,
    });
    const data = res.data.object ?? {};
    return {
      total: data.total,
      pageNum: data.pageNum,
      pageSize: data.pageSize,
      list: (data.list ?? []).map((item: any) => ({
        id: item.id,
        name: item.name,
        url: `/${this.envId}/product/business/${""}/plan/reportgen/${
          item.id
        }?planId=${planId}&type=view`,
      })),
    };
  }
}
