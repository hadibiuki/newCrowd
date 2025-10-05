<template>
  <ui-PageHeading
    :title="$t('_referral.invited_users')"
    has-back
    class="w-full lg:mx-auto max-w-[944px]"
    @back-roll="$router.push(homeUrl)"
  >
  </ui-PageHeading>
</template>
<script lang="ts" setup>
const { homeUrl } = useRedirectToHome();
</script>
