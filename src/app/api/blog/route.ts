/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"

//prismaをインスタンス化
const prisma = new PrismaClient();

export async function main() {
    try {
        //DB接続
        await prisma.$connect();
    } catch (err) {
        return Error("DB接続に失敗しました")
    }
}

//ブログの全記事取得API
export const GET = async (req: Request, res: NextResponse) => {
    try {
        //main関数呼び出し
        await main();
        //findManyは全記事取得、postはスキーマで作成したモデルを小文字にしたもの
        const posts = await prisma.post.findMany();
        return NextResponse.json({ message: "Success", posts }, { status: 200 });
    } catch (err) {
        return NextResponse.json({ message: "エラー", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};

//ブログ投稿用API
export const POST = async (req: Request, res: NextResponse) => {
    try {
        //reqに入っているtitleとdescriptionの取り出し
        const { title, description } = await req.json();
        //main関数呼び出し
        await main();
        //投稿用
        const post = await prisma.post.create({ data: { title, description } })
        return NextResponse.json({ message: "Success", post }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "エラー", err }, { status: 500 })
    } finally {
        await prisma.$disconnect();
    }
};