<script lang="ts" setup>
nextTick(() => {
  navigateTo({
    // eslint-disable-next-line no-constant-condition
    path: true ? '/panel/dashboard' : '/panel/overview',
  });
});
</script>
