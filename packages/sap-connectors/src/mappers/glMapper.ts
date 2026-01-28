import type { SapGlLineItem } from "@vcfo/contracts/src/sap/gl";

export interface FinancialFactInput {
  companyCode: string;
  postingDate: string;
  amount: string;
  currencyCode: string;
  accountCode: string;
}

export function mapGlLineItem(item: SapGlLineItem): FinancialFactInput {
  return {
    companyCode: item.CompanyCode,
    postingDate: item.PostingDate,
    amount: item.AmountInCompanyCodeCurrency,
    currencyCode: item.CompanyCodeCurrency,
    accountCode: item.GLLAccount,
  };
}
