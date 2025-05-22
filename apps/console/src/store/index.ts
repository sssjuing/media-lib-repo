import { create } from 'zustand';
import { services } from '@/services';

export const useGlobalStore = create<{
  videoTags: string[];
  fetchVideoTags: () => void;
}>()((set) => ({
  videoTags: [],
  fetchVideoTags: () => {
    services.config.tags().then((tags) => {
      set(() => ({ videoTags: tags }));
    });
  },
}));
