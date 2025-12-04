import { ref } from "vue";

export const page = ref(1);
export const pageSize = ref(10);
export const totalItems = ref(0);
export const totalPages = ref(0);

export const rows = ref([]);

/**
 * model nhận Object select map từ Table
 */
export const selectedMap = ref({});
