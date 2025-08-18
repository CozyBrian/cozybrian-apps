import { generateOgImage } from "@cozy/blog";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  return await generateOgImage(slug, request);
}
