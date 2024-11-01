<template>
  <div class="flex flex-col items-center h-full px-6 pt-48 sm:pt-64 lg:px-8">
    <p
      class="text-[18px] sm:text-[24px] mb-6 sm:10 font-semibold text-[var(--primary)]"
    >
      {{ type }}
    </p>
    <h1
      class="text-3xl font-bold tracking-tight text-[var(--title)] sm:text-5xl mb-8 sm:12"
    >
      {{ result.title }}
    </h1>
    <p
      class="text-[14px] sm:text-[18px] leading-7 text-[var(--text)] mb-8 sm:12"
    >
      {{ result.content }}
    </p>
    <div class="flex items-center justify-center gap-x-6">
      <span
        @click="onBack"
        class="rounded-md cursor-pointer bg-[var(--primary)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {{ $t("go back home") }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useRouter } from "vue-router";
import { ExceptionStatus } from "@/common/exception";

const { notFound, serviceError, inaccessible, unauthorized } = ExceptionStatus;

const ResultMaps: Record<ExceptionStatus, ResultItem> = {
  [serviceError]: {
    icon: "500",
    title: "",
    content: "",
  },
  [notFound]: {
    icon: "404",
    title: $t("page not found"),
    content: $t("not find the page looking for"),
  },
  [inaccessible]: {
    icon: "403",
    title: $t("page not found"),
    content: $t("not find the page looking for"),
  },
  [unauthorized]: {
    icon: "401",
    title: $t("page not found"),
    content: $t("not find the page looking for"),
  },
};

const router = useRouter();

const type = computed(() => {
  return (router.currentRoute.value.params?.type ||
    ExceptionStatus.notFound) as ExceptionStatus;
});

const result = computed(() => {
  return ResultMaps[type.value];
});

function onBack() {
  router.replace("/");
}

watch(
  type,
  t => {
    if (t) {
      document.title = result.value.title;
    }
  },
  {
    immediate: true,
  }
);
</script>
