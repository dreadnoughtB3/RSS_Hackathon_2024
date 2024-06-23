import { Post, User } from "@prisma/client";
import OpenAI from "openai";
import { prisma } from '@/app/lib/Prisma';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const checkPost = async (post: Post): Promise<void> => {

    prisma.$connect

    const user = await prisma.user.findUnique({
        where: { id: post.user_id }
    })
    if (!user) {
        return
    }

    const skills = user.skills;

    const req = JSON.stringify({ skills })

    const template = {
        skills: [
            "javascript", "react", "php"
        ],
        issue: "react"
    }
    const system_prompt = "次に従業員とスキルシートとつぶやきが順にあたえられます。スキルシートに記述されていない技術に触れた経験や、技術の習得過程がつぶやきに含まれているかを判定してください。含まれている場合はそれを加えた更新後のskillsをレスポンスに含めてください。ない場合は今までのskillsをそのまま返してください。また、つぶやきの中に解決できていない課題や悩みがあれば抽出し、issueに関連のある技術名を小文字で返してください。jsonでの応答例)" + JSON.stringify(template)
    const user_message = "スキルシート: " + req + ", つぶやき: " + post.body

    const completion = await openai.chat.completions.create(
        {
            model: "gpt-4o",
            response_format: { "type": "json_object" },
            messages: [
                { role: "system", content: system_prompt },
                { role: "user", content: user_message }
            ]
        }
    )

    try {
        const result = JSON.parse(completion.choices[0].message.content || "{}")
        const newSkills = result.skills
        const issue = result.issue


        if (skills !== newSkills) {
            await prisma.user.update({
                where: { id: user.id },
                data: {
                    skills: newSkills
                }
            })
        }
        if (issue) {
            const users = await prisma.user.findMany({
                where: {
                    skills: {
                        has: issue
                    }
                },
                select: {
                    id: true,
                }
            })

            const problem = await prisma.problem.create({
                data: {
                    post_id:post.id,
                    user_id:user.id,
                    keywords:[issue],
                    related_user:users.map(user=>user.id)
                }
            })
            console.log(problem)

            //skillsにissueを持つuserを取得

            console.log(users)

            // TODO:usersに通知を送る

        }

    } catch (e) {

    }
    finally {
        prisma.$disconnect
    }
}
