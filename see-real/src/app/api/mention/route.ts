import { NextRequest, NextResponse } from 'next/server';
// import 'dotenv/config';


import { JSONLoader } from "langchain/document_loaders/fs/json";
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HNSWLib } from '@langchain/community/vectorstores/hnswlib';
import { OpenAIEmbeddings } from '@langchain/openai';

export async function GET(request: NextRequest) {

  const loader = new JSONLoader("./example.json");

  const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
  const docs = await loader.loadAndSplit(textSplitter);
  console.log(docs);
  const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings({ apiKey: 'sk-proj-6fbT1W04VIFyXDKhGrQJT3BlbkFJgGtcI8hESOb2biuuP8nO' }));


  // const vectorStore = await HNSWLib.fromTexts(
  //   ["Hello world", "Bye bye", "hello nice world"],
  //   [{ id: 2 }, { id: 1 }, { id: 3 }],
  //   new OpenAIEmbeddings({apiKey: 'sk-proj-6fbT1W04VIFyXDKhGrQJT3BlbkFJgGtcI8hESOb2biuuP8nO'})
  // );
  await vectorStore.save('SkillSheetData');
  
  return NextResponse.json({ msg: "OK" });

}
