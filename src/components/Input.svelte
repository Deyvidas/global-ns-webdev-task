<script lang="ts">
    import type { HTMLInputAttributes } from 'svelte/elements'

    type $$Props = HTMLInputAttributes & {
        value: string
        onInput: (event: Event, value: string) => void
    }

    export let value: string
    export let onInput: (event: Event, value: string) => void
</script>

<input bind:value on:input={event => onInput(event, value)} {...$$restProps} />

<style lang="scss">
</style>
