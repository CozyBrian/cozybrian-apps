// test prisma with get and post Posts
import { prisma } from "@cozy/db"; // Adjust the import path as necessary
import { NextResponse } from "next/server";

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const post = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return NextResponse.json(post);
}

export async function PUT(request: Request) {
  const body = await request.json();
  const post = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return NextResponse.json(post);
}

export async function DELETE(request: Request) {
  const body = await request.json();
  const post = await prisma.post.delete({
    where: { id: body.id },
  });
  return NextResponse.json(post);
}

export async function PATCH(request: Request) {
  const body = await request.json();
  const post = await prisma.post.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return NextResponse.json(post);
}
