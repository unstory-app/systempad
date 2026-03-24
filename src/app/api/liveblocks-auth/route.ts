import { Liveblocks } from "@liveblocks/node";
import { stackServerApp } from "@/stack/server";

/**
 * Validates the currently authenticated Stack Auth user
 * and securely issues a robust Liveblocks connection token.
 */
const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCK_SECRET_KEY as string,
});

export async function POST(request: Request) {
  try {
    const user = await stackServerApp.getUser();

    // Anonymous or untracked users fail cleanly.
    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Identify the user context dynamically for Liveblocks mapping
    const session = liveblocks.prepareSession(user.id, {
      userInfo: {
        name: user.displayName || "Anonymous Architect",
        email: user.primaryEmail || "",
        avatar: user.profileImageUrl || `https://api.dicebear.com/7.x/notionists/svg?seed=${user.id}`,
      },
    });

    // Provide read/write access to the specifically requested room/board.
    // In advanced scenarios, we should grab the `room` from request.json() and verify DB access permissions.
    const body = (await request.json()) as { room?: string };
    const { room } = body;

    // For now, if they are authenticated, they can interact inside this room.
    if (room) {
      session.allow(room, session.FULL_ACCESS);
    }

    const { status, body: sessionBody } = await session.authorize();

    return new Response(sessionBody, { status });
  } catch (error) {
    console.error("Liveblocks Auth Error:", error);
    return new Response("Internal Server Error", { status: 503 });
  }
}
