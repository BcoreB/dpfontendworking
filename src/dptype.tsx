export enum DocStaus
{
    NEW = 'NEW',
    EDIT = 'EDIT',
    VIEW = 'VIEW',
    DELETED = 'DELETED'
}
 export class DocumentRights {
    m_DocCd: number=0
    m_rights: string=""  
 }

export class DocumentRightsCollection extends Array<DocumentRights> {
    getByDocCd(docCd: string): DocumentRights | undefined {
        return this.find(dr => dr.m_DocCd.toString() === docCd);
    }
}


export enum DocAction
{
    LOGGEDIN = 'LOGGEDIN',
    LOGGEDOUT = 'LOGGEDOUT',
    CREATED = 'CREATED',
    EDITED = 'EDITED',
    OPENED = 'OPENED',
    DELETED = 'DELETED',
    PRINTED = 'PRINTED'
}