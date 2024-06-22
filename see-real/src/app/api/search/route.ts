// .envの読み込み
import { NextRequest, NextResponse } from 'next/server';
// モデル
import { OpenAI } from "@langchain/openai";
// 埋め込み
import { OpenAIEmbeddings } from "@langchain/openai";
// ベクトル検索エンジン
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
// チェーン
import { RetrievalQAChain } from "langchain/chains";


export async function GET(request: NextRequest) {
    runLlm();
    return NextResponse.json({ msg: "OK" });
}


// サンプル用の関数
export const runLlm = async () => {
    // ✅作成済みのベクターストアを読み込む
    const vectorStore = await HNSWLib.load(
        "SkillSheetData",    // MyDataフォルダ
        new OpenAIEmbeddings({ apiKey: 'sk-proj-6fbT1W04VIFyXDKhGrQJT3BlbkFJgGtcI8hESOb2biuuP8nO' })
    );

    // ✅モデル
    const model = new OpenAI({ apiKey: 'sk-proj-6fbT1W04VIFyXDKhGrQJT3BlbkFJgGtcI8hESOb2biuuP8nO' });   // OpenAIモデル
    // ✅チェーン
    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    // ✅質問する
    const res = await chain.invoke({
        query: "佐藤 次郎さんの技術スタックを教えて",
    });

    console.log({ res });
    return res;
};


