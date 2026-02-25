// src/store/propaganda.store.ts
import { create } from "zustand";
import axios from "axios";
import type { IPost, PostStatus, SocialPlatform } from "@/types/propaganda";

interface PropagandaState {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: (
    uid: string,
    filters?: { platform?: string; status?: string },
  ) => Promise<void>;
  createPost: (data: Partial<IPost>) => Promise<void>;
  updatePost: (id: string, data: Partial<IPost>) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const usePropagandaStore = create<PropagandaState>((set, get) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async (uid, filters) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.get("/api/propaganda/posts", {
        params: { uid, ...filters },
      });
      set({ posts: response.data, isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  createPost: async (data) => {
    set({ isLoading: true });
    try {
      await axios.post("/api/propaganda/posts", data);
      await get().fetchPosts(data.uid!);
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updatePost: async (id, data) => {
    set({ isLoading: true });
    try {
      await axios.put("/api/propaganda/posts", { id, ...data });
      const uid = get().posts.find((p) => p.id === id)?.uid;
      if (uid) await get().fetchPosts(uid);
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deletePost: async (id) => {
    set({ isLoading: true });
    try {
      await axios.delete("/api/propaganda/posts", { params: { id } });
      set({ posts: get().posts.filter((p) => p.id !== id), isLoading: false });
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },
}));
