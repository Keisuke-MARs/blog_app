/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { main } from "../route";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//ブログ詳細記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        //urlからidを取得
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        //エンドポイントのIDを取得。findfirstは一件目を取得。whereで条件を設定。urlの一番右がID
        const post = await prisma.post.findFirst({ where: { id } });//http:localhost:3000/api/blog/2
        return NextResponse.json({ message: "Success", post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};
//ブログ記事編集API
export const PUT = async (req: Request, res: NextResponse) => {
    try {
        //urlからidを取得
        const id: number = parseInt(req.url.split("/blog/")[1]);

        //編集する部分となるtitleとdescriptionを取得
        const { title, description } = await req.json();
        await main();
        //エンドポイントのIDを取得。findfirstは一件目を取得。whereで条件を設定。urlの一番右がID
        const post = await prisma.post.update({
            data: { title, description },
            where: { id },
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};
//ブログ記事削除用API
export const DELETE = async (req: Request, res: NextResponse) => {
    try {
        //urlからidを取得
        const id: number = parseInt(req.url.split("/blog/")[1]);
        await main();
        //エンドポイントのIDを取得。findfirstは一件目を取得。whereで条件を設定。urlの一番右がID
        const post = await prisma.post.delete({
            where: { id },
        });
        return NextResponse.json({ message: "Success", post }, { status: 200 })
    } catch (err) {
        return NextResponse.json({ message: "Error", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};