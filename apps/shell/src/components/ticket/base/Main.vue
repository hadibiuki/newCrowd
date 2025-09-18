<template>
  <div>
    <ui-Card>
      <template #main>
        <TicketBaseContent @reset="$emit('reset')" />
      </template>
    </ui-Card>
  </div>
</template>
