<script setup lang="ts">
export type JobIconName =
  | 'pin' | 'clock' | 'folder' | 'remote' | 'building' | 'arrow' | 'group' | 'search' | 'close'
  | 'document' | 'gift' | 'shield' | 'growth' | 'star' | 'code' | 'calendar' | 'level' | 'user' | 'briefcase' | 'target'

defineProps<{ name: JobIconName }>()

// 24x24 stroke icons used by the careers pages.
const paths: Record<JobIconName, string[]> = {
  pin: ['M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z', 'M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2'],
  folder: ['M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z'],
  remote: ['M2 9a15 15 0 0 1 20 0', 'M5.5 12.5a10 10 0 0 1 13 0', 'M9 16a5 5 0 0 1 6 0', 'M12 19.5h.01'],
  building: ['M5 21V4a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v17', 'M15 9h3a1 1 0 0 1 1 1v11', 'M3 21h18', 'M9 7h2M9 11h2M9 15h2'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  search: ['M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Z', 'M20 20l-4-4'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  document: ['M7 3h7l5 5v12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z', 'M14 3v5h5', 'M9 13h6M9 17h6'],
  gift: ['M4 11h16v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9Z', 'M3 7h18v4H3z', 'M12 7v14', 'M12 7c-1.5-3-5-3-5-1s3 1 5 1Zm0 0c1.5-3 5-3 5-1s-3 1-5 1Z'],
  shield: ['M12 3l7 3v5c0 4.5-3 8.3-7 10-4-1.7-7-5.5-7-10V6l7-3Z', 'M9 12l2 2 4-4'],
  growth: ['M4 19h16', 'M5 15l5-5 3 3 6-6', 'M15 7h4v4'],
  star: ['M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z'],
  code: ['M8 8l-4 4 4 4', 'M16 8l4 4-4 4', 'M13.5 5l-3 14'],
  calendar: ['M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z', 'M4 10h16', 'M8 3v4M16 3v4'],
  level: ['M5 20v-5', 'M10 20v-9', 'M15 20V7', 'M20 20V4'],
  user: ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0'],
  briefcase: ['M4 8h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z', 'M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2', 'M3 13h18'],
  target: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M12 12h.01'],
  group: ['M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M3 19a6 6 0 0 1 12 0', 'M16 5.5a3 3 0 0 1 0 5.5', 'M18 14a6 6 0 0 1 3 5'],
}
</script>
<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path v-for="(d, i) in paths[name]" :key="i" :d="d" />
  </svg>
</template>
