import http from "./http";
import dayjs from "dayjs";

interface XSeaContext {
  envId: string;
  productId: string;
  planId: string;
  scriptId: string;
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
