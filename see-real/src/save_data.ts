// .envの読み込み
require("dotenv").config();

const doc = "ドキュメント";


// テキスト分割
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

// 埋め込み
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
// ベクトル検索エンジン
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import 

// サンプル用の関数
export const save_data = async () => {
  // ✅PDFファイルを500文字ごとに分割
	const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 500 });
  const allSplits = textSplitter.splitDocuments(doc);

  // ✅ドキュメントをベクトル化
  const vectorStore = await HNSWLib.fromDocuments( docs, new OpenAIEmbeddings() );

  // ✅ベクターストアに保存
  await vectorStore.save("MyData");    // MyDataフォルダ
};

save_data();