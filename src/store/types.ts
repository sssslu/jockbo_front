export interface JockBoItemSummaryInfo {
  _id: number;
  myName: string;
  myNamechi: string;
}

export interface JockBoItemInfo extends JockBoItemSummaryInfo {
  mySae: string;
  father: JockBoItemSummaryInfo;
  grandPa: JockBoItemSummaryInfo;
}

export interface JockBoTreeItemInfo extends JockBoItemSummaryInfo {
  mySae: number;
  ancUID: number | null;
  children?: JockBoTreeItemInfo[];
}

export type searchDataInfo = {
  myName?: string;
  mySae?: string;
  fatherName?: string;
  grandPaName?: string;
};

export interface UserInfo extends JockBoItemSummaryInfo {
  mySae: number;
  ancUID: number | null;
  ect: string;
  moddate: string;
}
