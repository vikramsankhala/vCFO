import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sampleFacts = [
  { accountCode: "REV_PRODUCT", amount: 250000 },
  { accountCode: "REV_SERVICES", amount: 75000 },
  { accountCode: "COGS_MATERIAL", amount: 120000 },
  { accountCode: "OPEX_SALES", amount: 45000 },
  { accountCode: "OPEX_GA", amount: 30000 },
  { accountCode: "DEP_PLANT", amount: 12000 },
  { accountCode: "INT_EXPENSE", amount: 8000 },
  { accountCode: "TAX_EXPENSE", amount: 15000 },
  { accountCode: "CASH_MAIN", amount: 50000 },
  { accountCode: "DEBT_LONGTERM", amount: 120000 },
  { accountCode: "EQUITY_COMMON", amount: 200000 },
  { accountCode: "AR_TRADE", amount: 60000 },
  { accountCode: "AP_TRADE", amount: 35000 },
  { accountCode: "INV_RAW", amount: 40000 },
  { accountCode: "ASSET_TOTAL", amount: 350000 },
];

const plPrefixes = ["REV", "COGS", "OPEX", "DEP", "INT", "TAX"];

const isPlAccount = (accountCode: string) =>
  plPrefixes.some((prefix) => accountCode.toUpperCase().startsWith(prefix));

const toMonthStart = (date: Date) =>
  new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1));

const addMonths = (date: Date, months: number) => {
  const copy = new Date(date);
  copy.setUTCMonth(copy.getUTCMonth() + months);
  return copy;
};

async function main() {
  const company = await prisma.company.upsert({
    where: { code: "COMP_1" },
    update: { name: "Demo Corp", currencyCode: "USD" },
    create: { code: "COMP_1", name: "Demo Corp", currencyCode: "USD" },
  });

  await prisma.financialFact.deleteMany({
    where: { companyId: company.id, scenarioId: null },
  });

  const today = new Date();
  const basePeriod = toMonthStart(today);
  const monthsBack = 6;
  const factsToInsert = [];

  for (let offset = -monthsBack; offset <= 0; offset += 1) {
    const period = toMonthStart(addMonths(basePeriod, offset));
    const trend = 1 + (monthsBack + offset) * 0.02;
    const noise = 0.97 + Math.random() * 0.06;

    for (const fact of sampleFacts) {
      const amount = fact.amount * trend * noise;
      factsToInsert.push({
        companyId: company.id,
        period,
        accountCode: fact.accountCode,
        amount: new Prisma.Decimal(amount.toFixed(2)),
        currencyCode: "USD",
        type: isPlAccount(fact.accountCode) ? "PL" : "BS",
        scenarioId: null,
      });
    }
  }

  await prisma.financialFact.createMany({ data: factsToInsert });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
