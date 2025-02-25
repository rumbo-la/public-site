<template>
  <div class="w-full bg-white rounded overflow-hidden">
    <div class="flex flex-col rounded border border-gray-200">
      <div class="w-full" v-if="hasNamedSlot('table-header')">
        <slot name="table-header" />
      </div>
      <table class="app-table">
        <thead class="app-table-thead">
          <tr>
            <th v-if="rowSelector">
              <div>
                <input
                  id="contact-selectAll"
                  type="checkbox"
                  value=""
                  @change="selectAll"
                >
              </div>
            </th>
            <th v-for="(item, idx) in headers" :key="idx" :width="item.width">
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody class="app-table-tbody">
          <tr v-for="(item, index) in data" :key="index" class="[&:hover>*]:!bg-primary/5">
            <td v-if="rowSelector">
              <div>
                <input
                  :id="`contact-${index}`"
                  v-model="item.selected"
                  type="checkbox"
                >
              </div>
            </td>
            <td
              v-for="(field, idx) in headers"
              :key="idx"
              @click="rowSelected(item)"
            >
              <span v-if="!hasNamedSlot(`item-${field.key}`)" :item="item">
                {{ item[field.key] }}
              </span>
              <slot v-else :name="`item-${field.key}`" :item="item" />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="w-full" v-if="hasNamedSlot('footer')">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, useSlots } from 'vue';
interface Props<T> {
  data: T
  headers: { key: string; label: string, fixed?: boolean, width?: number }[] | []
  rowSelector?: boolean
}
const props = withDefaults(defineProps<Props<Record<string, any>>>(), {
  headers: () => [],
  rowSelector: false
});
const emit = defineEmits(['rowSelected']);
const slots = useSlots();

const rowSelected = (item: Record<string, any>) => {
  emit('rowSelected', item);
};

const selectAll = (e: Event) => {
  const checked = (e.target as HTMLInputElement).checked;
  props.data.forEach(({ selected }: {selected: boolean}) => {
    selected = checked;
  });
};

const hasNamedSlot = (slotName: string) => {
  return !!slots[slotName];
};
</script>

<style scoped>
.app-table {
  @apply min-w-full border-b bg-gray-200;
  &-thead {
    tr {
      th {
        @apply h-8 bg-gray-200 px-4 font-medium text-sm text-black leading-tight text-left;
      }
    }
  }
  &-tbody {
    tr {
      td {
        @apply h-[52px] bg-white px-4 font-medium text-sm text-black leading-tight text-left border-b border-gray-200;
      }
    }
  }
}
</style>