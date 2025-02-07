import http from "./http";

export default class XSeaSimplifier {
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
      })),
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
      })),
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
    }));
    return scriptsMeta;
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
      })),
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
      })),
    };
  }
}
