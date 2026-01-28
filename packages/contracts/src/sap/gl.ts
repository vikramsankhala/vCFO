export interface SapGlLineItem {
  CompanyCode: string;
  FiscalYear: string;
  AccountingDocument: string;
  AccountingDocumentItem: string;
  PostingDate: string;
  AmountInCompanyCodeCurrency: string;
  CompanyCodeCurrency: string;
  GLLAccount: string;
  ProfitCenter?: string;
  CostCenter?: string;
}
