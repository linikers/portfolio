// src/pages/api/propaganda/posts.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Timestamp } from "firebase-admin/firestore";
import { getAdminFirestore } from "@/lib/firebaseAdmin";
import type { IPost } from "@/types/propaganda";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const db = getAdminFirestore();
  const postsCollection = db.collection("posts");

  switch (req.method) {
    case "GET": {
      try {
        const { uid, platform, status } = req.query;
        let query: FirebaseFirestore.Query = postsCollection;

        if (uid) query = query.where("uid", "==", uid);
        if (platform)
          query = query.where("platforms", "array-contains", platform);
        if (status) query = query.where("status", "==", status);

        const snapshot = await query.orderBy("scheduledAt", "desc").get();
        const posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          scheduledAt:
            doc.data().scheduledAt?.toDate?.()?.toISOString() ||
            doc.data().scheduledAt,
          createdAt:
            doc.data().createdAt?.toDate?.()?.toISOString() ||
            doc.data().createdAt,
        }));

        return res.status(200).json(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Failed to fetch posts" });
      }
    }

    case "POST": {
      try {
        const {
          uid,
          platforms,
          content,
          scheduledAt,
          isPaid,
          budget,
          targetAudience,
        } = req.body;

        if (!uid || !platforms || !content || !scheduledAt) {
          return res.status(400).json({ error: "Missing required fields" });
        }

        const docRef = await postsCollection.add({
          uid,
          platforms,
          content,
          scheduledAt: Timestamp.fromDate(new Date(scheduledAt)),
          status: "scheduled",
          isPaid: !!isPaid,
          budget: budget || 0,
          targetAudience: targetAudience || "",
          createdAt: Timestamp.now(),
        });

        return res.status(201).json({ id: docRef.id });
      } catch (error) {
        console.error("Error creating post:", error);
        return res.status(500).json({ error: "Failed to create post" });
      }
    }

    case "PUT": {
      try {
        const { id, ...data } = req.body;
        if (!id) return res.status(400).json({ error: "Missing post ID" });

        const updateData: any = { ...data };
        if (data.scheduledAt) {
          updateData.scheduledAt = Timestamp.fromDate(
            new Date(data.scheduledAt),
          );
        }

        await postsCollection.doc(id).update(updateData);
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error updating post:", error);
        return res.status(500).json({ error: "Failed to update post" });
      }
    }

    case "DELETE": {
      try {
        const { id } = req.query;
        if (!id) return res.status(400).json({ error: "Missing post ID" });

        await postsCollection.doc(id as string).delete();
        return res.status(200).json({ success: true });
      } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ error: "Failed to delete post" });
      }
    }

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
