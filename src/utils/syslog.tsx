export class SysLog {
    LogId: number;
    SysTerminal?: string | null;
    CompId: string;
    SiteId: string;
    UserId: string;
    LogAction: string;
    DocCd: number;
    DocKey?: string | null;
    Description?: string | null;
    LogTime?: Date | null;
    sysLogDetails: SysLogDetails[];
  
    constructor(
      LogId: number,
      CompId: string,
      SiteId: string,
      UserId: string,
      LogAction: string,
      DocCd: number,
      sysLogDetails: SysLogDetails[],
      SysTerminal?: string | null,
      DocKey?: string | null,
      Description?: string | null,
      LogTime?: Date | null
    ) {
      this.LogId = LogId;
      this.SysTerminal = SysTerminal;
      this.CompId = CompId;
      this.SiteId = SiteId;
      this.UserId = UserId;
      this.LogAction = LogAction;
      this.DocCd = DocCd;
      this.DocKey = DocKey;
      this.Description = Description;
      this.LogTime = LogTime;
      this.sysLogDetails = sysLogDetails;
    }
  }
  
  export class SysLogDetails {
    Id: number;
    LogId: number;
    Field?: string | null;
    OldValue?: string | null;
    NewValue?: string | null;
    Description?: string | null;

  
    constructor(
      Id: number,
      LogId: number,
 
      Field?: string | null,
      OldValue?: string | null,
      NewValue?: string | null,
      Description?: string | null
    ) {
      this.Id = Id;
      this.LogId = LogId;
      this.Field = Field;
      this.OldValue = OldValue;
      this.NewValue = NewValue;
      this.Description=Description

    }
  }