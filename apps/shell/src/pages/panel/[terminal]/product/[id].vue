<script setup lang="ts">
const route = useRoute();
const terminal = route.params.terminal;

await navigateTo(`/panel/${encodeURIComponent(terminal as string)}/zarin-link`);
</script>
