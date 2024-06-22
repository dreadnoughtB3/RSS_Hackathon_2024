import "cheerio";
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio";

const loader = new CheerioWebBaseLoader(
  "https://docs.smith.langchain.com/user_guide"
);


(async () => {

  const rawDocs = await loader.load();
  console.log(rawDocs)
})()