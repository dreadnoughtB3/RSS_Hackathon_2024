import { NextRequest, NextResponse } from 'next/server';
import { env } from 'process';

import OpenAI from "openai";


export async function GET(request: NextRequest) {
    const openai = new OpenAI({
        apiKey: process.env.API_KEY// 先程取得したAPI KEY
    })
    
    const data = {
  "name": "山田 太郎",
  "contact": {
    "email": "taro.yamada@example.com",
  },
  "profile": "10年以上の経験を持つソフトウェアエンジニア。バックエンドとフロントエンドの開発に精通し、DevOpsにも強みを持つ。",
  "skills": [
    {
      "name": "JavaScript",
      "description": "Angularを使用したフロントエンド開発において豊富な経験があります。"
    },
    {
      "name": "Python",
      "description": "Djangoを使用したウェブアプリケーションの開発やデータ処理の自動化に精通しています。"
    },
    {
      "name": "Java",
      "description": "エンタープライズアプリケーションの開発において、多くのプロジェクトで使用しました。"
    },
    {
      "name": "C#",
      "description": "ASP.NETを使用したウェブアプリケーションの開発経験があります。"
    },
    {
      "name": "Ruby",
      "description": "Ruby on Railsを使用したプロジェクトでの開発経験があります。"
    }
  ],
  "frameworks": [
    {
      "name": "Django",
      "description": "バックエンド開発で使用。多くのウェブアプリケーションの開発において主要なフレームワーク。"
    },
    {
      "name": "Ruby on Rails",
      "description": "迅速なプロトタイピングと開発に使用。中小規模のプロジェクトでの経験あり。"
    }
  ]
}
    const obj = JSON.stringify(data)//DBから取得したスキルシートをjsonに変換
    //プロンプト
    const setting = "次に従業員とスキルシートとつぶやきが順にあたえられます。スキルシートに記述されていない技術に触れた経験や、技術の習得過程がつぶやきに含まれているかを判定してください。含まれている場合はスキルシートを更新して全文をjsonで返してください。また、つぶやきの中に解決できていない課題や悩みがあれば抽出してjsonで返してください"
    const message = "ハッカソンでReact触ったけど全然わからん" //つぶやきの本文
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 使いたいGPTのModel
      response_format: {"type" : "json_object"},
      messages: [{role: "system", "content": setting},{role: "system", "content": obj},{ role: "user", "content": message }],
    });
    console.log(completion.choices[0].message); //GPTの回答
    return NextResponse.json(completion.choices[0].message);
}